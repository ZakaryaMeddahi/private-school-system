import {
  Body,
  Controller,
  Get,
  HttpException,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { v2 as cloudinary } from 'cloudinary';
import { uploadFile } from 'src/helpers/object-storage';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilesService } from '../files/files.service';

@Controller('api/v1')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly filesService: FilesService,
  ) {}

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

  @Post('courses/:courseId/chats/:chatId/messages')
  @UseInterceptors(FileInterceptor('file'))
  async sendFileInChat(
    @Param('chatId') chatId: number,
    @Body() messageData: CreateMessageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const newFile = await this.filesService.create(file);

      const newMessage = await this.messagesService.createByChatId(chatId, {
        ...messageData,
        file: newFile,
      });

      console.log('--------- File Message (Chat) ---------');
      console.log(newMessage);
      console.log('---------------------------------------');

      // TODO: Send message to the room

      return {
        status: 'success',
        message: 'Message sent successfully',
        data: newMessage,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot upload file', 500);
    }
  }

  @Post('courses/:courseId/rooms/:roomId/messages')
  @UseInterceptors(FileInterceptor('file'))
  async sendFileInRoom(
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() messageData: CreateMessageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      // Create file entity and save it in the database with relation to the message
      const newFile = await this.filesService.create(file);

      // Create message
      const newMessage = await this.messagesService.createByRoomId(roomId, {
        ...messageData,
        file: newFile,
      });

      console.log('--------- File Message (Room) ---------');
      console.log(newMessage);
      console.log('---------------------------------------');

      // TODO: Send message to the room

      return {
        status: 'success',
        message: 'Message Sent successfully',
        data: newMessage,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot upload file', 500);
    }
  }
}
