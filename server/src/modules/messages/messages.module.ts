import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from 'src/shared/entities/message.entity';
import { FilesModule } from '../files/files.module';
import { ChatsModule } from '../chats/chats.module';
import { EnrollmentsModule } from '../enrollments/enrollments.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    FilesModule,
    ChatsModule,
    EnrollmentsModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService],
})
export class MessagesModule {}
