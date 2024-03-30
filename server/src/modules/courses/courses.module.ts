import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { TopicsService } from './topics/topics.service';
import { Topic } from 'src/shared/entities/topic.entity';
import { Chat } from 'src/shared/entities/chat.entity';
import { ChatsService } from '../chats/chats.service';
import { Room } from 'src/shared/entities/room.entity';
import { RoomsService } from '../rooms/rooms.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Topic, Chat, Room])],
  controllers: [CoursesController],
  providers: [CoursesService, TopicsService, ChatsService, RoomsService],
})
export class CoursesModule {}
