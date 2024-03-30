import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/shared/entities/student.entity';
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
      const students = await this.studentRepository.find();
      return students;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get students', 500);
    }
  }

  async findOne(id: number) {
    try {
      // TODO: Add user to student object
      const student = await this.studentRepository.findOne({ where: { id } });
      if (!student) throw new NotFoundException('Student not found');
      return student;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get student', 500);
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
