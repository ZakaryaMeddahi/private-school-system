import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Equal, Repository } from 'typeorm';
import { UsersService } from '../users.service';
import { SocialLinksService } from 'src/modules/social-links/social-links.service';
import { User } from 'src/shared/entities/user.entity';
import { CreateUserParams, UpdateUserParams } from 'src/shared/types';
import { Role } from 'src/shared/enums';

describe('UsersService', () => {
  let service: UsersService;
  let socialLinksService: SocialLinksService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn(),
            create: jest.fn(),
            save: jest.fn(),
          },
        },
        {
          provide: SocialLinksService,
          useValue: {
            create: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    socialLinksService = module.get<SocialLinksService>(SocialLinksService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should successfully return a user by id', async () => {
      const user: User = {
        id: 1,
        firstName: 'Zakarya',
        lastName: 'Meddahi',
        email: 'zakarya@gmail.com',
        password: 'password',
        address: null,
        isActive: true,
        lastLogging: null,
        role: Role.STUDENT,
        createdAt: new Date(),
        updatedAt: new Date(),
        messages: [],
      };

      jest.spyOn(repository, 'findOne').mockResolvedValue(user);

      await expect(service.findOne(1)).resolves.toEqual(user);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw when user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.findOne(1)).rejects.toThrow('User not found');
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('create', () => {
    const createUserData: CreateUserParams = {
      firstName: 'Sid Ahmed',
      lastName: 'Abdelali',
      email: 'sidahmed@gmail.com',
      password: 'password',
      address: 'Chlef, Algeria',
      role: Role.STUDENT,
    };

    const createdUser: User = {
      ...createUserData,
      id: 2,
      address: 'Chlef, Algeria',
      isActive: true,
      lastLogging: null,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };

    it('should successfully add a new user', async () => {
      const { password, ...expectedUser } = createdUser;

      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      jest.spyOn(repository, 'create').mockReturnValue(createdUser);
      jest.spyOn(repository, 'save').mockResolvedValue(createdUser);

      await expect(service.create(createUserData)).resolves.toEqual(
        expectedUser,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'sidahmed@gmail.com' },
      });
      expect(repository.create).toHaveBeenCalledWith(createUserData);
      expect(repository.save).toHaveBeenCalledWith(createdUser);
      expect(socialLinksService.create).toHaveBeenCalledWith(
        createdUser.id,
        {},
      );
    });

    it('should throw when email already exists', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(createdUser);
      await expect(service.create(createUserData)).rejects.toThrow(
        'Email already exists',
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { email: 'sidahmed@gmail.com' },
      });
    });
  });

  describe('update', () => {
    const userToUpdate: User = {
      id: 1,
      firstName: 'Zakarya',
      lastName: 'Meddahi',
      email: 'zakarya@gmail.com',
      password: 'password',
      address: null,
      isActive: true,
      lastLogging: null,
      role: Role.STUDENT,
      createdAt: new Date(),
      updatedAt: new Date(),
      messages: [],
    };

    const updateUserData: UpdateUserParams = {
      id: 1,
      firstName: 'Zakarya Updated',
      lastName: 'Meddahi Updated',
      email: 'zakarya.updated@gmail.com',
      address: 'Algiers, Algeria',
      role: Role.TEACHER,
    };

    const updatedUser: User = {
      ...userToUpdate,
      ...updateUserData,
      updatedAt: new Date(),
    };

    it('should successfully update a user', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(userToUpdate);
      jest.spyOn(repository, 'save').mockResolvedValue(updatedUser);

      await expect(service.update(1, updateUserData)).resolves.toEqual(
        updatedUser,
      );
      expect(repository.findOne).toHaveBeenCalledWith({
        where: { id: Equal(1) },
      });
      expect(repository.save).toHaveBeenCalledWith({
        ...userToUpdate,
        ...updateUserData,
        updatedAt: expect.any(Date),
      });
    });

    it('should throw when user does not exist', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);
      await expect(service.update(1, updateUserData)).rejects.toThrow(
        'User not found',
      );
    });
  });
});
