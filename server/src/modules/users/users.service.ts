import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/shared/types';
import { SocialLinksService } from '../social-links/social-links.service';
// import { StudentsService } from '../students/students.service';
// import { TeachersService } from '../teachers/teachers.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly socialLinksService: SocialLinksService,
    // private readonly studentsService: StudentsService,
    // private readonly teachersService: TeachersService,
  ) {}

  // async findOne(id: number, role: Role) {
  //   try {
  //     let user: User;

  //     const userEntity = await this.usersRepository.findOne({ where: { id } });
  //     // .createQueryBuilder('user')
  //     // .leftJoin(`user.${role}`, role)
  //     // .leftJoin('user.socialLinks', 'socialLinks')
  //     // .select('*')
  //     // .where('user.id = :id', { id })
  //     // .getRawOne();

  //     if (!userEntity) throw new NotFoundException('User not found');

  //     // TODO: Get the user's role
  //     // TODO: dynamically based on the `role` parameter
  //     if (role === Role.STUDENT) {
  //       user = await this.studentsService.findOne(id);
  //     }

  //     if (role === Role.TEACHER) {
  //       user = await this.teachersService.findOne(id);
  //     }

  //     // TODO: Get user's social links and add them to the response object
  //     const socialLinks = this.socialLinksService.findByUserId(id);

  //     return { ...user, socialLinks };
  //   } catch (error) {
  //     console.error(error);
  //     throw new HttpException('Cannot get user', 500);
  //   }
  // }

  async findOne(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      return user;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get user', 500);
    }
  }

  async create(userData: CreateUserParams) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: userData.email },
      });
      if (user) throw new BadRequestException('Email already exists');

      const newUser = this.usersRepository.create(userData);
      const userEntity = await this.usersRepository.save(newUser);

      await this.socialLinksService.create(userEntity.id, {});

      const { password, ...userWithoutPassword } = userEntity;

      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot create user',
        error.status || 500,
      );
    }
  }

  async update(id: number, userData: UpdateUserParams) {
    try {
      const user = await this.usersRepository.findOne({
        where: { id: Equal(id) },
      });
      if (!user) throw new NotFoundException('User not found');

      const updatedUser = await this.usersRepository.save({
        ...user,
        ...userData,
        updatedAt: new Date(),
      });

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update user',
        error.status || 500,
      );
    }
  }
}
