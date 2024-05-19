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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateMessageDto } from './dto/create-message.dto';
import { FilesService } from '../files/files.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthUser } from 'src/decorators/user.decorator';
import { JwtPayload } from 'src/shared/types';
import { EnrollmentGuard } from 'src/guards/enrollment.guard';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller('api/v1')
@UseGuards(AuthGuard)
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly filesService: FilesService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  // TODO: Add enrollment guard
  @Get('courses/:courseId/chats/:chatId/messages')
  @UseGuards(EnrollmentGuard)
  async getMessagesForChat(
    @Param('courseId') courseId: number,
    @Param('chatId') chatId: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const messages = await this.messagesService.findByChatId({
        courseId,
        chatId,
        page,
        pageSize,
      });

      if (!messages)
        throw new NotFoundException(
          'Please double check the course and chat id',
        );

      // console.log(messages);

      return {
        status: 'success',
        message: 'Loaded messages for chat',
        data: messages,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // TODO: Add enrollment guard
  @Get('courses/:courseId/rooms/:roomId/messages')
  // @UseGuards(EnrollmentGuard)
  async getMessagesForRoom(
    @Param('courseId') courseId: number,
    @Param('roomId') roomId: number,
    @Query('page') page: number,
    @Query('pageSize') pageSize: number,
  ) {
    try {
      const messages = await this.messagesService.findByRoomId({
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
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // TODO: Add enrollment guard
  @Post('courses/:courseId/chats/:chatId/messages')
  @UseGuards(EnrollmentGuard)
  @UseInterceptors(FileInterceptor('file'))
  async sendFileInChat(
    @AuthUser() user: JwtPayload,
    @Param('chatId', ParseIntPipe) chatId: number,
    @Body() messageData: any,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { sub: userId } = user;

      console.log(file);

      const newFile = await this.filesService.create(file);

      const messageContent = messageData.content;

      const newMessage = await this.messagesService.createByChatId(
        userId,
        chatId,
        {
          content: messageContent,
          file: newFile,
        },
      );

      console.log('--------- File Message (Chat) ---------');
      console.log(newMessage);
      console.log('---------------------------------------');

      // TODO: Send message to the room
      this.eventEmitter.emit('chat-message.created', {
        userId,
        chatId,
        message: newMessage,
      });

      return {
        status: 'success',
        message: 'Message sent successfully',
        data: newMessage,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }

  // TODO: Add enrollment guard
  @Post('courses/:courseId/rooms/:roomId/messages')
  @UseGuards(EnrollmentGuard)
  @UseInterceptors(FileInterceptor('file'))
  async sendFileInRoom(
    @AuthUser() user: JwtPayload,
    @Param('roomId', ParseIntPipe) roomId: number,
    @Body() messageData: CreateMessageDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      const { sub: userId } = user;
      // Create file entity and save it in the database with relation to the message
      const newFile = await this.filesService.create(file);

      // Create message
      const newMessage = await this.messagesService.createByRoomId(
        userId,
        roomId,
        {
          ...messageData,
          file: newFile,
        },
      );

      console.log('--------- File Message (Room) ---------');
      console.log(newMessage);
      console.log('---------------------------------------');

      // TODO: Send message to the room
      this.eventEmitter.emit('room-message.created', {
        userId,
        roomId,
        message: newMessage,
      });

      return {
        status: 'success',
        message: 'Message Sent successfully',
        data: newMessage,
      };
    } catch (error) {
      console.error(error);
      throw new HttpException(error.message, error.status || 500);
    }
  }
}
