import { Module } from '@nestjs/common';
import { EnrollmentsController } from './enrollments.controller';
import { EnrollmentsService } from './enrollments.service';
import { Enrollment } from 'src/shared/entities/enrollment.entity';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/shared/entities/course.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicsService } from '../courses/topics/topics.service';
import { Topic } from 'src/shared/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Enrollment, Course, Topic])],
  controllers: [EnrollmentsController],
  providers: [EnrollmentsService, CoursesService, TopicsService],
})
export class EnrollmentsModule {}
