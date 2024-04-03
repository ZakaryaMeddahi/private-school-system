import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { ChatsGateway } from './chats.gateway';

@Injectable()
export class ChatsEvents {
  constructor(private readonly chatsGateway: ChatsGateway) {}

  @OnEvent('chat-message.created')
  broadcastMessage(data: any) {
    const { userId, chatId, message } = data;
    const client = this.chatsGateway.sessions.getSession(userId);
    if (client) {
      console.log('Inside broadcastMessage');

      console.log('chatId: ' + chatId);
      console.log('userId: ' + userId);

      client.to(`chat-${chatId}`).emit('message', { message });
    } else {
      console.error('Client not found');
    }
  }
}
