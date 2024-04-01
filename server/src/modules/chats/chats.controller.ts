import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UpdateChatDto } from './dto/updateChat.dto';
import { ChatsService } from './chats.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AdminGuard } from 'src/guards/admin.guard';
import { TeacherGuard } from 'src/guards/teacher.guard';

@Controller('api/v1/courses/:courseId/chats')
@UseGuards(AuthGuard)
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  // TODO: Add enrollment guard
  async getChats(@Param('courseId', ParseIntPipe) courseId: number) {
    try {
      const chats = await this.chatsService.findAll();

      return {
        status: 'success',
        message: 'Loaded chats successfully',
        data: chats,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.response, error.status);
    }
  }

  @Get(':id')
  // TODO: Add enrollment guard
  async getChat(@Param('id', ParseIntPipe) id: number) {
    try {
      const chat = await this.chatsService.findOne(id);

      if (!chat) {
        throw new HttpException('Chat not found', 404);
      }

      return {
        status: 'success',
        message: 'Chat loaded successfully',
        data: chat,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.response, error.status);
    }
  }

  @Patch(':id')
  @UseGuards(AdminGuard, TeacherGuard)
  async updateChat(
    @Param('id', ParseIntPipe) id: number,
    @Body() chatData: UpdateChatDto,
  ) {
    try {
      const updatedChat = await this.chatsService.update(id, chatData);

      if (!updatedChat) {
        throw new HttpException('Chat not found', 404);
      }

      return {
        status: 'success',
        message: 'Chat updated successfully',
        data: updatedChat,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.response, error.status);
    }
  }
}
