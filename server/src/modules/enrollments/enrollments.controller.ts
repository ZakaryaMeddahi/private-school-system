import {
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/createEnrollment.dto';
import { UpdateEnrollmentDto } from './dto/updateEnrollment.dto';

@Controller('api/v1/courses/:courseId/enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentService: EnrollmentsService) {}

  @Get()
  async getEnrollments(@Param('courseId', ParseIntPipe) courseId: number) {
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

  @Post()
  async enrollStudent(
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

  async cancelEnrollment(@Param('id', ParseIntPipe) id: number) {
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
