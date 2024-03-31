import { Controller, Get, HttpException, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { UsersService } from './users.service';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';

@Controller('api/v1/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('account/me')
  @UseGuards(AuthGuard)
  async getUser(@AuthUser() user: JwtPayload) {
    const { sub: id, role } = user;
    try {
      const user = await this.usersService.findOne(id, role);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }
}
