import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { createCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';

@Controller('api/v1/courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses() {
    try {
      const courses = await this.coursesService.findAll();
      return { status: 'success', data: courses };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get(':id')
  async getCourse(@Param('id', ParseIntPipe) id: number) {
    try {
      const course = await this.coursesService.findOne(id);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      return { status: 'success', data: course };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  async createCourse(@Body() courseData: createCourseDto) {
    try {
      const course = await this.coursesService.create(courseData);
      return {
        status: 'success',
        message: 'Course created successfully',
        data: course,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Patch(':id')
  async updateCourse(
    @Param('id', ParseIntPipe) id: number,
    @Body() courseData: UpdateCourseDto,
  ) {
    try {
      const course = await this.coursesService.update(id, courseData);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      return {
        status: 'success',
        message: 'Course updated successfully',
        data: course,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  async removeCourse(@Param('id', ParseIntPipe) id: number) {
    try {
      const course = await this.coursesService.remove(id);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      return { status: 'success', message: 'Course removed successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
