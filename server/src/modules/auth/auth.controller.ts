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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('api/v1/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'Register a new student account',
    description:
      'Creates a student account and returns the profile together with an access token.',
  })
  @ApiResponse({ status: 201, description: 'Account created.' })
  @ApiResponse({ status: 400, description: 'Email already exists.' })
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

  @ApiOperation({
    summary: 'Log in',
    description:
      'Exchanges email and password for an access token to use with the **Authorize** button.',
  })
  @ApiResponse({ status: 201, description: 'Authenticated.' })
  @ApiResponse({ status: 400, description: 'Invalid credentials.' })
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
