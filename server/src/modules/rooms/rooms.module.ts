import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { CoursesService } from '../courses/courses.service';
import { Course } from 'src/shared/entities/course.entity';
import { Topic } from 'src/shared/entities/topic.entity';
import { TopicsService } from '../courses/topics/topics.service';
import { RoomsGateway } from './rooms.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Course, Topic])],
  controllers: [RoomsController],
  providers: [RoomsService, CoursesService, TopicsService, RoomsGateway],
})
export class RoomsModule {}
