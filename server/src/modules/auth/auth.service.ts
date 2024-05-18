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
import { SocialLinksService } from '../social-links/social-links.service';
import { Admin } from 'src/shared/entities/admin.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly studentsService: StudentsService,
    private readonly mailService: MailService,
    private readonly socialLinksService: SocialLinksService,
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

      await this.socialLinksService.create(userEntity.id, {});

      if (userEntity.role === Role.STUDENT) {
        await this.studentsService.create(userEntity.id, {});
      }

      // ! Create Account for Admin
      if (userEntity.role === Role.ADMIN) {
        const admin = this.adminRepository.create({
          user: { id: userEntity.id },
        });
        await this.adminRepository.save(admin);
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
      console.log(userData);
      const user = await this.usersRepository
        .createQueryBuilder()
        .addSelect('password')
        .where('email = :email', { email: userData.email })
        .getOne();

      console.log(user);

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
      console.error(error);
      throw new HttpException('Something went wrong in the server', 500);
    }
  }
}
