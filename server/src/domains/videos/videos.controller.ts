import {
  Body,
  Controller,
  Post,
  UseInterceptors,
  Request,
  Get,
  Req,
  UploadedFiles,
  Put,
  Delete,
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
    return await this.videosService.getVideoById(videoId, userId);
  }

  @Public()
  @Get('user')
  async getVideosByUserId(@Request() req: any) {
    const { userId } = req.query;
    return await this.videosService.getVideoByUserId(userId);
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

  @Post('reaction')
  async likeVideo(@Request() req: any) {
    const { videoId, userId } = req.body;
    return await this.videosService.toggleReaction(videoId, userId);
  }

  @Public()
  @Get('search')
  async searchVideos(@Request() req: any) {
    const { search_query } = req.query;
    return await this.videosService.searchVideos(search_query);
  }

  @Get('liked')
  async getLikedVideos(@Request() req: any) {
    const { userId } = req.query;
    return await this.videosService.getLikedVideos(userId);
  }

  @Put()
  async update(@Request() req: any) {
    return await this.videosService.updateVideo(req.body);
  }

  @Post('watch-history')
  async addToWatchHistory(@Request() req: any) {
    const { userId, videoId } = req.body;
    return await this.videosService.updateWatchHistory(videoId, userId);
  }

  @Delete()
  async deleteVideo(@Request() req: any) {
    const { videoId } = req.query;
    return await this.videosService.deleteVideo(videoId);
  }
}
