import {
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  Query,
} from '@nestjs/common';
import { MessagesService } from './messages.service';

@Controller('api/v1')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('courses/:courseId/chats/:chatId/messages')
  getMessagesForChat(
    @Param('courseId') courseId: number,
    @Param('chatId') chatId: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const messages = this.messagesService.findByChatId({
        courseId,
        chatId,
        page,
        pageSize,
      });

      if (!messages)
        throw new NotFoundException(
          'Please double check the course and chat id',
        );

      return {
        status: 'success',
        message: 'Loaded messages for chat',
        data: messages,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get messages', 500);
    }
  }

  @Get('courses/:courseId/rooms/:roomId/messages')
  getMessagesForRoom(
    @Param('courseId') courseId: number,
    @Param('roomId') roomId: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const messages = this.messagesService.findByRoomId({
        courseId,
        roomId,
        page,
        pageSize,
      });

      if (!messages)
        throw new NotFoundException(
          'Please double check the course and room id',
        );

      return {
        status: 'success',
        message: 'Loaded messages for room',
        data: messages,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot get messages', 500);
    }
  }
}
