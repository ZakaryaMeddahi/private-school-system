import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './shared/entities/user.entity';
import { CoursesModule } from './modules/courses/courses.module';
import { JwtModule } from '@nestjs/jwt';
import { Course } from './shared/entities/course.entity';
import { RoomsModule } from './modules/rooms/rooms.module';
import { EnrollmentsModule } from './modules/enrollments/enrollments.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { MessagesModule } from './modules/messages/messages.module';
import { ChatsModule } from './modules/chats/chats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'root',
      database: 'private-school',
      entities: [User,Course],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    CoursesModule,
    RoomsModule,
    EnrollmentsModule,
    SessionsModule,
    MessagesModule,
    ChatsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
