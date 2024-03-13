import { Controller, Get, HttpException, Patch } from '@nestjs/common';
import { UpdateChatDto } from './dto/updateChat.dto';
import { ChatsService } from './chats.service';

@Controller('api/v1/course/:courseId/chats')
export class ChatsController {
  constructor(private readonly chatsService: ChatsService) {}

  @Get()
  async getChats(id: number) {
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

  @Patch(':id')
  async updateChat(id: number, chatData: UpdateChatDto) {
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
