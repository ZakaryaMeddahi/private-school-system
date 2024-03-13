import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('api/v1/users')
export class UsersController {
  constructor() {}

  @UseGuards(AuthGuard, AdminGuard)
  @Get()
  getUsers() {
    return 'This action returns all users';
  }

  // create user and send email contains generated password
  createUser() {
    return 'This action adds a new user';
  }

  updateUser() {
    return 'This action updates a user';
  }

  removeUser() {
    return 'This action removes a user';
  }
}
