import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from './dto/login.dto';
import { RegisterUserDto } from './dto/register.dto';
import { Role } from '../../shared/enums';

@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    try {
      const role = Role.STUDENT;
      // const role = Role.ADMIN;
      const data = await this.authService.registerUser({
        ...registerUserDto,
        role,
      });
      console.log(data);
      if (!data) {
        throw new BadRequestException('Email already exists');
      }
      return {
        status: 'success',
        message: 'User Registered successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      const data = await this.authService.loginUser(loginUserDto);
      if (!data) {
        throw new BadRequestException('Invalid Credentials');
      }
      return {
        status: 'success',
        message: 'User logged in successfully',
        data,
      };
    } catch (error) {
      throw new HttpException(error.response, error.status);
    }
  }
}
