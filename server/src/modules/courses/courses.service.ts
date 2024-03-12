import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { CreateCourseParams, UpdateCourseParams } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly coursesRepository: Repository<Course>,
  ) {}

  async findAll() {
    try {
      const courses = await this.coursesRepository.find();
      return courses;
    } catch (error) {
      throw new HttpException('Cannot get courses', 500);
    }
  }

  async create(courseData: CreateCourseParams) {
    try {
      const { topics, ...course } = courseData;
      console.log(course);

      const newCourse = this.coursesRepository.create(course);
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

      console.log(course);

      if (!course) return null;

      course = { ...course, ...updatedCourse };

      console.log(course);

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
