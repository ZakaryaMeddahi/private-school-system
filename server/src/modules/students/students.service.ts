import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from 'src/shared/entities/student.entity';
import { CreateStudentParams, UpdateStudentParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { SocialLinksService } from '../social-links/social-links.service';
import { UsersService } from '../users/users.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    private readonly usersService: UsersService,
    private readonly socialLinksService: SocialLinksService,
    private readonly filesService: FilesService,
  ) {}

  async findAll(search: string) {
    try {
      // TODO: Add user to student object
      let queryBuilder = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoin('student.user', 'user')
        .select('*');

      if (search) {
        queryBuilder = queryBuilder
          .where('user.firstName ILIKE :search', { search: `%${search}%` })
          .orWhere('user.lastName ILIKE :search', { search: `%${search}%` });
      }

      let students = await queryBuilder.getRawMany();

      // remove password
      students = students.map((student) => {
        const { password, userId, ...studentData } = student;
        return studentData;
      });
      return students;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get students', 500);
    }
  }

  async findOne(id: number) {
    try {
      // TODO: Think of a way to get social accounts
      const studentEntity = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoin('student.user', 'user')
        .select('*')
        .where('user.id = :id', { id })
        .getRawOne();

      if (!studentEntity) throw new NotFoundException('Student not found');

      const { password, userId, ...student } = studentEntity;

      return student;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get student',
        error.status || 500,
      );
    }
  }

  async findByUserId(userId: number) {
    try {
      const studentEntity = await this.studentRepository
        .createQueryBuilder('student')
        .leftJoin('student.user', 'user')
        .select('*')
        .orWhere('user.id = :id', { id: userId })
        .getRawOne();

      if (!studentEntity) throw new NotFoundException('Student not found');

      const socialLinks = await this.socialLinksService.findByUserId(userId);

      const { password, userId: id, ...student } = studentEntity;

      return { ...student, socialLinks };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get teacher',
        error.status || 500,
      );
    }
  }

  async findEntityByUserId(userId: number) {
    try {
      const studentEntity = await this.studentRepository.findOne({
        where: { user: { id: Equal(userId) } },
      });

      if (!studentEntity) throw new NotFoundException('Student not found');

      return studentEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get student',
        error.status || 500,
      );
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

  async updateAccount(
    id: number,
    studentData: UpdateStudentParams,
    image: Express.Multer.File,
  ) {
    try {
      const student = await this.studentRepository.findOne({
        where: { user: { id: Equal(id) } },
      });
      if (!student) throw new NotFoundException('Student not found');

      const { biography, ...userData } = studentData;

      const user = await this.usersService.update(id, userData);

      student.user = user;
      student.biography = biography;

      if (image) {
        const file = await this.filesService.create(image);
        student.profilePicture = file.url;
      }

      await this.studentRepository.save(student);

      return await this.findByUserId(id);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update student',
        error.status || 500,
      );
    }
  }

  async updateProfilePicture(userId: number, image: Express.Multer.File) {
    try {
      const teacher = await this.studentRepository.findOne({
        where: { user: { id: Equal(userId) } },
      });

      if (!teacher) throw new NotFoundException(' Student not found');

      const file = await this.filesService.create(image);
      teacher.profilePicture = file.url;

      await this.studentRepository.save(teacher);

      return await this.findByUserId(userId);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update profile picture',
        error.status || 500,
      );
    }
  }

  async remove(id: number) {
    try {
      const student = await this.studentRepository.findOne({
        where: { user: { id: Equal(id) } },
      });
      if (!student) throw new NotFoundException('Student not found');
      await this.studentRepository.remove(student);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get student',
        error.status || 500,
      );
    }
  }
}
