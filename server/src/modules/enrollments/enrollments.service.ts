import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/shared/entities/enrollment.entity';
import {
  CreateEnrollmentParams,
  UpdateEnrollmentParams,
} from 'src/shared/types';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    // private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
  ) {}

  async findAll() {
    try {
      const enrollments = await this.enrollmentRepository.find();
      return enrollments;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot retrieve enrollments', 500);
    }
  }

  async findByCourseId(courseId: number) {
    try {
      // Check if the course exists in the database

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

  async create(
    userId: number,
    courseId: number,
    enrollmentData: CreateEnrollmentParams,
  ) {
    try {
      // const course = await this.coursesService.findOne(courseId);

      // if (!course) {
      //   throw new NotFoundException(
      //     `The course with the id ${courseId} was not found`,
      //   );
      // }

      const student = await this.studentsService.findEntityByUserId(userId);

      const newEnrollment = this.enrollmentRepository.create({
        ...enrollmentData,
        course: { id: courseId },
        student: { id: student.id },
      });

      await this.enrollmentRepository.save(newEnrollment);
      return newEnrollment;
    } catch (error) {
      console.error(error);
      if (error.code === '23503') {
        throw new NotFoundException(
          `There is no course with the provided id ${courseId}`,
        );
      }
      throw new HttpException('Cannot enroll in this course', 500);
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

  async remove(userId: number, id: number) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id, student: { user: { id: userId } } },
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
