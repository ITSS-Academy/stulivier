import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs-extra';
import * as ffmpeg from 'fluent-ffmpeg';
import * as ffmpegInstaller from '@ffmpeg-installer/ffmpeg';
import { Multer } from 'multer';
import { CreateVideoModel } from '../../models/video.model';
import * as path from 'node:path';
import slugify from 'slugify';
import { VideoGateway } from './video.gateway';
import * as ffprobeInstaller from '@ffprobe-installer/ffprobe';

@Injectable()
export class VideosService {
  private supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_KEY,
  );

  constructor(private videoGateway: VideoGateway) {}

  async createVideo(
    videoFile: Multer.File,
    imageFile: Multer.File,
    createVideoModel: CreateVideoModel,
    userId: string,
  ) {
    const { data, error } = await this.supabase.from('videos').upsert({
      title: createVideoModel.title,
      description: createVideoModel.description,
      user_id: userId,
      category_id: createVideoModel.category_id,
    });

    if (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    // Return the UUID of the created video
    const videoId = data[0].id;
    try {
      // Handle video upload
      const uploadResult = await this.handleVideoUpload(
        userId as any,
        videoId,
        videoFile,
        imageFile,
      );

      // Update video record with storage link in supabase
      await this.supabase
        .from('videos')
        .update({
          video_url: uploadResult.publicUrl,
          thumbnail_url: uploadResult.thumbnailUrl,
        })
        .eq('id', videoId);

      return;
    } catch (e) {
      // remove video record if upload fails
      await this.supabase.from('videos').delete().eq('id', videoId);
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async handleVideoUpload(
    userId: string,
    filmId: string,
    videoFile: Multer.File,
    imageFile: Multer.File,
  ): Promise<{ message: string; publicUrl: string; thumbnailUrl: string }> {
    ffmpeg.setFfmpegPath(ffmpegInstaller.path);
    ffmpeg.setFfprobePath(ffprobeInstaller.path);

    const tempDir = path.resolve('./temp', userId, filmId);
    const hlsOutputDir = path.join(tempDir, 'hls');

    // Sanitize file name
    const sanitizedFileName = slugify(videoFile.originalname, {
      replacement: '_',
      lower: true,
      strict: true,
    });
    const filePath = path.join(tempDir, sanitizedFileName);

    // Ensure temporary directories exist
    await fs.ensureDir(tempDir);
    await fs.ensureDir(hlsOutputDir);

    // Save temporary file
    await fs.writeFile(filePath, videoFile.buffer);

    // Variables for progress tracking
    let lastProgress = 0;
    const ffmpegWeight = 0.8; // 80% weight for conversion
    const uploadWeight = 0.2; // 20% weight for upload
    let totalDuration = 0;

    const hlsFileName = 'playlist.m3u8';
    const hlsPath = path.join(hlsOutputDir, hlsFileName);
    const thumbnailPath = path.join(tempDir, 'thumbnail.jpg');

    try {
      console.log(`Extracting thumbnail for file: ${filePath}`);
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .on('start', (commandLine) => {
            console.log('FFmpeg thumbnail command:', commandLine);
          })
          .on('end', () => {
            console.log('Thumbnail extracted successfully.');
            resolve();
          })
          .on('error', (err) => {
            console.error('Thumbnail extraction error:', err.message);
            reject(err);
          })
          .screenshot({
            timestamps: ['00:00:01.000'], // Capture at 1 second
            filename: 'thumbnail.jpg',
            folder: tempDir,
            size: '320x240', // Optional: Resize thumbnail
          });
      });

      console.log('Uploading thumbnail to storage...');
      // const thumbnailContent = await fs.readFile(thumbnailPath);
      const thumbnailContent = imageFile.buffer;
      const thumbnailStoragePath = `${userId}/${filmId}/thumbnail.jpg`;

      const { error: thumbnailUploadError } = await this.supabase.storage
        .from('videos') // Bucket name
        .upload(thumbnailStoragePath, thumbnailContent, {
          contentType: 'image/jpeg',
        });

      if (thumbnailUploadError) {
        throw new Error(
          `Failed to upload thumbnail: ${thumbnailUploadError.message}`,
        );
      }

      // Get public URL of the thumbnail
      const { data: thumbnailData, error: thumbnailUrlError } =
        this.supabase.storage.from('videos').getPublicUrl(thumbnailStoragePath);

      if (thumbnailUrlError) {
        throw new Error(
          `Failed to generate thumbnail URL: ${thumbnailUrlError.message}`,
        );
      }

      // Extract video duration using ffprobe
      totalDuration = await new Promise<number>((resolve, reject) => {
        ffmpeg.ffprobe(filePath, (err, metadata) => {
          if (err) {
            reject(err);
          } else {
            resolve(metadata.format.duration || 0);
          }
        });
      });

      // Conversion Phase
      console.log(`Starting FFmpeg conversion for file: ${filePath}`);
      await new Promise<void>((resolve, reject) => {
        ffmpeg(filePath)
          .outputOptions([
            '-hls_time 10', // Each segment is 10 seconds
            '-hls_playlist_type vod',
            `-hls_segment_filename ${path.join(hlsOutputDir, 'segment_%03d.ts')}`,
          ])
          .output(hlsPath)
          .on('start', (commandLine) => {
            console.log('FFmpeg command:', commandLine);
          })
          .on('progress', (progress) => {
            if (progress.timemark) {
              const timeParts = progress.timemark.split(':').map(parseFloat);
              const currentSeconds =
                timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];

              // Calculate progress for the FFmpeg phase (max 80%)
              const ffmpegProgress = Math.round(
                (currentSeconds / totalDuration) * ffmpegWeight * 100,
              );

              if (ffmpegProgress - lastProgress >= 1) {
                lastProgress = ffmpegProgress;
                this.videoGateway.sendUploadProgress(ffmpegProgress);
              }
            }
          })
          .on('end', () => {
            console.log('FFmpeg conversion completed successfully.');
            resolve();
          })
          .on('error', (err) => {
            console.error('FFmpeg conversion error:', err.message);
            reject(err);
          })
          .run();
      });

      // Upload Phase
      const hlsFiles = await fs.readdir(hlsOutputDir);
      const totalFiles = hlsFiles.length;
      let uploadedFiles = 0;

      for (const hlsFile of hlsFiles) {
        const fileContent = await fs.readFile(path.join(hlsOutputDir, hlsFile));
        const storagePath = `${userId}/${filmId}/${hlsFile}`;

        const { error } = await this.supabase.storage
          .from('videos')
          .upload(storagePath, fileContent, {
            contentType: hlsFile.endsWith('.m3u8')
              ? 'application/vnd.apple.mpegurl'
              : 'video/MP2T',
          });

        if (error) {
          throw new Error(
            `Failed to upload HLS file ${hlsFile}: ${error.message}`,
          );
        }

        // Update progress for the upload phase (max 20%)
        uploadedFiles++;
        const uploadProgress = Math.round(
          ((uploadedFiles / totalFiles) * uploadWeight + ffmpegWeight) * 100,
        );

        if (uploadProgress - lastProgress >= 1) {
          lastProgress = uploadProgress;
          this.videoGateway.sendUploadProgress(uploadProgress);
        }
      }

      // Get the public URL of the playlist
      const { data, error: urlError } = this.supabase.storage
        .from('videos')
        .getPublicUrl(`${userId}/${filmId}/${hlsFileName}`);

      if (urlError) {
        throw new Error(`Failed to generate public URL: ${urlError.message}`);
      }

      console.log('Video uploaded and converted to HLS successfully.');
      console.log('Public URL:', data.publicURL);
      console.log('Thumbnail URL:', thumbnailData.publicURL);

      return {
        message: 'Video uploaded and converted to HLS successfully',
        publicUrl: data.publicURL,
        thumbnailUrl: thumbnailData.publicURL,
      };
    } catch (err) {
      console.error('Error during video processing:', err.message);
      throw new Error(`Video processing failed: ${err.message}`);
    } finally {
      // Clean up temporary files
      await fs.remove(tempDir);
      console.log('Temporary files removed.');
    }
  }

  async getAllVideos() {
    try {
      const { data, error } = await this.supabase.from('videos').select(`
    *,
    user_data:users (
      username,
      avatar_url
    )
  `);

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      return this.shuffleArray(data);
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  async getVideoById(videoId: string, userId: string) {
    try {
      const { data, error } = await this.supabase.rpc('get_video_by_id', {
        video_id_param: videoId,
        user_id_param: userId,
      });

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      if (userId == null) {
        // Update video history
        const { error } = await this.supabase.rpc('upsert_watch_history', {
          p_video_id: videoId,
          p_user_id: userId,
        });

        if (error) {
          throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
      }

      return data[0];
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async getVideosByCategoryId(categoryId: string) {
    try {
      const { data, error } = await this.supabase.rpc(
        'get_videos_by_category_id',
        {
          p_category_id: categoryId,
        },
      );

      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }

      return data;
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async increaseViewCount(videoId: string) {
    try {
      const { error } = await this.supabase.rpc('increase_video_views', {
        p_video_id: videoId,
      });
      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }

  async updateWatchTime(videoId: string, userId: string, currentTime: number) {
    try {
      const { error } = await this.supabase.rpc('update_resume_position', {
        p_video_id: videoId,
        p_user_id: userId,
        p_new_position: currentTime,
      });
      if (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    } catch (e) {
      throw new HttpException(e, HttpStatus.BAD_REQUEST);
    }
  }
}
