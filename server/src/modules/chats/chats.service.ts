import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/shared/entities/chat.entity';
import { Equal, Repository } from 'typeorm';
import { CreateChatParams, UpdateChatParams } from 'src/shared/types';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private readonly chatRepository: Repository<Chat>,
    // private readonly coursesService: CoursesService,
  ) {}

  async findAll() {
    try {
      const chats = await this.chatRepository.find();

      return chats;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get chats', 500);
    }
  }

  async findOne(id: number) {
    try {
      // const chat = await this.chatRepository.findOne({
      //   where: { id },
      //   relations: ['course'],
      // });

      const chat = await this.chatRepository
        .createQueryBuilder('chat')
        // .leftJoinAndSelect('chat.course', 'course')
        .select('*')
        .where('chat.id = :id', { id })
        .getRawOne();

      if (!chat) return null;

      // const { course, ...restChat } = chat;

      // restChat['courseId'] = course?.id || null;

      return chat;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get chat', 500);
    }
  }

  async findByRoomId(roomId: number) {
    try {
      const chat = await this.chatRepository.findOne({
        where: { room: { id: Equal(roomId) } },
      });

      if (!chat) return null;

      return chat;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get chats', 500);
    }
  }

  async createByCourseId(courseId: number, chatData: CreateChatParams) {
    try {
      // const course = await this.coursesService.findOne(courseId);

      const newChat = this.chatRepository.create({
        ...chatData,
        course: { id: courseId },
      });

      return await this.chatRepository.save(newChat);
    } catch (error) {
      console.error(error);
      if (error.code === '23503') {
        console.log('---------------------');
        console.log(error.code);
        console.log('---------------------');
        throw new NotFoundException(
          `There is no course with the provided id ${courseId}`,
        );
      }
      throw new HttpException('Cannot create chat', 500);
    }
  }

  async createByRoomId(roomId: number, chatData: CreateChatParams) {
    try {
      // const course = await this.coursesService.findOne(courseId);

      const newChat = this.chatRepository.create({
        ...chatData,
        room: { id: roomId },
      });

      return await this.chatRepository.save(newChat);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create chat', 500);
    }
  }

  async update(id: number, chatData: UpdateChatParams) {
    try {
      const chat = await this.chatRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!chat) null;

      const updatedChat = await this.chatRepository.save({
        ...chat,
        ...chatData,
        updatedAt: new Date(),
      });

      return updatedChat;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update chat', 500);
    }
  }
}
