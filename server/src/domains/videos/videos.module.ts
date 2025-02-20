import { Module } from '@nestjs/common';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { VideoGateway } from './video.gateway';

@Module({
  controllers: [VideosController],
  providers: [VideosService, VideoGateway],
  exports: [VideosService, VideoGateway],
})
export class VideosModule {}
