import { Module } from '@nestjs/common';
import { ChatsController } from './chats.controller';
import { ChatsService } from './chats.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from 'src/shared/entities/chat.entity';
import { ChatsGateway } from './chats.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
  controllers: [ChatsController],
  providers: [ChatsService, ChatsGateway],
})
export class ChatsModule {}
