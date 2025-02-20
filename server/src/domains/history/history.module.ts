import { Module } from '@nestjs/common';
import { HistoryController } from './history.controller';
import { HistoryService } from './history.service';
import { VideosService } from '../videos/videos.service';
import { VideosModule } from '../videos/videos.module';

@Module({
  controllers: [HistoryController],
  providers: [HistoryService],
  imports: [VideosModule],
})
export class HistoryModule {}
