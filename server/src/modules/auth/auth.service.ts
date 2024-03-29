import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserParams, RegisterUserParams } from '../../shared/types';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { StudentsService } from '../students/students.service';
import { Role } from 'src/shared/enums';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly studentsService: StudentsService,
  ) {}

  async registerUser(userData: RegisterUserParams) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: userData.email,
      });

      console.log(user);

      if (user) return null;

      const newUser = this.usersRepository.create(userData);
      console.log(newUser);

      const userEntity = await this.usersRepository.save({
        ...newUser,
        lastLogging: new Date(),
      });
      console.log(userEntity);

      if(userEntity.role === Role.STUDENT) {
        await this.studentsService.create(userEntity.id, {});
      }

      const access_token = this.jwtService.sign({
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role,
      });

      const { password, ...userWithoutPass } = userEntity;

      console.log({ ...userEntity, access_token });

      return { ...userWithoutPass, access_token };
    } catch (error) {
      console.error(error);
      throw new HttpException('Something went wrong in the server', 500);
    }
  }

  async loginUser(userData: LoginUserParams) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: userData.email,
        password: userData.password,
      });

      if (!user) return null;

      const access_token = this.jwtService.sign({
        sub: user.id,
        email: user.email,
        role: user.role,
      });

      const { password, ...userWithoutPass } = user;

      return { ...userWithoutPass, access_token };
    } catch (error) {
      throw new HttpException('Something went wrong in the server', 500);
    }
  }
}
