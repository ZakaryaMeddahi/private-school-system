import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsException,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { RoomsService } from './rooms.service';
import { ChatsService } from '../chats/chats.service';

// We should have as DS like Map to store user sockets in room

@WebSocketGateway({
  namespace: 'rooms',
  cors: {
    origin: 'http://localhost:5000',
  },
})
export class RoomsGateway {
  constructor(
    private readonly roomsService: RoomsService,
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
      const { roomId, message } = data;
      // Check if room exist
      const room = await this.roomsService.findOne(roomId);
      console.log(room);
      if (!room) {
        throw new WsException(`There is no room with id ${roomId}`);
      }
      const chat = await this.chatsService.findByRoomId(room.id);
      // Create message by chat id
      const newMessage = await this.messagesService.createByChatId(
        chat.id,
        message,
      );
      // Broadcast message to all users in chat
      client.to(`room-${data.roomId}`).emit('message', { message: newMessage });
      return {
        status: 'success',
        result: 'Message created successfully',
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
      const { roomId, messageId, message } = data;

      const updatedMessage = await this.messagesService.update(
        messageId,
        message,
      );

      // Broadcast message to all users in chat
      client
        .to(`room-${roomId}`)
        .emit('message-updated', { message: updatedMessage });

      return {
        status: 'success',
        result: 'Message updated successfully',
        message: updatedMessage,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: 'Cannot update message' };
    }
  }

  // TODO: Remove message
  @SubscribeMessage('remove-message')
  async removeMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { roomId, messageId } = data;

      await this.messagesService.remove(messageId);

      // Broadcast message to all users in chat
      client.to(`room-${roomId}`).emit('message-removed', messageId);

      return {
        status: 'success',
        result: 'Message removed successfully',
        messageId,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: 'Cannot remove message' };
    }
  }

  // join socket.io room
  @SubscribeMessage('join-room')
  async joinRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    try {
      const { roomId } = data;
      // Check if room exist
      const room = await this.roomsService.findOne(roomId);
      console.log(room);
      if (!room) {
        throw new WsException(`There is no room with id ${roomId}`);
      }

      // TODO: check if the user has access to the room
      // Join room
      client.join(`room-${roomId}`);

      return {
        result: `User with id ${client.id} joined the room ${roomId}`,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // leave socket.io room
  @SubscribeMessage('leave-room')
  leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { roomId } = data;

    // Leave room
    client.leave(`room-${roomId}`);

    return { result: `User with id ${client.id} left the chat ${roomId}` };
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

    // Leave all rooms on disconnect
    client.rooms.forEach((room) => {
      client.leave(room);
    });
  }

  // TODO: Event -> start session (use create session from sessions service)
  // TODO: Event -> end session (use update session from sessions service)
}
