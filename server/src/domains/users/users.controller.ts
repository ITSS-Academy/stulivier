import { Controller, Get, Post, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Request() req: any) {
    return await this.usersService.create(req.user);
  }

  @Put()
  async update(@Request() req: any) {
    // console.log('Auth user:', req.user);  // Kiểm tra dữ liệu từ Firebase
    // console.log('Request body:', req.body);  // Kiểm tra dữ liệu từ client
    // console.log('Updating user:', req.user); // Kiểm tra dữ liệu gửi lên
    return await this.usersService.update(req.user.user_id, req.body);
  }


  @Get()
  async findOne(@Request() req: any) {
    return await this.usersService.findOne(req.user.uid || req.user.id);
  }
}
