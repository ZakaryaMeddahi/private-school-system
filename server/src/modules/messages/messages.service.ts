import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from 'src/shared/entities/message.entity';
import {
  CreateMessageParams,
  MessagesOptions,
  UpdateMessageParams,
} from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { ChatsService } from '../chats/chats.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message)
    private readonly messagesRepository: Repository<Message>,
    private readonly chatsService: ChatsService,
    private readonly usersService: UsersService,
  ) {}

  async findByChatId(options: MessagesOptions) {
    try {
      const { courseId, chatId } = options;
      const messages = await this.messagesRepository.find({
        where: { chat: { id: Equal(chatId), course: { id: Equal(courseId) } } },
        relations: ['sender', 'file'],
        order: { sentAt: 'ASC' },
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
            room: { id: Equal(roomId), course: { id: Equal(courseId) } },
          },
        },
        relations: ['sender', 'file'],
        order: { sentAt: 'ASC' },
      });

      if (!messages) return null;

      return messages;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get messages', 500);
    }
  }

  // Implement create message
  async createByChatId(
    userId: number,
    chatId: number,
    MessageData: CreateMessageParams,
  ) {
    try {
      // Get user
      const user = await this.usersService.findOne(userId);

      const newMessage = this.messagesRepository.create({
        chat: { id: chatId },
        content: MessageData.content,
        sender: user,
        file: MessageData.file || null,
      });

      const messageEntity = await this.messagesRepository.save(newMessage);

      return messageEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create message', 500);
    }
  }

  async createByRoomId(
    userId: number,
    roomId: number,
    MessageData: CreateMessageParams,
  ) {
    try {
      const chat = await this.chatsService.findByRoomId(roomId);

      if (!chat) throw new NotFoundException('Cannot find chat');

      const newMessage = this.messagesRepository.create({
        chat: { id: chat.id },
        content: MessageData.content,
        sender: { id: userId },
        file: MessageData.file || null,
      });

      console.log('inside create by room id');

      const messageEntity = await this.messagesRepository.save(newMessage);

      return messageEntity;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot create message',
        error.status || 500,
      );
    }
  }

  async update(userId: number, id: number, MessageData: UpdateMessageParams) {
    try {
      const message = await this.messagesRepository.findOne({
        where: { id: Equal(id) },
        relations: ['sender', 'file'],
      });

      if (!message) throw new NotFoundException('Cannot find message');

      console.log(MessageData);

      message.content = MessageData.content || message.content;
      message.isPinned = MessageData.isPinned;
      message.updatedAt = new Date();

      console.log(message);

      const updatedMessage = await this.messagesRepository.save(message);

      return updatedMessage;
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot update message',
        error.status || 500,
      );
    }
  }

  async remove(userId: number, id: number) {
    try {
      const message = await this.messagesRepository.findOne({
        where: { id: Equal(id), sender: { id: Equal(userId) } },
      });

      if (!message) throw new NotFoundException('Cannot find message');

      await this.messagesRepository.remove(message);
    } catch (error) {
      console.error(error);
      throw new HttpException(
        error.message || 'Cannot delete message',
        error.status || 500,
      );
    }
  }
}
