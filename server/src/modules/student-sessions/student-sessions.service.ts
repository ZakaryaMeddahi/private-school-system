import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentSession } from 'src/shared/entities/studentSession.entity';
import { Repository } from 'typeorm';
import { StudentsService } from '../students/students.service';
import {
  CreateStudentSessionParams,
  UpdateStudentSessionParams,
} from 'src/shared/types';

@Injectable()
export class StudentSessionsService {
  constructor(
    @InjectRepository(StudentSession)
    private readonly studentSessionRepository: Repository<StudentSession>,
    private readonly studentsService: StudentsService,
  ) {}

  async create(
    userId: number,
    sessionId: number,
    studentSessionData: CreateStudentSessionParams,
  ) {
    try {
      const student = await this.studentsService.findByUserId(userId);

      if (!student) throw new NotFoundException('Student not found');

      const studentSession = this.studentSessionRepository.create({
        ...studentSessionData,
        student: { id: student.id },
        session: { id: sessionId },
      });

      await this.studentSessionRepository.save(studentSession);

      return studentSession;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create student session', 500);
    }
  }

  async update(id: number, studentSessionData: UpdateStudentSessionParams) {
    try {
      const studentSession = await this.studentSessionRepository.findOne({
        where: [{ id }, { student: { id } }, { session: { id } }],
      });

      if (!studentSession) {
        throw new NotFoundException('Student session not found');
      }

      const updatedStudentSession = await this.studentSessionRepository.save({
        ...studentSession,
        ...studentSessionData,
      });

      return updatedStudentSession;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update student session', 500);
    }
  }
}
