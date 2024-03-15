import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { TopicsService } from './topics/topics.service';
import { Topic } from 'src/shared/entities/topic.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Topic])],
  controllers: [CoursesController],
  providers: [CoursesService, TopicsService],
})
export class CoursesModule {}
