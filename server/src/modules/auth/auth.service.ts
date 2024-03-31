import { HttpException, Injectable } from '@nestjs/common';
import { LoginUserParams, RegisterUserParams } from '../../shared/types';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from '../../shared/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentsService } from '../students/students.service';
import { Role } from 'src/shared/enums';
import { MailService } from '../mail/mail.service';
import { comparePassword, hashPassword } from 'src/helpers/bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly studentsService: StudentsService,
    private readonly mailService: MailService,
  ) {}

  async registerUser(userData: RegisterUserParams) {
    try {
      const user = await this.usersRepository.findOneBy({
        email: userData.email,
      });

      console.log(user);

      if (user) return null;

      const hash = await hashPassword(userData.password);

      const newUser = this.usersRepository.create({
        ...userData,
        password: hash,
        lastLogging: new Date(),
      });
      console.log(newUser);

      const userEntity = await this.usersRepository.save({
        ...newUser,
      });
      console.log(userEntity);

      if (userEntity.role === Role.STUDENT) {
        await this.studentsService.create(userEntity.id, {});
      }

      const access_token = this.jwtService.sign({
        sub: userEntity.id,
        email: userEntity.email,
        role: userEntity.role,
      });

      // TODO: Send confirmation email
      // this.mailService.sendUserRegistration(userEntity);

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
      });

      if (!user) return null;

      const isMatch = await comparePassword(userData.password, user.password);

      if (!isMatch) return null;

      const updatedUser = await this.usersRepository.save({
        ...user,
        lastLogging: new Date(),
      });

      const access_token = this.jwtService.sign({
        sub: updatedUser.id,
        email: updatedUser.email,
        role: updatedUser.role,
      });

      const { password, ...userWithoutPass } = updatedUser;

      return { ...userWithoutPass, access_token };
    } catch (error) {
      throw new HttpException('Something went wrong in the server', 500);
    }
  }
}
