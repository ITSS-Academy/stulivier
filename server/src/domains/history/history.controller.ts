import { Controller, Get, Request } from '@nestjs/common';
import { HistoryService } from './history.service';

@Controller('history')
export class HistoryController {
  constructor(private historyService: HistoryService) {}

  @Get()
  async getHistoryByUserId(@Request() req: any) {
    const { userId } = req.query;
    return await this.historyService.getHistoryByUserId(userId);
  }
}
