import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Request,
  Get,
  Req,
  UploadedFiles,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Public } from '../../utils/custom_decorators';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @UseInterceptors(FilesInterceptor('files')) // Nhận nhiều file từ FormData
  async uploadVideo(
    @UploadedFiles() files: Multer.File[],
    @Body('createVideoDto') createVideoDto: string,
    @Request() req: any,
  ) {
    const parsedCreateVideoDto = JSON.parse(createVideoDto);
    const videoFile = files.find((file) => file.mimetype.startsWith('video/'));
    const imageFile = files.find((file) => file.mimetype.startsWith('image/'));

    if (!videoFile || !imageFile) {
      throw new Error('Both video and image files are required.');
    }

    return await this.videosService.createVideo(
      videoFile,
      imageFile,
      parsedCreateVideoDto,
      req.user.id || req.user.uid,
    );
  }

  @Public()
  @Get('all')
  async getAllVideos() {
    return await this.videosService.getAllVideos();
  }

  @Public()
  @Get()
  async getVideoById(@Request() req: any) {
    const { userId, videoId } = req.query;
    console.log(videoId);
    console.log(userId);
    return await this.videosService.getVideoById(videoId, userId);
  }

  @Public()
  @Get('category')
  async getVideosByCategoryId(@Request() req: any) {
    const { categoryId } = req.query;
    return await this.videosService.getVideosByCategoryId(categoryId);
  }

  @Public()
  @Post('view')
  async increaseViewCount(@Req() req: any) {
    const { videoId } = req.query;
    return await this.videosService.increaseViewCount(videoId);
  }

  // update watch time
  @Post('watch-time')
  async updateWatchTime(@Request() req: any) {
    const { videoId, userId, watchTime } = req.body;
    return await this.videosService.updateWatchTime(videoId, userId, watchTime);
  }
}
