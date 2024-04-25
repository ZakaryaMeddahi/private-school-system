import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/shared/entities/course.entity';
import { TopicsService } from '../topics/topics.service';
import { Topic } from 'src/shared/entities/topic.entity';
import { Chat } from 'src/shared/entities/chat.entity';
import { ChatsService } from '../chats/chats.service';
import { Room } from 'src/shared/entities/room.entity';
import { RoomsService } from '../rooms/rooms.service';
import { TeachersModule } from '../teachers/teachers.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { FilesService } from '../files/files.service';
import { File } from 'src/shared/entities/file.entity';
import { ObjectStorageService } from '../object-storage/object-storage.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Course, Topic, Chat, Room, File]),
    TeachersModule,
  ],
  controllers: [CoursesController],
  providers: [
    CoursesService,
    TopicsService,
    ChatsService,
    RoomsService,
    FilesService,
    ObjectStorageService
  ],
})
export class CoursesModule {}
