import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Teacher } from 'src/shared/entities/teacher.entity';
import { CreateTeacherParams, UpdateTeacherParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { MailService } from '../mail/mail.service';
import { Role } from 'src/shared/enums';
import { hashPassword } from 'src/helpers/bcrypt';
import generatePassword from 'src/helpers/generate-password';
import { SocialLinksService } from '../social-links/social-links.service';
import { FilesService } from '../files/files.service';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher) private teacherRepository: Repository<Teacher>,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly socialLinksService: SocialLinksService,
    private readonly filesService: FilesService,
  ) {}

  async findAll() {
    try {
      let teachers = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoin('teacher.user', 'user')
        .select('*')
        .getRawMany();

        teachers = teachers.map((teacher) => {
          const { password, userId, ...teacherData } = teacher;
          return teacherData;
        });

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
        .where('user.id = :id', { id })
        .getRawOne();

      if (!teacher) throw new NotFoundException('Teacher not found');

      const { password, userId, ...teacherWithoutPassword } = teacher;

      return teacherWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot get teacher',
        error.status || 500,
      );
    }
  }

  async findByUserId(userId: number) {
    try {
      const teacherEntity = await this.teacherRepository
        .createQueryBuilder('teacher')
        .leftJoin('teacher.user', 'user')
        .select('*')
        .where('user.id = :id', { id: userId })
        .getRawOne();

      if (!teacherEntity) throw new NotFoundException('Teacher not found');

      const socialLinks = await this.socialLinksService.findByUserId(userId);

      const { password, userId: id, ...teacher } = teacherEntity;

      return { ...teacher, socialLinks };
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
      const teacher = await this.teacherRepository.findOne({
        where: { user: { id: Equal(userId) } },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      return teacher;
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
      throw new HttpException(
        error.message || 'Cannot create teacher',
        error.status || 500,
      );
    }
  }

  async update(id: number, teacherData: UpdateTeacherParams) {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      // Get user id from teacher object then update user object
      const { biography, ...userData } = teacherData;
      const updatedUser = await this.usersService.update(teacher.user.id, {
        ...userData,
      });

      teacher.user = updatedUser;

      return await this.teacherRepository.save(teacher);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update teacher',
        error.status || 500,
      );
    }
  }

  async updateAccount(
    userId: number,
    teacherData: UpdateTeacherParams,
    image: Express.Multer.File,
  ) {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { user: { id: Equal(userId) } },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      // Get user id from teacher object then update user object
      const { biography, ...userData } = teacherData;
      const updatedUser = await this.usersService.update(userId, {
        ...userData,
      });

      teacher.user = updatedUser;
      teacher.biography = biography || teacher.biography;
      
      if (image) {
        const file = await this.filesService.create(image);
        teacher.profilePicture = file.url;
      }

      await this.teacherRepository.save(teacher);

      return await this.findByUserId(userId);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update teacher',
        error.status || 500,
      );
    }
  }

  async updateProfilePicture(userId: number, image: Express.Multer.File) {
    try {
      const teacher = await this.teacherRepository.findOne({
        where: { user: { id: Equal(userId) } },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      const file = await this.filesService.create(image);
      teacher.profilePicture = file.url;

      await this.teacherRepository.save(teacher);

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
      const teacher = await this.teacherRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!teacher) throw new NotFoundException('Teacher not found');

      return await this.teacherRepository.remove(teacher);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot remove teacher',
        error.status || 500,
      );
    }
  }
}
