import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/shared/entities/student.entity';
import { CreateStudentParams } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async findAll() {
    try {
      // TODO: Add user to student object
      const students = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoin('student.user', 'user')
        .select(['student.id', 'user.email', 'user.firstName', 'user.lastName'])
        .getRawMany();
      return students;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get students', 500);
    }
  }

  async findOne(id: number) {
    try {
      // TODO: Think of a way to get social accounts
      const student = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoin('student.user', 'user')
        .select('*')
        .where('student.id = :id', { id })
        .getRawOne();
        
      if (!student) throw new NotFoundException('Student not found');

      const { password, ...studentWithoutPassword } = student;

      return studentWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get student', 500);
    }
  }

  async create(userId: number, studentData: CreateStudentParams) {
    try {
      const newStudent = this.studentRepository.create({
        ...studentData,
        user: { id: userId },
      });
      const studentEntity = await this.studentRepository.save(newStudent);
      return studentEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create student', 500);
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) throw new NotFoundException('Student not found');
      await this.studentRepository.remove(student);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get student', 500);
    }
  }
}
