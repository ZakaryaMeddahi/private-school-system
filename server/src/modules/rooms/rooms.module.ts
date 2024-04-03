import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { RoomsGateway } from './rooms.gateway';
import { ChatsService } from '../chats/chats.service';
import { Chat } from 'src/shared/entities/chat.entity';
import { Message } from 'src/shared/entities/message.entity';
import { MessagesService } from '../messages/messages.service';
import { SessionsModule } from '../sessions/sessions.module';
import { StudentSessionsModule } from '../student-sessions/student-sessions.module';
import { TopicsModule } from '../topics/topics.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SocketSession } from '../../shared/websocket.session';
import { RoomsEvents } from './rooms.events';

@Module({
  imports: [
    TypeOrmModule.forFeature([Room, Chat, Message]),
    TopicsModule,
    SessionsModule,
    StudentSessionsModule,
    EnrollmentsModule,
  ],
  controllers: [RoomsController],
  providers: [
    RoomsService,
    RoomsGateway,
    ChatsService,
    MessagesService,
    SocketSession,
    RoomsEvents,
  ],
  exports: [SocketSession],
})
export class RoomsModule {}
