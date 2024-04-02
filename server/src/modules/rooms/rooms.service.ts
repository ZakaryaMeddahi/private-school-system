import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { CreateRoomParams, UpdateRoomParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';
import { ChatsService } from '../chats/chats.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    private readonly chatsService: ChatsService,
    // private readonly coursesService: CoursesService,
  ) {}

  async findAll(courseId: number) {
    try {
      // const course = await this.coursesService.findOne(courseId);

      // if (!course)
      //   throw new NotFoundException(`There is no course with id ${courseId}`);

      return await this.roomsRepository.find({
        where: { course: { id: Equal(courseId) } },
      });
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get rooms', 500);
    }
  }

  async findOne(id: number) {
    try {
      const room = await this.roomsRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!room) throw new NotFoundException(`There is no room with id ${id}`);

      return room;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get room', 500);
    }
  }

  async create(roomData: CreateRoomParams, courseId: number) {
    try {
      // const course = await this.coursesService.findOne(courseId);

      // if (!course)
      //   throw new NotFoundException(`There is no course with id ${courseId}`);

      const newRoom = this.roomsRepository.create({
        ...roomData,
        course: { id: courseId },
      });

      const room = await this.roomsRepository.save(newRoom);

      await this.chatsService.createByRoomId(newRoom.id, {
        name: roomData.name,
      });

      return room;
    } catch (error) {
      console.error(error);
      if (error.code === '23503') {
        throw new NotFoundException(
          `There is no course with the provided id ${courseId}`,
        );
      }
      throw new HttpException('Cannot create room', 500);
    }
  }

  async update(id: number, roomData: UpdateRoomParams) {
    try {
      const room = await this.roomsRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!room) throw new NotFoundException(`There is no room with id ${id}`);

      const updatedRoom = await this.roomsRepository.save({
        ...room,
        ...roomData,
        updatedAt: new Date(),
      });

      return updatedRoom;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update room', 500);
    }
  }

  async remove(id: number) {
    try {
      const room = await this.roomsRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!room) throw new NotFoundException(`There is no room with id ${id}`);

      await this.roomsRepository.remove(room);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot remove room', 500);
    }
  }
}
