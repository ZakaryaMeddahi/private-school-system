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
import { Roles } from 'src/decorators/roles.decorator';
import { Role } from 'src/shared/enums';
import { RolesGuard } from 'src/guards/roles.guard';
import { EnrollmentGuard } from 'src/guards/enrollment.guard';

@Controller('api/v1/courses/:courseId/rooms')
@UseGuards(AuthGuard, RolesGuard)
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  // TODO: Add enrollment guard
  @UseGuards(EnrollmentGuard)
  async getRooms(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      const rooms = await this.roomsService.findAll(courseId);
      return {
        status: 'success',
        message: 'Loaded rooms successfully',
        data: rooms,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Post()
  @Roles(Role.TEACHER, Role.ADMIN)
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
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Patch(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  async updateRoom(
    @Param('id', ParseIntPipe) id: number,
    @Body() roomData: UpdateRoomDto,
  ) {
    try {
      const updatedRoom = await this.roomsService.update(id, roomData);
      return {
        status: 'success',
        message: 'Room updated successfully',
        data: updatedRoom,
      };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }

  @Delete(':id')
  @Roles(Role.TEACHER, Role.ADMIN)
  async removeRoom(@Param('id', ParseIntPipe) id: number) {
    try {
      await this.roomsService.remove(id);
      return { status: 'success', message: 'Room deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
