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

@Module({
  imports: [TypeOrmModule.forFeature([Room, Chat, Message])],
  controllers: [RoomsController],
  providers: [RoomsService, RoomsGateway, ChatsService, MessagesService],
})
export class RoomsModule {}
