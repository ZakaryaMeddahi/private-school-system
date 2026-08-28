import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { hashPassword } from 'src/helpers/bcrypt';
import generatePassword from 'src/helpers/generate-password';
import { FilesService } from 'src/modules/files/files.service';
import { MailService } from 'src/modules/mail/mail.service';
import { SocialLinksService } from 'src/modules/social-links/social-links.service';
import { UsersService } from 'src/modules/users/users.service';
import { Teacher } from 'src/shared/entities/teacher.entity';
import { Role } from 'src/shared/enums';
import {
  createMockQueryBuilder,
  createMockRepository,
  makeFile,
  makeSocialLinks,
  makeTeacher,
  makeUser,
  MockQueryBuilder,
  MockRepository,
} from 'src/shared/testing';
import { TeachersService } from '../teachers.service';

jest.mock('src/helpers/bcrypt');
jest.mock('src/helpers/generate-password');

const mockedHashPassword = jest.mocked(hashPassword);
// `generatePassword` uses Math.random(), so it has to be stubbed for the
// generated credential to be assertable at all.
const mockedGeneratePassword = jest.mocked(generatePassword);

describe('TeachersService', () => {
  let service: TeachersService;
  let repository: MockRepository<Teacher>;
  let usersService: { create: jest.Mock; update: jest.Mock };
  let mailService: { sendUserRegistration: jest.Mock };
  let socialLinksService: { findByUserId: jest.Mock };
  let filesService: { create: jest.Mock };

  const rawTeacherRow = (overrides: Record<string, unknown> = {}) => ({
    id: 1,
    biography: null,
    profilePicture: null,
    firstName: 'Sid Ahmed',
    lastName: 'Abdelali',
    email: 'sidahmed@gmail.com',
    password: 'hashed_password',
    userId: 42,
    ...overrides,
  });

  const arrangeQueryBuilder = (result: unknown): MockQueryBuilder => {
    const queryBuilder = createMockQueryBuilder(result);
    repository.createQueryBuilder.mockReturnValue(queryBuilder as never);
    return queryBuilder;
  };

  beforeEach(async () => {
    repository = createMockRepository<Teacher>();
    usersService = { create: jest.fn(), update: jest.fn() };
    mailService = { sendUserRegistration: jest.fn() };
    socialLinksService = { findByUserId: jest.fn() };
    filesService = { create: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeachersService,
        { provide: getRepositoryToken(Teacher), useValue: repository },
        { provide: UsersService, useValue: usersService },
        { provide: MailService, useValue: mailService },
        { provide: SocialLinksService, useValue: socialLinksService },
        { provide: FilesService, useValue: filesService },
      ],
    }).compile();

    service = module.get(TeachersService);
  });

  describe('findAll', () => {
    it('should never return the password or the raw user id', async () => {
      arrangeQueryBuilder([rawTeacherRow(), rawTeacherRow({ id: 2 })]);

      const teachers = await service.findAll(null);

      expect(teachers).toHaveLength(2);
      for (const teacher of teachers) {
        expect(teacher).not.toHaveProperty('password');
        expect(teacher).not.toHaveProperty('userId');
      }
    });

    it('should filter by first or last name when a search term is given', async () => {
      const queryBuilder = arrangeQueryBuilder([]);

      await service.findAll('sid');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        'user.firstName ILIKE :search',
        { search: '%sid%' },
      );
      expect(queryBuilder.orWhere).toHaveBeenCalledWith(
        'user.lastName ILIKE :search',
        { search: '%sid%' },
      );
    });

    it('should not filter when no search term is given', async () => {
      const queryBuilder = arrangeQueryBuilder([]);

      await service.findAll(null);

      expect(queryBuilder.where).not.toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return the teacher without the password', async () => {
      arrangeQueryBuilder(rawTeacherRow());

      const teacher = await service.findOne(42);

      expect(teacher).not.toHaveProperty('password');
      expect(teacher).not.toHaveProperty('userId');
      expect(teacher).toMatchObject({ firstName: 'Sid Ahmed' });
    });

    it('should throw when the teacher does not exist', async () => {
      arrangeQueryBuilder(null);

      await expect(service.findOne(999)).rejects.toThrow('Teacher not found');
    });
  });

  describe('findByUserId', () => {
    it('should return the teacher together with their social links', async () => {
      const socialLinks = makeSocialLinks();
      arrangeQueryBuilder(rawTeacherRow());
      socialLinksService.findByUserId.mockResolvedValue(socialLinks);

      const teacher = await service.findByUserId(42);

      expect(teacher).toMatchObject({ socialLinks });
      expect(teacher).not.toHaveProperty('password');
    });

    it('should throw when the teacher does not exist', async () => {
      arrangeQueryBuilder(null);

      await expect(service.findByUserId(999)).rejects.toThrow(
        'Teacher not found',
      );
      expect(socialLinksService.findByUserId).not.toHaveBeenCalled();
    });
  });

  describe('findEntityByUserId', () => {
    it('should return the teacher entity', async () => {
      const teacher = makeTeacher();
      repository.findOne.mockResolvedValue(teacher);

      await expect(service.findEntityByUserId(42)).resolves.toEqual(teacher);
    });

    it('should throw when the user has no teacher profile', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findEntityByUserId(999)).rejects.toThrow(
        'Teacher not found',
      );
    });
  });

  describe('create', () => {
    const teacherData = {
      firstName: 'Sid Ahmed',
      lastName: 'Abdelali',
      email: 'sidahmed@gmail.com',
    };

    const arrangeSuccessfulCreate = () => {
      mockedGeneratePassword.mockReturnValue('generated!');
      mockedHashPassword.mockResolvedValue('hashed_password');
      usersService.create.mockResolvedValue(makeUser({ id: 42 }));
      repository.create.mockReturnValue(makeTeacher());
      repository.save.mockResolvedValue(makeTeacher());
      arrangeQueryBuilder(rawTeacherRow());
    };

    it('should return the newly created teacher row', async () => {
      arrangeSuccessfulCreate();

      await expect(service.create(teacherData)).resolves.toMatchObject({
        firstName: 'Sid Ahmed',
      });
    });

    // The account is created on the teacher's behalf, so the generated
    // credential must be hashed before it reaches the users service.
    it('should hash the generated password before creating the account', async () => {
      arrangeSuccessfulCreate();

      await service.create(teacherData);

      expect(mockedHashPassword).toHaveBeenCalledWith('generated!');
      expect(usersService.create).toHaveBeenCalledWith(
        expect.objectContaining({
          password: 'hashed_password',
          role: Role.TEACHER,
        }),
      );
    });

    it('should email the teacher their credentials', async () => {
      arrangeSuccessfulCreate();

      await service.create(teacherData);

      expect(mailService.sendUserRegistration).toHaveBeenCalledWith(
        expect.objectContaining({ password: 'generated!' }),
      );
    });

    // TODO: SECURITY — `create()` writes the plaintext generated password to
    // the console twice (`console.log('password: ' + password)` and the
    // `{ ...user, password }` dump). Credentials must not reach the logs.
    it.todo('should not log the generated password');
  });

  describe('update', () => {
    it('should return the saved teacher', async () => {
      const teacher = makeTeacher();
      repository.findOne.mockResolvedValue(teacher);
      usersService.update.mockResolvedValue(makeUser());
      repository.save.mockResolvedValue(teacher);

      await expect(
        service.update(teacher.id, { firstName: 'Updated' }),
      ).resolves.toEqual(teacher);
    });

    it('should route the user fields through the users service', async () => {
      const teacher = makeTeacher({ user: makeUser({ id: 42 }) });
      repository.findOne.mockResolvedValue(teacher);
      usersService.update.mockResolvedValue(makeUser());
      repository.save.mockResolvedValue(teacher);

      await service.update(teacher.id, {
        firstName: 'Updated',
        biography: 'ignored here',
      });

      expect(usersService.update).toHaveBeenCalledWith(42, {
        firstName: 'Updated',
      });
    });

    it('should throw when the teacher does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(999, { firstName: 'Updated' }),
      ).rejects.toThrow('Teacher not found');
      expect(usersService.update).not.toHaveBeenCalled();
    });

    // TODO: `biography` is destructured out of the payload and then dropped —
    // `update()` never writes it, unlike `updateAccount()`. Either persist it
    // or remove it from `UpdateTeacherParams` for this path.
    it.todo('should persist the biography it was given');
  });

  describe('updateAccount', () => {
    const arrangeAccountUpdate = (teacher = makeTeacher()) => {
      repository.findOne.mockResolvedValue(teacher);
      usersService.update.mockResolvedValue(makeUser());
      arrangeQueryBuilder(rawTeacherRow());
      socialLinksService.findByUserId.mockResolvedValue(makeSocialLinks());
    };

    it('should return the refreshed teacher', async () => {
      arrangeAccountUpdate();

      const result = await service.updateAccount(
        42,
        { biography: 'Updated' },
        null,
      );

      expect(result).toMatchObject({ firstName: 'Sid Ahmed' });
    });

    // Unlike StudentsService, this guards the existing value — worth pinning so
    // the behaviour is not lost if the two are ever unified.
    it('should keep the existing biography when none is supplied', async () => {
      arrangeAccountUpdate(makeTeacher({ biography: 'Original' }));

      await service.updateAccount(42, { firstName: 'Sid' }, null);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ biography: 'Original' }),
      );
    });

    it('should store the uploaded picture when one is supplied', async () => {
      arrangeAccountUpdate();
      filesService.create.mockResolvedValue(
        makeFile({ url: 'https://cdn.example.com/avatar.png' }),
      );

      await service.updateAccount(42, { biography: 'Updated' }, {
        originalname: 'avatar.png',
      } as Express.Multer.File);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          profilePicture: 'https://cdn.example.com/avatar.png',
        }),
      );
    });

    it('should not upload anything when no picture is supplied', async () => {
      arrangeAccountUpdate();

      await service.updateAccount(42, { biography: 'Updated' }, null);

      expect(filesService.create).not.toHaveBeenCalled();
    });

    it('should throw when the teacher does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateAccount(999, { biography: 'Updated' }, null),
      ).rejects.toThrow('Teacher not found');
      expect(usersService.update).not.toHaveBeenCalled();
    });
  });

  describe('updateProfilePicture', () => {
    it('should store the uploaded picture and return the refreshed teacher', async () => {
      const socialLinks = makeSocialLinks();
      repository.findOne.mockResolvedValue(makeTeacher());
      filesService.create.mockResolvedValue(
        makeFile({ url: 'https://cdn.example.com/avatar.png' }),
      );
      arrangeQueryBuilder(rawTeacherRow());
      socialLinksService.findByUserId.mockResolvedValue(socialLinks);

      const result = await service.updateProfilePicture(42, {
        originalname: 'avatar.png',
      } as Express.Multer.File);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          profilePicture: 'https://cdn.example.com/avatar.png',
        }),
      );
      expect(result).toMatchObject({ socialLinks });
    });

    it('should throw when the teacher does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateProfilePicture(999, {
          originalname: 'avatar.png',
        } as Express.Multer.File),
      ).rejects.toThrow('Teacher not found');
      expect(filesService.create).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete the teacher', async () => {
      const teacher = makeTeacher();
      repository.findOne.mockResolvedValue(teacher);
      repository.remove.mockResolvedValue(teacher);

      await service.remove(42);

      expect(repository.remove).toHaveBeenCalledWith(teacher);
    });

    it('should throw when the teacher does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow('Teacher not found');
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
