import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/shared/entities/chat.entity';
import { ChatsGateway } from './chats.gateway';
import { MessagesService } from '../messages/messages.service';
import { Message } from 'src/shared/entities/message.entity';
import { EnrollmentsModule } from '../enrollments/enrollments.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, Message]),
    EnrollmentsModule,
  ],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway, MessagesService],
  exports: [ChatsService],
})
export class ChatsModule {}
