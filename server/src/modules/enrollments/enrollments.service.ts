import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Enrollment } from 'src/shared/entities/enrollment.entity';
import {
  CreateEnrollmentParams,
  UpdateEnrollmentParams,
} from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { StudentsService } from '../students/students.service';
import { EnrollmentStatus } from 'src/shared/enums';
import { MailService } from '../mail/mail.service';

@Injectable()
export class EnrollmentsService {
  constructor(
    @InjectRepository(Enrollment)
    private readonly enrollmentRepository: Repository<Enrollment>,
    // private readonly coursesService: CoursesService,
    private readonly studentsService: StudentsService,
    private readonly mailService: MailService,
  ) {}

  async findOne(userId: number, courseId: number) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: {
          course: { id: Equal(courseId) },
          student: { user: { id: Equal(userId) } },
        },
      });

      return enrollment;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot check if the user is enrolled in the course',
        error.status || 500,
      );
    }
  }

  async isEnrolled(userId: number, courseId: number) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: {
          course: { id: Equal(courseId) },
          student: { user: { id: Equal(userId) } },
          enrollmentStatus: EnrollmentStatus.APPROVED,
        },
      });

      return !!enrollment;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot check if the user is enrolled in the course',
        error.status || 500,
      );
    }
  }

  async findAll(userId: number) {
    try {
      // add student and user relations
      const enrollments = await this.enrollmentRepository.find({
        relations: [
          'student',
          'student.user',
          'course',
          'course.teacher',
          'course.file',
        ],
        where: userId !== 0 ? { student: { user: { id: Equal(userId) } } } : {},
      });
      return enrollments;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot retrieve enrollments', 500);
    }
  }

  async findByCourseId(courseId: number) {
    try {
      // TODO: Check if the course exists in the database

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
      throw new HttpException(
        error.message || 'Cannot retrieve enrollments',
        error.status || 500,
      );
    }
  }

  async getCourseMembers(courseId: number) {
    try {
      // TODO: Check if the course exists in the database

      const enrollments = await this.enrollmentRepository
        .createQueryBuilder('enrollment')
        .leftJoinAndSelect('enrollment.student', 'student')
        .leftJoinAndSelect('student.user', 'user')
        .where('enrollment.course = :courseId', { courseId })
        .andWhere('enrollment.enrollmentStatus = :status', {
          status: EnrollmentStatus.APPROVED,
        })
        .getMany();

      const members = enrollments.map((enrollment) => enrollment.student);

      if (!members) {
        throw new NotFoundException(
          `There are no members for the course with the id ${courseId}`,
        );
      }

      return members;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot retrieve members',
        error.status || 500,
      );
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
      throw new HttpException(
        error.message || 'Cannot enroll in this course',
        error.status || 500,
      );
    }
  }

  async update(id: number, enrollmentData: UpdateEnrollmentParams) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        relations: ['course', 'student', 'student.user'],
        where: { id: Equal(id) },
      });

      if (!enrollment) {
        throw new NotFoundException(`There is no enrollment with the id ${id}`);
      }

      const updatedEnrollment = await this.enrollmentRepository.save({
        ...enrollment,
        ...enrollmentData,
      });

      console.log(updatedEnrollment);

      await this.mailService.sendEnrollmentStatus(
        enrollment.student.user,
        updatedEnrollment.enrollmentStatus,
        enrollment.course,
        updatedEnrollment.enrollmentStatus === EnrollmentStatus.APPROVED
          ? 'Congratulation, you are enrolled!'
          : 'Your enrollment has been rejected.',
      );

      return updatedEnrollment;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update enrollment',
        error.status || 500,
      );
    }
  }

  async remove(userId: number, id: number) {
    try {
      const enrollment = await this.enrollmentRepository.findOne({
        where: { id: Equal(id), student: { user: { id: Equal(userId) } } },
      });

      if (!enrollment) {
        throw new NotFoundException(`There is no enrollment with the id ${id}`);
      }

      await this.enrollmentRepository.delete(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot cancel enrollment',
        error.status || 500,
      );
    }
  }
}
