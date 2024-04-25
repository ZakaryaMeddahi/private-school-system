import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { CreateCourseParams, UpdateCourseParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { TopicsService } from '../topics/topics.service';
import { ChatsService } from '../chats/chats.service';
import { RoomsService } from '../rooms/rooms.service';
import { Role, RoomStatus } from 'src/shared/enums';
import { TeachersService } from '../teachers/teachers.service';
import { File } from 'src/shared/entities/file.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly topicsService: TopicsService,
    private readonly chatsService: ChatsService,
    private readonly roomsService: RoomsService,
    private readonly teachersService: TeachersService,
  ) {}

  async findAll() {
    try {
      const courses = await this.coursesRepository.find({
        relations: ['topics'],
      });
      return courses;
    } catch (error) {
      throw new HttpException('Cannot get courses', 500);
    }
  }

  async findOne(id: number) {
    try {
      const course = await this.coursesRepository.findOne({
        where: { id: Equal(id) },
        relations: ['topics', 'file'],
      });

      if (!course) return null;

      return course;
    } catch (error) {
      throw new HttpException('Cannot get course', 500);
    }
  }

  async create(userId: number, courseData: CreateCourseParams, file: File) {
    try {
      const { topics } = courseData;

      const teacher = await this.teachersService.findEntityByUserId(userId);

      if (topics) {
        const newTopics = await this.topicsService.createMany(topics);
        courseData.topics = newTopics;
      }

      const newCourse = this.coursesRepository.create({
        ...courseData,
        teacher: { id: teacher.id },
        file,
      });

      const course = await this.coursesRepository.save(newCourse);

      await this.chatsService.createByCourseId(course.id, {
        name: 'Global Chat',
      });

      await this.roomsService.create(
        { name: 'General', slug: 'general', status: RoomStatus.OPEN },
        course.id,
      );

      return course;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot create course',
        error.status || 500,
      );
    }
  }

  async update(
    userId: number,
    role: Role,
    id: number,
    courseData: UpdateCourseParams,
  ) {
    try {
      const { topics, ...updatedCourse } = courseData;

      const options = { where: { id: Equal(id) } };

      if (role === Role.TEACHER)
        options['where']['teacher'] = { user: { id: Equal(userId) } };

      let course = await this.coursesRepository.findOne(options);

      if (!course) return null;

      course = { ...course, ...updatedCourse, updatedAt: new Date() };

      if (topics) {
        const updatedTopics = await this.topicsService.updateMany(topics);
        course.topics = updatedTopics;
      }

      return this.coursesRepository.save(course);
    } catch (error) {
      throw new HttpException(
        error.message || 'Cannot update course',
        error.status || 500,
      );
    }
  }

  async remove(userId: number, role: Role, id: number) {
    try {
      const options = { where: { id: Equal(id) } };

      if (role === Role.TEACHER)
        options['where']['teacher'] = { user: { id: Equal(userId) } };

      const course = await this.coursesRepository.findOne(options);

      if (!course) return null;

      return await this.coursesRepository.remove(course);
    } catch (error) {
      throw new HttpException('Cannot remove course', 500);
    }
  }
}
