import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Request() req: any) {
    return await this.usersService.create(req.user);
  }

  @Get()
  async findOne(@Request() req: any) {
    return await this.usersService.findOne(req.user.uid || req.user.id);
  }

  @Post('channel')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @UploadedFile() file: Multer.File,
    @Body('userId') userId: string,
  ) {
    const parsedUserId = JSON.parse(userId);
    return await this.usersService.updateChannelImage(parsedUserId, file);
  }

  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @UploadedFile() file: Multer.File,
    @Body('userId') userId: string,
  ) {
    const parsedUserId = JSON.parse(userId);
    return await this.usersService.updateAvatar(parsedUserId, file);
  }

  @Post('describe')
  async updateDescribe(@Body() body: any) {
    return await this.usersService.updateDescribe(body.userId, body.describe);
  }
}
