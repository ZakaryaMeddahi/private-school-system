import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { CreateCourseParams, UpdateCourseParams } from 'src/shared/types';
import { Repository } from 'typeorm';
import { TopicsService } from './topics/topics.service';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
    private readonly topicsService: TopicsService,
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
        where: { id },
        relations: ['topics'],
      });

      if (!course) return null;

      return course;
    } catch (error) {
      throw new HttpException('Cannot get course', 500);
    }
  }

  async create(courseData: CreateCourseParams) {
    try {
      const { topics } = courseData;

      if (topics) {
        const newTopics = await this.topicsService.createMany(topics);
        courseData.topics = newTopics;
      }

      const newCourse = this.coursesRepository.create(courseData);
      return this.coursesRepository.save(newCourse);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create course', 500);
    }
  }

  async update(id: number, courseData: UpdateCourseParams) {
    try {
      const { topics, ...updatedCourse } = courseData;

      let course = await this.coursesRepository.findOne({ where: { id } });

      if (!course) return null;

      course = { ...course, ...updatedCourse };

      if (topics) {
        const updatedTopics = await this.topicsService.updateMany(topics);
        course.topics = updatedTopics;
      }

      return this.coursesRepository.save(course);
    } catch (error) {
      throw new HttpException('Cannot update course', 500);
    }
  }

  async remove(id: number) {
    try {
      const course = await this.coursesRepository.findBy({ id });

      if (!course) return null;

      return await this.coursesRepository.remove(course);
    } catch (error) {
      throw new HttpException('Cannot remove course', 500);
    }
  }
}
