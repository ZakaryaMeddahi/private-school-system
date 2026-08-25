import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { FilesService } from 'src/modules/files/files.service';
import { SocialLinksService } from 'src/modules/social-links/social-links.service';
import { UsersService } from 'src/modules/users/users.service';
import { Student } from 'src/shared/entities/student.entity';
import {
  createMockQueryBuilder,
  createMockRepository,
  makeFile,
  makeSocialLinks,
  makeStudent,
  makeUser,
  MockQueryBuilder,
  MockRepository,
} from 'src/shared/testing';
import { StudentsService } from '../students.service';

describe('StudentsService', () => {
  let service: StudentsService;
  let repository: MockRepository<Student>;
  let usersService: { update: jest.Mock };
  let socialLinksService: { findByUserId: jest.Mock };
  let filesService: { create: jest.Mock };

  // Raw rows come back with the joined user columns flattened onto the student,
  // including the ones the service is responsible for stripping.
  const rawStudentRow = (overrides: Record<string, unknown> = {}) => ({
    id: 1,
    biography: null,
    profilePicture: null,
    firstName: 'Zakarya',
    lastName: 'Meddahi',
    email: 'zakarya@gmail.com',
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
    repository = createMockRepository<Student>();
    usersService = { update: jest.fn() };
    socialLinksService = { findByUserId: jest.fn() };
    filesService = { create: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentsService,
        { provide: getRepositoryToken(Student), useValue: repository },
        { provide: UsersService, useValue: usersService },
        { provide: SocialLinksService, useValue: socialLinksService },
        { provide: FilesService, useValue: filesService },
      ],
    }).compile();

    service = module.get(StudentsService);
  });

  describe('findAll', () => {
    // Stripping the password out of every raw row is the whole reason this
    // method post-processes the query result. Both halves of that matter:
    // these two fields must go, and everything else must stay.
    it('should strip the password and raw user id but keep the rest', async () => {
      arrangeQueryBuilder([rawStudentRow(), rawStudentRow({ id: 2 })]);

      const students = await service.findAll(null);

      expect(students).toHaveLength(2);
      for (const student of students) {
        expect(student).not.toHaveProperty('password');
        expect(student).not.toHaveProperty('userId');
      }
      // Without this the test passes vacuously: a service returning [{}, {}]
      // satisfies every assertion above. This is what proves the rows survived
      // with their data rather than being over-stripped.
      expect(students[0]).toMatchObject({
        id: 1,
        firstName: 'Zakarya',
        email: 'zakarya@gmail.com',
      });
    });

    it('should filter by first or last name when a search term is given', async () => {
      const queryBuilder = arrangeQueryBuilder([]);

      await service.findAll('zak');

      expect(queryBuilder.where).toHaveBeenCalledWith(
        'user.firstName ILIKE :search',
        { search: '%zak%' },
      );
      expect(queryBuilder.orWhere).toHaveBeenCalledWith(
        'user.lastName ILIKE :search',
        { search: '%zak%' },
      );
    });

    it('should not filter when no search term is given', async () => {
      const queryBuilder = arrangeQueryBuilder([]);

      await service.findAll(null);

      expect(queryBuilder.where).not.toHaveBeenCalled();
      expect(queryBuilder.orWhere).not.toHaveBeenCalled();
    });

    it('should return an empty list when there are no students', async () => {
      arrangeQueryBuilder([]);

      await expect(service.findAll(null)).resolves.toEqual([]);
    });
  });

  describe('findOne', () => {
    it('should return the student without the password', async () => {
      arrangeQueryBuilder(rawStudentRow());

      const student = await service.findOne(42);

      expect(student).not.toHaveProperty('password');
      expect(student).not.toHaveProperty('userId');
      expect(student).toMatchObject({ firstName: 'Zakarya' });
    });

    it('should throw when the student does not exist', async () => {
      arrangeQueryBuilder(null);

      await expect(service.findOne(999)).rejects.toThrow('Student not found');
    });
  });

  describe('findByUserId', () => {
    it('should return the student together with their social links', async () => {
      const socialLinks = makeSocialLinks();
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(socialLinks);

      const student = await service.findByUserId(42);

      expect(student).toMatchObject({ socialLinks });
      expect(student).not.toHaveProperty('password');
    });

    it('should throw when the student does not exist', async () => {
      arrangeQueryBuilder(null);

      await expect(service.findByUserId(999)).rejects.toThrow(
        'Student not found',
      );
      expect(socialLinksService.findByUserId).not.toHaveBeenCalled();
    });

    // TODO: the predicate is built with `.orWhere()` as the only condition.
    // It happens to behave like `.where()` today, but any predicate added
    // later will be OR-ed instead of AND-ed, widening the match silently.
    it.todo('should use where rather than orWhere for its only predicate');
  });

  describe('findEntityByUserId', () => {
    it('should return the student entity', async () => {
      const student = makeStudent();
      repository.findOne.mockResolvedValue(student);

      await expect(service.findEntityByUserId(42)).resolves.toEqual(student);
    });

    it('should throw when the user has no student profile', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findEntityByUserId(999)).rejects.toThrow(
        'Student not found',
      );
    });
  });

  describe('create', () => {
    it('should return the saved student', async () => {
      const student = makeStudent();
      repository.create.mockReturnValue(student);
      repository.save.mockResolvedValue(student);

      await expect(service.create(42, {})).resolves.toEqual(student);
    });

    it('should attach the student to the given user', async () => {
      repository.create.mockReturnValue(makeStudent());
      repository.save.mockResolvedValue(makeStudent());

      await service.create(42, { biography: 'Hello' });

      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ user: { id: 42 }, biography: 'Hello' }),
      );
    });
  });

  describe('updateAccount', () => {
    it('should return the refreshed student', async () => {
      const refreshed = { id: 1, socialLinks: makeSocialLinks() };
      repository.findOne.mockResolvedValue(makeStudent());
      usersService.update.mockResolvedValue(makeUser());
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(refreshed.socialLinks);

      const result = await service.updateAccount(
        42,
        { biography: 'Updated', firstName: 'Zak' },
        null,
      );

      expect(result).toMatchObject({ socialLinks: refreshed.socialLinks });
    });

    // The user columns live on User, not Student, so the split matters.
    it('should send the user fields to the users service and keep the biography', async () => {
      repository.findOne.mockResolvedValue(makeStudent());
      usersService.update.mockResolvedValue(makeUser());
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(makeSocialLinks());

      await service.updateAccount(
        42,
        { biography: 'Updated', firstName: 'Zak' },
        null,
      );

      expect(usersService.update).toHaveBeenCalledWith(42, {
        firstName: 'Zak',
      });
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ biography: 'Updated' }),
      );
    });

    it('should store the uploaded picture when one is supplied', async () => {
      repository.findOne.mockResolvedValue(makeStudent());
      usersService.update.mockResolvedValue(makeUser());
      filesService.create.mockResolvedValue(
        makeFile({ url: 'https://cdn.example.com/avatar.png' }),
      );
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(makeSocialLinks());

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
      repository.findOne.mockResolvedValue(makeStudent());
      usersService.update.mockResolvedValue(makeUser());
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(makeSocialLinks());

      await service.updateAccount(42, { biography: 'Updated' }, null);

      expect(filesService.create).not.toHaveBeenCalled();
    });

    it('should throw when the student does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateAccount(999, { biography: 'Updated' }, null),
      ).rejects.toThrow('Student not found');
      expect(usersService.update).not.toHaveBeenCalled();
    });

    // TODO: `student.biography = biography` is unconditional, so updating only
    // a user field (say the email) wipes an existing biography. `TeachersService`
    // guards this with `biography || teacher.biography`; this should too.
    it.todo('should keep the existing biography when none is supplied');
  });

  describe('updateProfilePicture', () => {
    it('should store the uploaded picture and return the refreshed student', async () => {
      const socialLinks = makeSocialLinks();
      repository.findOne.mockResolvedValue(makeStudent());
      filesService.create.mockResolvedValue(
        makeFile({ url: 'https://cdn.example.com/avatar.png' }),
      );
      arrangeQueryBuilder(rawStudentRow());
      socialLinksService.findByUserId.mockResolvedValue(socialLinks);

      const result = await service.updateProfilePicture(42, {
        originalname: 'avatar.png',
      } as Express.Multer.File);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          profilePicture: 'https://cdn.example.com/avatar.png',
        }),
      );
      // The method ends with `return await this.findByUserId(userId)`, so what
      // belongs here is that the caller gets that refreshed read back — not a
      // re-test of what findByUserId itself assembles.
      expect(socialLinksService.findByUserId).toHaveBeenCalledWith(42);
      expect(result).toMatchObject({ firstName: 'Zakarya' });
    });

    it('should throw when the student does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.updateProfilePicture(999, {
          originalname: 'avatar.png',
        } as Express.Multer.File),
      ).rejects.toThrow('Student not found');
      expect(filesService.create).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete the student', async () => {
      const student = makeStudent();
      repository.findOne.mockResolvedValue(student);

      await service.remove(42);

      expect(repository.remove).toHaveBeenCalledWith(student);
    });

    it('should throw when the student does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(999)).rejects.toThrow('Student not found');
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
