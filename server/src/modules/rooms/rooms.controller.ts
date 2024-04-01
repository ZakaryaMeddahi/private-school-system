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
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/createRoom.dto';
import { UpdateRoomDto } from './dto/updateRoom.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { TeacherGuard } from 'src/guards/teacher.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';

@Controller('api/v1/courses/:courseId/rooms')
@UseGuards(AuthGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  // TODO: Add enrollment guard
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
  @UseGuards(TeacherGuard, AdminGuard)
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
  @UseGuards(TeacherGuard, AdminGuard)
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
  @UseGuards(TeacherGuard, AdminGuard)
  async removeRoom(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.roomsService.remove(id);
      return { status: 'success', message: 'Room deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status);
    }
  }
}
