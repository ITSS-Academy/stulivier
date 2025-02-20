import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Request,
  Get,
} from '@nestjs/common';
import { VideosService } from './videos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Public } from '../../utils/custom_decorators';

@Controller('videos')
export class VideosController {
  constructor(private videosService: VideosService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file')) // Nhận file từ FormData
  async uploadVideo(
    @UploadedFile() file: Multer.File,
    @Body('createVideoDto') createVideoDto: string,
    @Request() req: any,
  ) {
    const parsedCreateVideoDto = JSON.parse(createVideoDto);
    return await this.videosService.createVideo(
      file,
      parsedCreateVideoDto,
      req.user.id || req.user.uid,
    );
  }

  @Public()
  @Get('all')
  async getVideos() {
    return await this.videosService.getAllVideos();
  }

  @Public()
  @Get()
  async getVideoById(@Request() req: any) {
    const { userId, videoId } = req.query;
    return await this.videosService.getVideoById(videoId, userId);
  }


}
