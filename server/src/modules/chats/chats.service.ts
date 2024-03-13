import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/shared/entities/chat.entity';
import { Repository } from 'typeorm';
import { UpdateChatParams } from 'src/shared/types';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatsRepository: Repository<Chat>,
  ) {}

  async findAll() {
    try {
      const chats = await this.chatsRepository.find();

      return chats;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get chats', 500);
    }
  }

  async update(id: number, chatData: UpdateChatParams) {
    try {
      const chat = await this.chatsRepository.findOne({ where: { id } });

      if (!chat) null;

      const updatedChat = await this.chatsRepository.save({
        ...chat,
        ...chatData,
      });

      return updatedChat;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update chat', 500);
    }
  }
}
