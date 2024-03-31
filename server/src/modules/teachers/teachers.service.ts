import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/shared/entities/teacher.entity';
import { CreateTeacherParams, UpdateTeacherParams } from 'src/shared/types';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { Role } from 'src/shared/enums';
import { hashPassword } from 'src/helpers/bcrypt';
import generatePassword from 'src/helpers/generate-password';
import { SocialLinksService } from '../social-links/social-links.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly socialLinksService: SocialLinksService,
  ) {}

  async findAll() {
    try {
      const teachers = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoin('teacher.user', 'user')
        .select(['teacher.id', 'user.email', 'user.firstName', 'user.lastName'])
        .getRawMany();

      return teachers;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get teachers', 500);
    }
  }

  async findOne(id: number) {
    try {
      const teacher = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoin('teacher.user', 'user')
        .select('*')
        .where('teacher.id = :id', { id })
        .getRawOne();

      if (!teacher) throw new NotFoundException('Teacher not found');

      const { password, ...teacherWithoutPassword } = teacher;

      return teacherWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get teacher', 500);
    }
  }

  async findByUserId(userId: number) {
    try {
      const teacher = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoin('teacher.user', 'user')
        .select('*')
        .where('user.id = :id', { id: userId })
        .getRawOne();

      if (!teacher) throw new NotFoundException('Teacher not found');

      const socialLinks = await this.socialLinksService.findByUserId(userId);

      return { ...teacher, socialLinks };
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get teacher',
        error.status || 500,
      );
    }
  }

  async create(teacherData: CreateTeacherParams) {
    try {
      // Cerate user then add id to teacher object
      // Generate password
      const password = generatePassword(10);
      console.log('password: ' + password);

      // Hash password
      const hash = await hashPassword(password);
      const user = await this.usersService.create({
        ...teacherData,
        password: hash,
        role: Role.TEACHER,
      });

      // Send email to user
      console.log('-------------------------------------');
      console.log({ ...user, password });
      console.log('-------------------------------------');
      await this.mailService.sendUserRegistration({ ...user, password });

      const newTeacher = this.teacherRepository.create({
        user,
      });

      const teacher = await this.teacherRepository.save(newTeacher);

      return teacher;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create teacher', 500);
    }
  }

  async update(id: number, teacherData: UpdateTeacherParams) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });

      if (!teacher) throw new NotFoundException('Teacher not found');

      // Get user id from teacher object then update user object
      const updatedUser = await this.usersService.update(teacher.user.id, {
        ...teacherData,
      });

      teacher.user = updatedUser;

      return await this.teacherRepository.save(teacher);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update teacher', 500);
    }
  }

  async remove(id: number) {
    try {
      const teacher = await this.teacherRepository.findOne({ where: { id } });

      if (!teacher) throw new NotFoundException('Teacher not found');

      return await this.teacherRepository.remove(teacher);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot remove teacher', 500);
    }
  }
}
