import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/shared/entities/message.entity';
import { CreateMessageParams, MessagesOptions } from 'src/shared/types';
import { Repository } from 'typeorm';
import { ChatsService } from '../chats/chats.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly chatsService: ChatsService,
  ) {}

  async findByChatId(options: MessagesOptions) {
    try {
      const { courseId, chatId } = options;
      const messages = await this.messagesRepository.find({
        where: { chat: { id: chatId, course: { id: courseId } } },
      });

      if (!messages) return null;

      return messages;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get messages', 500);
    }
  }

  async findByRoomId(options: MessagesOptions) {
    try {
      const { courseId, roomId } = options;
      const messages = await this.messagesRepository.find({
        where: {
          chat: {
            room: { id: roomId, course: { id: courseId } },
          },
        },
      });

      if (!messages) return null;

      return messages;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get messages', 500);
    }
  }

  // Implement create message
  async createByChatId(chatId: number, MessageData: CreateMessageParams) {
    try {
      const newMessage = this.messagesRepository.create({
        chat: { id: chatId },
        content: MessageData.content,
        file: MessageData.file || null,
      });

      const messageEntity = await this.messagesRepository.save(newMessage);

      return messageEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create message', 500);
    }
  }

  async createByRoomId(roomId: number, MessageData: CreateMessageParams) {
    try {
      const chat = await this.chatsService.findByRoomId(roomId);

      const newMessage = this.messagesRepository.create({
        chat: { id: chat.id },
        content: MessageData.content,
        file: MessageData.file || null,
      });

      console.log('inside create by room id');

      const messageEntity = await this.messagesRepository.save(newMessage);

      return messageEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create message', 500);
    }
  }
}
