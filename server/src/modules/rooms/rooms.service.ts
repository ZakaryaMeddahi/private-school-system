import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Room } from 'src/shared/entities/room.entity';
import { CreateRoomParams, UpdateRoomParams } from 'src/shared/types';
import { Repository } from 'typeorm';
import { CoursesService } from '../courses/courses.service';

@Injectable()
export class RoomsService {
  constructor(
    @InjectRepository(Room) private readonly roomsRepository: Repository<Room>,
    private readonly coursesService: CoursesService,
  ) {}

  async create(roomData: CreateRoomParams, courseId: number) {
    try {
      const course = await this.coursesService.findOne(courseId);

      if (!course)
        throw new NotFoundException(`There is no course with id ${courseId}`);

      const newRoom = this.roomsRepository.create({
        ...roomData,
        course,
      });

      return await this.roomsRepository.save(newRoom);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create room', 500);
    }
  }

  async update(id: number, roomData: UpdateRoomParams) {
    try {
      const room = await this.roomsRepository.findOne({ where: { id } });

      if (!room) throw new NotFoundException(`There is no room with id ${id}`);

      const updatedRoom = await this.roomsRepository.save({
        ...room,
        ...roomData,
      });

      return updatedRoom;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update room', 500);
    }
  }

  async remove(id: number) {
    try {
      const room = await this.roomsRepository.findOne({ where: { id } });

      if (!room) throw new NotFoundException(`There is no room with id ${id}`);

      await this.roomsRepository.remove(room);
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot remove room', 500);
    }
  }
}
