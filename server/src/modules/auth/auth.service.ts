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
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    private readonly studentsService: StudentsService,
    private readonly mailService: MailService,
    private readonly socialLinksService: SocialLinksService,
  ) {}

  async registerUser(userData: RegisterUserParams) {
    try {
      const user = await this.userRepository.findOneBy({
        email: userData.email,
      });

      // TODO: returning `null` conflates "email taken" with a legitimate
      // empty result and forces callers to guess. Throw a `ConflictException`
      // instead, then tighten the matching test to `.rejects.toThrow`.
      if (user) return null;

      const hash = await hashPassword(userData.password);

      const newUser = this.userRepository.create({
        ...userData,
        password: hash,
        lastLogging: new Date(),
      });

      const userEntity = await this.userRepository.save({
        ...newUser,
      });

      await this.socialLinksService.create(userEntity.id, {});

      if (userEntity.role === Role.STUDENT) {
        await this.studentsService.create(userEntity.id, {});
      }

      // ! Create Account for Admin
      // TODO: the student branch above goes through `StudentsService` while
      // this one writes through the repository directly. Move it behind an
      // `AdminsService` so both roles follow the same path.
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

      return { ...userWithoutPass, access_token };
    } catch (error) {
      // TODO: this flattens every error to a generic 500, swallowing the real
      // status and message. Forward `error.message` / `error.status` the way
      // `UsersService` already does.
      throw new HttpException('Something went wrong in the server', 500);
    }
  }

  async loginUser(userData: LoginUserParams) {
    try {
      // TODO: `addSelect('password')` is redundant — the `password` column has
      // no `select: false`, so it is already selected. This whole builder can
      // collapse to `findOne({ where: { email: userData.email } })`.
      const user = await this.userRepository
        .createQueryBuilder()
        .addSelect('password')
        .where('email = :email', { email: userData.email })
        .getOne();

      // TODO: both of these `null` returns should be a single
      // `UnauthorizedException` — same message for either case, so the response
      // does not reveal whether the email exists. Then tighten the matching
      // tests to `.rejects.toThrow`.
      if (!user) return null;

      const isMatch = await comparePassword(userData.password, user.password);

      if (!isMatch) return null;

      // TODO: see the `updatedAt` note in `users.service.ts` — once the entity
      // uses `@UpdateDateColumn`, this hand-stamped date can go.
      const updatedUser = await this.userRepository.save({
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
      // TODO: this flattens every error to a generic 500, swallowing the real
      // status and message. Forward `error.message` / `error.status` the way
      // `UsersService` already does.
      throw new HttpException('Something went wrong in the server', 500);
    }
  }
}
