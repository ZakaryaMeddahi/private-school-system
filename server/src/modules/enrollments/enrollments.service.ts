import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/shared/entities/enrollment.entity';
import {
  CreateEnrollmentParams,
  UpdateEnrollmentParams,
} from 'src/shared/types';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    private readonly coursesService: CoursesService,
  ) {}

  async findByCourseId(courseId: number) {
    try {
      // const enrollments = await this.enrollmentRepository.find({
      //   where: { course: { id: courseId } },
      // });

      const enrollments = await this.enrollmentRepository
        .createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.student', 'student')
        .leftJoinAndSelect('student.user', 'user')
        .where('enrollment.course = :courseId', { courseId })
        .getMany();

      if (!enrollments) {
        throw new NotFoundException(
          `There are no enrollments for the course with the id ${courseId}`,
        );
      }

      return enrollments;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot retrieve enrollments', 500);
    }
  }

  async create(courseId: number, enrollmentData: CreateEnrollmentParams) {
    try {
      const course = await this.coursesService.findOne(courseId);

      if (!course) {
        throw new NotFoundException(
          `The course with the id ${courseId} was not found`,
        );
      }

      const newEnrollment = this.enrollmentRepository.create({
        ...enrollmentData,
        course,
      });

      await this.enrollmentRepository.save(newEnrollment);
      return newEnrollment;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot Enroll', 500);
    }
  }

  async update(id: number, enrollmentData: UpdateEnrollmentParams) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id },
      });

      if (!enrollment) {
        throw new NotFoundException(`There is no enrollment with the id ${id}`);
      }

      const updatedEnrollment = await this.enrollmentRepository.save({
        ...enrollment,
        ...enrollmentData,
      });

      return updatedEnrollment;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update enrollment', 500);
    }
  }

  async remove(id: number) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id },
      });

      if (!enrollment) {
        throw new NotFoundException(`There is no enrollment with the id ${id}`);
      }

      await this.enrollmentRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot cancel enrollment', 500);
    }
  }
}
