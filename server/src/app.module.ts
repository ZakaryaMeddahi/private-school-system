import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from 'typeorm';
import { User } from './shared/entities/user.entity';
import { CoursesModule } from './modules/courses/courses.module';
import { Course } from './shared/entities/course.entity';
import { RoomsModule } from './modules/rooms/rooms.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatsModule } from './modules/chats/chats.module';
import { Topic } from './shared/entities/topic.entity';
import { Chat } from './shared/entities/chat.entity';
import { Room } from './shared/entities/room.entity';
import { Message } from './shared/entities/message.entity';
import { Session } from './shared/entities/session.entity';
import { Enrollment } from './shared/entities/enrollment.entity';
import { Teacher } from './shared/entities/teacher.entity';
import { Student } from './shared/entities/student.entity';
import { StudentSession } from './shared/entities/studentSession.entity';
import { SocialLinks } from './shared/entities/socialLinks.entity';
import { TeachersModule } from './modules/teachers/teachers.module';
import { StudentsModule } from './modules/students/students.module';
import { MailModule } from './modules/mail/mail.module';
import { FilesModule } from './modules/files/files.module';
import { File } from './shared/entities/file.entity';
import { SocialLinksModule } from './modules/social-links/social-links.module';
import { StudentSessionsModule } from './modules/student-sessions/student-sessions.module';
import { TopicsModule } from './modules/topics/topics.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ObjectStorageModule } from './modules/object-storage/object-storage.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          User,
          Admin,
          Teacher,
          Student,
          Course,
          Topic,
          Enrollment,
          Chat,
          File,
          Message,
          Room,
          Session,
          StudentSession,
          SocialLinks,
        ],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    EventEmitterModule.forRoot(),
    AuthModule,
    UsersModule,
    EnrollmentsModule,
    CoursesModule,
    RoomsModule,
    SessionsModule,
    MessagesModule,
    ChatsModule,
    TeachersModule,
    StudentsModule,
    MailModule,
    FilesModule,
    SocialLinksModule,
    StudentSessionsModule,
    TopicsModule,
    ObjectStorageModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
