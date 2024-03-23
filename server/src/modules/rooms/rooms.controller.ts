import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';

@Controller('api/v1/courses/:courseId/rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  async getRooms(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      const rooms = await this.roomsService.findAll(courseId);
      return {
        status: 'success',
        message: 'Loaded rooms successfully',
        data: rooms,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Post()
  async createRoom(
    @Param('courseId', ParseIntPipe) courseId: number,
    @Body() roomData: CreateRoomDto,
  ) {
    try {
      const newRoom = await this.roomsService.create(roomData, courseId);
      return {
        status: 'success',
        message: 'Room created successfully',
        data: newRoom,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Patch(':id')
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    roomData: UpdateRoomDto,
  ) {
    try {
      const updatedRoom = await this.roomsService.update(id, roomData);
      return {
        status: 'success',
        message: 'Room updated successfully',
        data: updatedRoom,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }

  @Delete(':id')
  async removeRoom(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.roomsService.remove(id);
      return { status: 'success', message: 'Room deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
