import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { ChatsService } from './chats.service';

// We should have as DS like Map to store user sockets in chat

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: 'http://localhost:5000',
  },
})
export class ChatsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  constructor(
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
  ) {}
  // Event: send message
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): Promise<any> {
    try {
      console.log(data);
      // const { id, firstName, lastName, role, profilePicture } = user
      // TODO: Extract user id from socket
      const { userId, chatId, message } = data;
      // check if chat exist
      const chat = await this.chatsService.findOne(chatId);
      console.log(chat);
      if (!chat) {
        throw new WsException(`There is no chat with id ${chatId}`);
      }
      // Implement creating message by chat id
      const newMessage = await this.messagesService.createByChatId(
        userId,
        chatId,
        message,
      );
      // Broadcast message to all users in chat
      client.to(`chat-${data.chatId}`).emit('message', { message: newMessage });

      return {
        status: 'success',
        result: 'Message sent successfully',
        message: newMessage,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // TODO: Update message
  @SubscribeMessage('update-message')
  async updateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { userId, chatId, messageId, message } = data;

      const updatedMessage = await this.messagesService.update(
        userId,
        messageId,
        message,
      );

      // Broadcast message to all users in chat
      client
        .to(`chat-${chatId}`)
        .emit('message-updated', { message: updatedMessage });

      return {
        status: 'success',
        result: 'Message updated successfully',
        message: updatedMessage,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // TODO: Delete message
  @SubscribeMessage('remove-message')
  async removeMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { userId, chatId, messageId } = data;

      await this.messagesService.remove(userId, messageId);

      client.to(`chat-${chatId}`).emit('message-removed', { messageId });

      return {
        status: 'success',
        result: 'Message removed successfully',
        messageId,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // join socket.io room
  @SubscribeMessage('join-room')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    try {
      const { chatId } = data;
      // Check if chat exist
      const chat = await this.chatsService.findOne(chatId);
      console.log(chat);
      if (!chat) {
        throw new WsException(`There is no chat with id ${chatId}`);
      }
      // TODO: check if the user has access to the chat

      // Join room
      client.join(`chat-${chatId}`);

      return { result: `User with id ${client.id} joined the chat ${chatId}` };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // leave socket.io room
  @SubscribeMessage('leave-room')
  leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { chatId } = data;

    // Leave room
    client.leave(`chat-${chatId}`);
    return { result: `User with id ${client.id} left the chat ${chatId}` };
  }

  // Event: connection
  handleConnection(client: Socket, ...args: any[]) {
    console.log('------------------------------------------------');
    console.log(`Client with id ${client.id} connected`);
    console.log('------------------------------------------------');
  }

  // Event: disconnection
  handleDisconnect(client: Socket) {
    console.log('------------------------------------------------');
    console.log(`Client with id ${client.id} disconnected`);
    console.log('------------------------------------------------');
    // Leave all rooms
    client.rooms.forEach((room) => {
      client.leave(room);
    });
  }
}
