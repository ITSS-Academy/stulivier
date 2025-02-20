import { Controller, Get, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';

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
}
