import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/createEnrollment.dto';
import { UpdateEnrollmentDto } from './dto/updateEnrollment.dto';
import { AuthUser } from 'src/decorators/user.decorator';
import { User } from 'src/shared/entities/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { StudentGuard } from 'src/guards/student.guard';
import { TeacherGuard } from 'src/guards/teacher.guard';
import { JwtPayload } from 'src/shared/types';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/shared/enums';

@Controller('api/v1/courses')
@UseGuards(AuthGuard) // RolesGuard
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}

  // Get All Enrollments Associated With The Student And Course (Admin, Teacher)
  // Get All Enrollments Associated With A Specific Course (Student)
  @Get('enrollments')
  async getAllEnrollments() {
    try {
      const enrollments = await this.enrollmentService.findAll();
      return {
        status: 'success',
        message: 'Enrollments retrieved successfully',
        data: enrollments,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // Get Enrollments By Course Id Associated With The Student (Admin, Teacher)
  @Get(':courseId/enrollments')
  @Roles(Role.ADMIN, Role.TEACHER)
  async getEnrollmentsByCourseId(
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    try {
      const enrollments = await this.enrollmentService.findByCourseId(courseId);
      return {
        status: 'success',
        message: 'Enrollments retrieved successfully',
        data: enrollments,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // Get Course members
  @Get(':courseId/members')
  // @Roles(Role.ADMIN, Role.TEACHER)
  async getCourseMembers(
    @Param('courseId', ParseIntPipe) courseId: number,
  ) {
    try {
      const members = await this.enrollmentService.getCourseMembers(courseId);
      return {
        status: 'success',
        message: 'Course members retrieved successfully',
        data: members,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // Enroll Student In A Course (Student)
  @Post(':courseId/enrollments')
  @Roles(Role.STUDENT)
  async enrollStudent(
    @AuthUser() user: JwtPayload,
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() enrollmentData: CreateEnrollmentDto,
  ) {
    try {
      const { sub: userId } = user;
      const enrollment = await this.enrollmentService.create(
        userId,
        courseId,
        enrollmentData,
      );
      return {
        status: 'success',
        message: 'Enrolled successfully',
        data: enrollment,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // Update Enrollment (Admin)
  @Patch('enrollments/:id')
  // @Roles(Role.ADMIN)
  async updateEnrollment(
    @Param('id', ParseIntPipe) id: number,
    @Body() enrollmentData: UpdateEnrollmentDto,
  ) {
    try {
      const updatedEnrollment = await this.enrollmentService.update(
        id,
        enrollmentData,
      );
      return {
        status: 'success',
        message: 'Enrollment updated successfully',
        data: updatedEnrollment,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // Cancel Enrollment (Student)
  @Delete('enrollments/:id')
  @Roles(Role.STUDENT)
  async cancelEnrollment(
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      const { sub: userId } = user;
      await this.enrollmentService.remove(userId, id);
      return {
        status: 'success',
        message: 'Enrollment canceled successfully',
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
