import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserParams, UpdateUserParams } from 'src/shared/types';
import { Role } from 'src/shared/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOne(id: number, role: Role) {
    try {
      // TODO: Check the query correctness
      const user = await this.usersRepository
        .createQueryBuilder('user')
        .leftJoin(`user.${role}`, role)
        .leftJoin('user.socialAccounts', 'socialAccounts')
        .select('*')
        .where('user.id = :id', { id })
        .getRawOne();

      if (!user) throw new NotFoundException('User not found');

      // TODO: Get the user's role and social accounts
      // TODO: dynamically based on the `role` parameter

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

      const { password, ...userWithoutPassword } = userEntity;

      return userWithoutPassword;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create user', 500);
    }
  }

  async update(id: number, userData: UpdateUserParams) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });
      if (!user) throw new NotFoundException('User not found');

      const updatedUser = await this.usersRepository.save({
        ...user,
        ...userData,
      });

      return updatedUser;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update user', 500);
    }
  }
}
