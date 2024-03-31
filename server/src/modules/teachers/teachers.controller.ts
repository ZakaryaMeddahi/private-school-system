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
} from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';

@Controller('api/v1/teachers')
export class TeachersController {
  constructor(private readonly teachersService: TeachersService) {}

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
