import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/shared/entities/message.entity';
import { MessagesOptions } from 'src/shared/types';
import { Repository } from 'typeorm';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
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
}
