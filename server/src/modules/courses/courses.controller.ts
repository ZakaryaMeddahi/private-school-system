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
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
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
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from '../files/files.service';

@Controller('api/v1/courses')
@UseGuards(AuthGuard, RolesGuard)
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly filesService: FilesService,
  ) {}

  // get chats of the teacher route associated with a course
  @Get('chats')
  async getChats(@AuthUser() user: JwtPayload) {
    try {
      const { sub: userId, role } = user;
      const courses = await this.coursesService.findCoursesChats(userId, role);
      return {
        status: 'success',
        message: 'Chat Rooms retrieved successfully',
        data: courses,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Get()
  async getCourses(
    @AuthUser() user: JwtPayload,
    @Query('search') search: string,
  ) {
    try {
      const courses = await this.coursesService.findAll(search);
      return {
        status: 'success',
        message: 'Courses retrieved successfully',
        data: courses,
      };
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

      return {
        status: 'success',
        message: 'Course retrieved successfully',
        data: course,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  @Roles(Role.TEACHER)
  @UseInterceptors(FileInterceptor('file'))
  async createCourse(
    @AuthUser() user: JwtPayload,
    @Body() courseData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { sub: userId } = user;

      const newFile = await this.filesService.create(file);

      const course = await this.coursesService.create(
        userId,
        JSON.parse(courseData.data),
        newFile,
      );
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
  @UseInterceptors(FileInterceptor('file'))
  async updateCourse(
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
    @Body() courseData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { sub: userId, role } = user;

      const payloadData = JSON.parse(courseData.data);

      if (file) {
        payloadData.file = await this.filesService.create(file);
      }

      const course = await this.coursesService.update(
        userId,
        role,
        id,
        payloadData,
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

      return { status: 'success', message: 'Course deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
