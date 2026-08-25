import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChatsService } from 'src/modules/chats/chats.service';
import { RoomsService } from 'src/modules/rooms/rooms.service';
import { TeachersService } from 'src/modules/teachers/teachers.service';
import { TopicsService } from 'src/modules/topics/topics.service';
import { Course } from 'src/shared/entities/course.entity';
import { EnrollmentStatus, Role, RoomStatus } from 'src/shared/enums';
import {
  createMockRepository,
  makeChat,
  makeCourse,
  makeFile,
  makeTeacher,
  makeTopic,
  makeUser,
  MockRepository,
  useFrozenClock,
} from 'src/shared/testing';
import { CoursesService } from '../courses.service';

describe('CoursesService', () => {
  let service: CoursesService;
  let repository: MockRepository<Course>;
  let topicsService: { createMany: jest.Mock; updateMany: jest.Mock };
  let chatsService: { createByCourseId: jest.Mock };
  let roomsService: { create: jest.Mock };
  let teachersService: { findEntityByUserId: jest.Mock };

  // `update()` stamps `updatedAt: new Date()` itself.
  useFrozenClock();

  beforeEach(async () => {
    repository = createMockRepository<Course>();
    topicsService = { createMany: jest.fn(), updateMany: jest.fn() };
    chatsService = { createByCourseId: jest.fn() };
    roomsService = { create: jest.fn() };
    teachersService = { findEntityByUserId: jest.fn() };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoursesService,
        { provide: getRepositoryToken(Course), useValue: repository },
        { provide: TopicsService, useValue: topicsService },
        { provide: ChatsService, useValue: chatsService },
        { provide: RoomsService, useValue: roomsService },
        { provide: TeachersService, useValue: teachersService },
      ],
    }).compile();

    service = module.get(CoursesService);
  });

  describe('findCoursesChats', () => {
    // Each role sees a different slice of the catalogue, so the branch a caller
    // lands in is the behaviour under test.
    it('should return the courses a teacher owns', async () => {
      repository.find.mockResolvedValue([makeCourse()]);

      await service.findCoursesChats(42, Role.TEACHER);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { teacher: { user: { id: expect.anything() } } },
        }),
      );
    });

    it('should return only the approved enrollments for a student', async () => {
      repository.find.mockResolvedValue([makeCourse()]);

      await service.findCoursesChats(42, Role.STUDENT);

      expect(repository.find).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            enrollments: expect.objectContaining({
              enrollmentStatus: EnrollmentStatus.APPROVED,
            }),
          }),
        }),
      );
    });

    it('should return every course for an admin', async () => {
      repository.find.mockResolvedValue([makeCourse()]);

      await service.findCoursesChats(42, Role.ADMIN);

      const [options] = repository.find.mock.calls[0];
      expect(options).not.toHaveProperty('where');
    });

    it('should strip the teacher password from every course', async () => {
      const course = makeCourse({
        teacher: makeTeacher({ user: makeUser({ password: 'hashed' }) }),
      });
      repository.find.mockResolvedValue([course]);

      const courses = await service.findCoursesChats(42, Role.ADMIN);

      expect(courses[0].teacher.user).not.toHaveProperty('password');
    });

    // TODO: BUG — the password-stripping map does
    // `delete course.teacher.user.password` with no guard. `Course.teacher` is
    // a nullable ManyToOne, so a course whose teacher was removed throws a
    // TypeError that the catch turns into a misleading "Cannot get chats" 500.
    it.todo('should not throw for a course without a teacher');
  });

  describe('findAll', () => {
    it('should return the courses', async () => {
      const courses = [makeCourse()];
      repository.find.mockResolvedValue(courses);

      await expect(service.findAll(null)).resolves.toEqual(courses);
    });

    // The search spans title, description and topic title — a caller looking
    // for "type" should match a course that only mentions it in a topic.
    it('should search across the title, description and topic titles', async () => {
      repository.find.mockResolvedValue([]);

      await service.findAll('type');

      const [options] = repository.find.mock.calls[0];
      expect(options.where).toHaveLength(3);
      expect(options.where[2]).toHaveProperty('topics');
    });

    it('should not filter when no search term is given', async () => {
      repository.find.mockResolvedValue([]);

      await service.findAll(null);

      const [options] = repository.find.mock.calls[0];
      expect(options.where).toEqual({});
    });
  });

  describe('findOne', () => {
    it('should return the course when it exists', async () => {
      const course = makeCourse();
      repository.findOne.mockResolvedValue(course);

      await expect(service.findOne(course.id)).resolves.toEqual(course);
    });

    // TODO: returns `null` rather than throwing `NotFoundException`, unlike
    // most other services. Tighten to `.rejects.toThrow` once it does.
    it('should return null when the course does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(999)).resolves.toBeNull();
    });
  });

  describe('create', () => {
    const courseData = () => ({
      title: 'Introduction to TypeScript',
      description: 'Learn TypeScript.',
      price: 100,
      language: 'English',
      difficulty: makeCourse().difficulty,
      duration: 6,
      durationUnit: makeCourse().durationUnit,
      topics: [makeTopic()],
    });

    const arrangeSuccessfulCreate = () => {
      teachersService.findEntityByUserId.mockResolvedValue(makeTeacher());
      topicsService.createMany.mockResolvedValue([makeTopic()]);
      repository.create.mockReturnValue(makeCourse());
      repository.save.mockResolvedValue(makeCourse({ id: 7 }));
      chatsService.createByCourseId.mockResolvedValue(makeChat());
    };

    it('should return the saved course', async () => {
      arrangeSuccessfulCreate();

      await expect(
        service.create(42, courseData(), makeFile()),
      ).resolves.toMatchObject({ id: 7 });
    });

    it('should attach the course to the teacher behind the user id', async () => {
      arrangeSuccessfulCreate();
      teachersService.findEntityByUserId.mockResolvedValue(
        makeTeacher({ id: 9 }),
      );

      await service.create(42, courseData(), makeFile());

      expect(teachersService.findEntityByUserId).toHaveBeenCalledWith(42);
      expect(repository.create).toHaveBeenCalledWith(
        expect.objectContaining({ teacher: { id: 9 } }),
      );
    });

    // A new course is not usable without its chat and its default room, so
    // both side effects belong to the contract.
    it('should open a chat and a general room for the new course', async () => {
      arrangeSuccessfulCreate();

      await service.create(42, courseData(), makeFile());

      expect(chatsService.createByCourseId).toHaveBeenCalledWith(7, {
        name: 'Introduction to TypeScript',
      });
      expect(roomsService.create).toHaveBeenCalledWith(
        { name: 'General', slug: 'general', status: RoomStatus.OPEN },
        7,
      );
    });

    it('should persist the supplied topics first', async () => {
      arrangeSuccessfulCreate();
      const topics = [makeTopic({ title: 'Generics' })];

      await service.create(42, { ...courseData(), topics }, makeFile());

      expect(topicsService.createMany).toHaveBeenCalledWith(topics);
    });

    it('should not create any topic when none is supplied', async () => {
      arrangeSuccessfulCreate();

      await service.create(42, { ...courseData(), topics: null }, makeFile());

      expect(topicsService.createMany).not.toHaveBeenCalled();
    });

    // TODO: `create()` saves twice — once for the course, then again with
    // `{ ...newCourse, chat }` to attach the chat. The second save spreads the
    // pre-save entity rather than the saved one, and the returned `course`
    // predates it, so the caller never sees the chat it just created.
    it.todo('should return the course with its chat attached');
  });

  describe('update', () => {
    it('should return the updated course', async () => {
      const existing = makeCourse();
      const updated = makeCourse({ title: 'Updated' });
      repository.findOne.mockResolvedValue(existing);
      repository.save.mockResolvedValue(updated);

      await expect(
        service.update(42, Role.ADMIN, existing.id, { title: 'Updated' }),
      ).resolves.toEqual(updated);
    });

    // A teacher may only edit their own courses; an admin may edit any. That
    // scoping is the security boundary of this method.
    it('should scope the lookup to the teachers own courses', async () => {
      repository.findOne.mockResolvedValue(makeCourse());
      repository.save.mockResolvedValue(makeCourse());

      await service.update(42, Role.TEACHER, 1, { title: 'Updated' });

      const [options] = repository.findOne.mock.calls[0];
      expect(options.where).toHaveProperty('teacher');
    });

    it('should not scope the lookup for an admin', async () => {
      repository.findOne.mockResolvedValue(makeCourse());
      repository.save.mockResolvedValue(makeCourse());

      await service.update(42, Role.ADMIN, 1, { title: 'Updated' });

      const [options] = repository.findOne.mock.calls[0];
      expect(options.where).not.toHaveProperty('teacher');
    });

    it('should replace the topics when new ones are supplied', async () => {
      const topics = [makeTopic({ title: 'Updated topic' })];
      repository.findOne.mockResolvedValue(makeCourse());
      topicsService.updateMany.mockResolvedValue(topics);
      repository.save.mockResolvedValue(makeCourse());

      await service.update(42, Role.ADMIN, 1, { topics });

      expect(topicsService.updateMany).toHaveBeenCalledWith(topics);
      expect(repository.save).toHaveBeenCalledWith(
        expect.objectContaining({ topics }),
      );
    });

    it('should leave the topics alone when none are supplied', async () => {
      repository.findOne.mockResolvedValue(makeCourse());
      repository.save.mockResolvedValue(makeCourse());

      await service.update(42, Role.ADMIN, 1, { title: 'Updated' });

      expect(topicsService.updateMany).not.toHaveBeenCalled();
    });

    // TODO: returns `null` instead of throwing — see the note on `findOne`.
    it('should return null when the course does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(
        service.update(42, Role.ADMIN, 999, { title: 'Updated' }),
      ).resolves.toBeNull();
      expect(repository.save).not.toHaveBeenCalled();
    });
  });

  describe('remove', () => {
    it('should delete the course', async () => {
      const course = makeCourse();
      repository.findOne.mockResolvedValue(course);
      repository.remove.mockResolvedValue(course);

      await service.remove(42, Role.ADMIN, course.id);

      expect(repository.remove).toHaveBeenCalledWith(course);
    });

    it('should scope the lookup to the teachers own courses', async () => {
      repository.findOne.mockResolvedValue(makeCourse());
      repository.remove.mockResolvedValue(makeCourse());

      await service.remove(42, Role.TEACHER, 1);

      const [options] = repository.findOne.mock.calls[0];
      expect(options.where).toHaveProperty('teacher');
    });

    // TODO: returns `null` instead of throwing — see the note on `findOne`.
    it('should return null when the course does not exist', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.remove(42, Role.ADMIN, 999)).resolves.toBeNull();
      expect(repository.remove).not.toHaveBeenCalled();
    });
  });
});
