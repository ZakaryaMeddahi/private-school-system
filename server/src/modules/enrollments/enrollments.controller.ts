import {
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

@Controller('api/v1/courses')
@UseGuards(AuthGuard)
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
  @UseGuards(TeacherGuard, AdminGuard)
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

  // Enroll Student In A Course (Student)
  @Post(':courseId/enrollments')
  @UseGuards(StudentGuard)
  async enrollStudent(
    @AuthUser() user: JwtPayload,
    @Param('courseId', ParseIntPipe) courseId: number,
    enrollmentData: CreateEnrollmentDto,
  ) {
    try {
      const enrollment = await this.enrollmentService.create(
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
  @UseGuards(AdminGuard)
  async updateEnrollment(
    @Param('id', ParseIntPipe) id: number,
    enrollmentData: UpdateEnrollmentDto,
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
  @UseGuards(StudentGuard)
  async cancelEnrollment(
    @AuthUser() user: JwtPayload,
    @Param('id', ParseIntPipe) id: number,
  ) {
    try {
      await this.enrollmentService.remove(id);
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
