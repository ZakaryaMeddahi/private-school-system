import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SocialLinksService } from 'src/modules/social-links/social-links.service';
import { User } from 'src/shared/entities/user.entity';
import { Role } from 'src/shared/enums';
import {
  createMockRepository,
  makeUser,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { CreateUserParams, UpdateUserParams } from 'src/shared/types';
import { UsersService } from '../users.service';

describe('UsersService', () => {
  let service: UsersService;
  let repository: MockRepository<User>;
  let socialLinksService: { create: jest.Mock };

  // `update()` stamps `updatedAt: new Date()` itself.
  // TODO: drop this once the entity uses `@UpdateDateColumn`.
  useFrozenClock();

  beforeEach(async () => {
    repository = createMockRepository<User>();
    socialLinksService = { create: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: repository },
        { provide: SocialLinksService, useValue: socialLinksService },
      ],
    }).compile();

    service = module.get(UsersService);
  });

  describe('findOne', () => {
    it('should return the user when it exists', async () => {
      const user = makeUser();
      repository.findOne.mockResolvedValue(user);

      await expect(service.findOne(user.id)).resolves.toEqual(user);
    });

    it('should throw when the user does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).rejects.toThrow('User not found');
    });

    // TODO: `findOne` returns the full entity including `password`, while
    // `create` strips it. Once the service is consistent, assert here that the
    // password never leaves the service.
  });

  describe('create', () => {
    const createUserData: CreateUserParams = {
      firstName: 'Zakarya',
      lastName: 'Meddahi',
      email: 'zakarya@gmail.com',
      password: 'password',
      address: 'Chlef, Algeria',
      role: Role.STUDENT,
    };

    it('should return the created user without its password', async () => {
      const createdUser = makeUser({ id: 1, email: createUserData.email });
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(createdUser);
      repository.save.mockResolvedValue(createdUser);

      const result = await service.create(createUserData);

      const { password, ...userWithoutPassword } = createdUser;
      expect(result).toEqual(userWithoutPassword);
      expect(result).not.toHaveProperty('password');
    });

    it('should create the social links for the new user', async () => {
      const createdUser = makeUser({ id: 2, email: createUserData.email });
      repository.findOne.mockResolvedValue(null);
      repository.create.mockReturnValue(createdUser);
      repository.save.mockResolvedValue(createdUser);

      await service.create(createUserData);

      expect(socialLinksService.create).toHaveBeenCalledWith(
        createdUser.id,
        {},
      );
    });

    it('should throw when the email is already taken', async () => {
      repository.findOne.mockResolvedValue(makeUser());

      await expect(service.create(createUserData)).rejects.toThrow(
        'Email already exists',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('update', () => {
    const updateUserData: UpdateUserParams = {
      firstName: 'Zakarya Updated',
      lastName: 'Meddahi Updated',
      email: 'zakarya.updated@gmail.com',
      address: 'Algiers, Algeria',
      role: Role.TEACHER,
    };

    it('should return the updated user', async () => {
      const existingUser = makeUser();
      const updatedUser = makeUser({ ...updateUserData });
      repository.findOne.mockResolvedValue(existingUser);
      repository.save.mockResolvedValue(updatedUser);

      await expect(
        service.update(existingUser.id, updateUserData),
      ).resolves.toEqual(updatedUser);
    });

    it('should apply the changes on top of the existing user', async () => {
      const existingUser = makeUser();
      repository.findOne.mockResolvedValue(existingUser);
      repository.save.mockResolvedValue(makeUser({ ...updateUserData }));

      await service.update(existingUser.id, updateUserData);

      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({
          id: existingUser.id,
          ...updateUserData,
        }),
      );
    });

    it('should throw when the user does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.update(999, updateUserData)).rejects.toThrow(
        'User not found',
      );
      expect(repository.save).not.toHaveBeenCalled();
    });

    // TODO: the service does not check whether the new email is already taken
    // by another user (see the TODO in `users.service.ts`). Add a test for
    // that once it throws.
    it.todo('should throw when the new email belongs to another user');
  });
});
