import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpException,
  ParseIntPipe,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('api/v1/teachers')
@UseGuards(AuthGuard, RolesGuard)
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

  @Get('account/me')
  async myAccount(@AuthUser() user: JwtPayload) {
    const { sub: id } = user;
    try {
      const user = await this.teachersService.findByUserId(id);
      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Something went wrong in the server',
        error.status || 500,
      );
    }
  }

  // TODO: Add update account endpoint

  @Get()
  async getTeachers() {
    try {
      const teachers = await this.teachersService.findAll();
      return { status: 'success', data: teachers };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Get(':id')
  async getTeacher(@Param('id', ParseIntPipe) id: number) {
    try {
      const teacher = await this.teachersService.findOne(id);
      if (!teacher) throw new NotFoundException('Teacher not found');
      return { status: 'success', data: teacher };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Post()
  @Roles(Role.ADMIN)
  async createTeacher(@Body() courseData: CreateTeacherDto) {
    try {
      const newTeacher = await this.teachersService.create(courseData);
      return { status: 'success', data: newTeacher };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  async updateTeacher(
    @Param('id', ParseIntPipe) id: number,
    @Body() courseData: UpdateTeacherDto,
  ) {
    try {
      const updatedTeacher = await this.teachersService.update(id, courseData);
      return { status: 'success', data: updatedTeacher };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  async removeTeacher(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.teachersService.remove(id);
      return { status: 'success', message: 'Teacher removed successfully' };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Internal server error',
        error.status || 500,
      );
    }
  }
}
