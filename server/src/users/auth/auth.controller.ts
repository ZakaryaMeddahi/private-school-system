import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Role } from '../../utils/enums';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() registerUserDto: RegisterUserDto) {
    const role = Role.ADMIN;
    const data = this.authService.register({ ...registerUserDto, role });
    return {
      status: 'success',
      message: 'User Registered in successfully',
      data,
    };
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto) {
    const data = this.authService.login(loginUserDto);
    return { status: 'success', message: 'User logged in successfully', data };
  }
}
