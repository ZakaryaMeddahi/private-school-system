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
  UseGuards,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { createCourseDto } from './dto/createCourse.dto';
import { UpdateCourseDto } from './dto/updateCourse.dto';
import { AuthUser } from 'src/decorators/user.decorator';
import { User } from 'src/shared/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { JwtPayload } from 'src/shared/types';
import { TeacherGuard } from 'src/guards/teacher.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';

@Controller('api/v1/courses')
@UseGuards(AuthGuard, RolesGuard)
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async getCourses(@AuthUser() user: JwtPayload) {
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
  @Roles(Role.TEACHER)
  async createCourse(
    @AuthUser() user: JwtPayload,
    @Body() courseData: createCourseDto,
  ) {
    try {
      const { sub: userId } = user;
      const course = await this.coursesService.create(userId, courseData);
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
  @Roles(Role.TEACHER, Role.ADMIN)
  async updateCourse(
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() courseData: UpdateCourseDto,
  ) {
    try {
      const { sub: userId, role } = user;

      const course = await this.coursesService.update(
        userId,
        role,
        id,
        courseData,
      );

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
  @Roles(Role.TEACHER)
  async removeCourse(
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const { sub: userId, role } = user;

      const course = await this.coursesService.remove(userId, role, id);

      if (!course) {
        throw new NotFoundException('Course not found');
      }

      return { status: 'success', message: 'Course removed successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
