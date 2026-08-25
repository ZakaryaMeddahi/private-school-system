import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { comparePassword, hashPassword } from 'src/helpers/bcrypt';
import { MailService } from 'src/modules/mail/mail.service';
import { SocialLinksService } from 'src/modules/social-links/social-links.service';
import { StudentsService } from 'src/modules/students/students.service';
import { Admin } from 'src/shared/entities/admin.entity';
import { User } from 'src/shared/entities/user.entity';
import { Role } from 'src/shared/enums';
import {
  createMockQueryBuilder,
  createMockRepository,
  makeStudent,
  makeUser,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { LoginUserParams, RegisterUserParams } from 'src/shared/types';
import { AuthService } from '../auth.service';

jest.mock('src/helpers/bcrypt');

const mockedHashPassword = jest.mocked(hashPassword);
const mockedComparePassword = jest.mocked(comparePassword);

const ACCESS_TOKEN = 'access-token';

describe('AuthService', () => {
  let service: AuthService;
  let userRepository: MockRepository<User>;
  let adminRepository: MockRepository<Admin>;
  let jwtService: { sign: jest.Mock };
  let studentsService: { create: jest.Mock };
  let socialLinksService: { create: jest.Mock };
  let mailService: { sendUserRegistration: jest.Mock };

  // Both methods stamp `lastLogging: new Date()` themselves.
  // TODO: drop this once the entity uses `@CreateDateColumn`/`@UpdateDateColumn`.
  useFrozenClock();

  beforeEach(async () => {
    userRepository = createMockRepository<User>();
    adminRepository = createMockRepository<Admin>();
    jwtService = { sign: jest.fn().mockReturnValue(ACCESS_TOKEN) };
    studentsService = { create: jest.fn() };
    socialLinksService = { create: jest.fn() };
    mailService = { sendUserRegistration: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getRepositoryToken(User), useValue: userRepository },
        { provide: getRepositoryToken(Admin), useValue: adminRepository },
        { provide: JwtService, useValue: jwtService },
        { provide: StudentsService, useValue: studentsService },
        { provide: SocialLinksService, useValue: socialLinksService },
        { provide: MailService, useValue: mailService },
      ],
    }).compile();

    service = module.get(AuthService);
  });

  describe('registerUser', () => {
    const registerData: RegisterUserParams = {
      firstName: 'Zakarya',
      lastName: 'Meddahi',
      email: 'zakarya@gmail.com',
      password: 'plain-password',
      role: Role.STUDENT,
    };

    const arrangeSuccessfulRegistration = (user: User) => {
      userRepository.findOneBy.mockResolvedValue(null);
      userRepository.create.mockReturnValue(user);
      userRepository.save.mockResolvedValue(user);
      mockedHashPassword.mockResolvedValue('hashed_password');
      studentsService.create.mockResolvedValue(makeStudent());
    };

    it('should return the new user with an access token and no password', async () => {
      const newUser = makeUser({ email: registerData.email });
      arrangeSuccessfulRegistration(newUser);

      const result = await service.registerUser(registerData);

      const { password, ...userWithoutPassword } = newUser;
      expect(result).toEqual({
        ...userWithoutPassword,
        access_token: ACCESS_TOKEN,
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should hash the password before storing it', async () => {
      const newUser = makeUser({ email: registerData.email });
      arrangeSuccessfulRegistration(newUser);

      await service.registerUser(registerData);

      expect(mockedHashPassword).toHaveBeenCalledWith(registerData.password);
      expect(userRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ password: 'hashed_password' }),
      );
    });

    it('should sign the token with the user identity and role', async () => {
      const newUser = makeUser({ email: registerData.email });
      arrangeSuccessfulRegistration(newUser);

      await service.registerUser(registerData);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: newUser.id,
        email: newUser.email,
        role: newUser.role,
      });
    });

    it('should create the social links and the student profile', async () => {
      const newUser = makeUser({ email: registerData.email });
      arrangeSuccessfulRegistration(newUser);

      await service.registerUser(registerData);

      expect(socialLinksService.create).toHaveBeenCalledWith(newUser.id, {});
      expect(studentsService.create).toHaveBeenCalledWith(newUser.id, {});
    });

    it('should create an admin profile instead of a student one for an admin', async () => {
      const adminUser = makeUser({ role: Role.ADMIN });
      arrangeSuccessfulRegistration(adminUser);
      adminRepository.create.mockReturnValue({ user: { id: adminUser.id } });
      adminRepository.save.mockResolvedValue({ id: 1 });

      await service.registerUser({ ...registerData, role: Role.ADMIN });

      expect(adminRepository.save).toHaveBeenCalled();
      expect(studentsService.create).not.toHaveBeenCalled();
    });

    // TODO: `registerUser` returns `null` when the email is taken instead of
    // throwing (see the matching TODO in `auth.service.ts`). Once it throws a
    // `ConflictException`, turn this into a `.rejects.toThrow` assertion.
    it('should return null when the email is already registered', async () => {
      userRepository.findOneBy.mockResolvedValue(makeUser());

      await expect(service.registerUser(registerData)).resolves.toBeNull();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });

  describe('loginUser', () => {
    const loginData: LoginUserParams = {
      email: 'zakarya@gmail.com',
      password: 'plain-password',
    };

    const arrangeStoredUser = (user: User | null) => {
      userRepository.createQueryBuilder.mockReturnValue(
        createMockQueryBuilder(user) as never,
      );
    };

    it('should return the user with an access token and no password', async () => {
      const user = makeUser();
      arrangeStoredUser(user);
      userRepository.save.mockResolvedValue(user);
      mockedComparePassword.mockResolvedValue(true);

      const result = await service.loginUser(loginData);

      const { password, ...userWithoutPassword } = user;
      expect(result).toEqual({
        ...userWithoutPassword,
        access_token: ACCESS_TOKEN,
      });
      expect(result).not.toHaveProperty('password');
    });

    it('should compare the supplied password against the stored hash', async () => {
      const user = makeUser({ password: 'hashed_password' });
      arrangeStoredUser(user);
      userRepository.save.mockResolvedValue(user);
      mockedComparePassword.mockResolvedValue(true);

      await service.loginUser(loginData);

      expect(mockedComparePassword).toHaveBeenCalledWith(
        loginData.password,
        'hashed_password',
      );
    });

    it('should record the login timestamp', async () => {
      const user = makeUser();
      arrangeStoredUser(user);
      userRepository.save.mockResolvedValue(user);
      mockedComparePassword.mockResolvedValue(true);

      await service.loginUser(loginData);

      expect(userRepository.save).toHaveBeenCalledWith(
        expect.objectContaining({ lastLogging: expect.any(Date) }),
      );
    });

    it('should sign the token with the user identity and role', async () => {
      const user = makeUser();
      arrangeStoredUser(user);
      userRepository.save.mockResolvedValue(user);
      mockedComparePassword.mockResolvedValue(true);

      await service.loginUser(loginData);

      expect(jwtService.sign).toHaveBeenCalledWith({
        sub: user.id,
        email: user.email,
        role: user.role,
      });
    });

    // TODO: `loginUser` returns `null` for both an unknown email and a wrong
    // password (see the matching TODO in `auth.service.ts`). Once it throws an
    // `UnauthorizedException`, turn these into `.rejects.toThrow` assertions.
    it('should return null when no user matches the email', async () => {
      arrangeStoredUser(null);

      await expect(service.loginUser(loginData)).resolves.toBeNull();
      expect(mockedComparePassword).not.toHaveBeenCalled();
    });

    it('should return null when the password does not match', async () => {
      arrangeStoredUser(makeUser());
      mockedComparePassword.mockResolvedValue(false);

      await expect(service.loginUser(loginData)).resolves.toBeNull();
      expect(jwtService.sign).not.toHaveBeenCalled();
      expect(userRepository.save).not.toHaveBeenCalled();
    });
  });
});
