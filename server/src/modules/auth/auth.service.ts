import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserParams, RegisterUserParams } from '../../shared/types';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

let users = [];

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
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

      const userEntity = await this.usersRepository.save(newUser);
      console.log(userEntity);

      const access_token = this.jwtService.sign({
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role,
      });

      console.log({ ...userEntity, access_token });

      return { ...userEntity, access_token };
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

      return { ...user, access_token };
    } catch (error) {
      throw new HttpException('Something went wrong in the server', 500);
    }
  }
}
