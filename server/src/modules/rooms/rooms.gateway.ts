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
import { SessionsService } from '../sessions/sessions.service';
import { StudentSessionsService } from '../student-sessions/student-sessions.service';
import { TopicsService } from '../topics/topics.service';

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
    private readonly topicsService: TopicsService,
    private readonly sessionsService: SessionsService,
    private readonly studentSessionsService: StudentSessionsService,
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
      const { userId, roomId, message } = data;
      // Check if room exist
      const room = await this.roomsService.findOne(roomId);
      console.log(room);
      if (!room) {
        throw new WsException(`There is no room with id ${roomId}`);
      }
      const chat = await this.chatsService.findByRoomId(room.id);
      // Create message by chat id
      const newMessage = await this.messagesService.createByChatId(
        userId,
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
      // TODO: Extract user id from socket
      const { userId, roomId, messageId, message } = data;

      const updatedMessage = await this.messagesService.update(
        userId,
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
      // TODO: Extract user id from socket
      const { userId, roomId, messageId } = data;

      await this.messagesService.remove(userId, messageId);

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

      // Broadcast Message to all users in room
      client.to(`room-${roomId}`).emit('user-joined', { socketId: client.id });

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

    // Broadcast Message to all users in room
    client.to(`room-${roomId}`).emit('user-left', { socketId: client.id });

    return { result: `User with id ${client.id} left the chat ${roomId}` };
  }

  // TODO: Event -> start session (use create session from sessions service)
  @SubscribeMessage('start-session')
  async startSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { roomId, topicId } = data;
      const topic = await this.topicsService.findOne(topicId);

      const session = await this.sessionsService.create({
        agoraChannel: `${topic.title}-${topicId}`,
        agoraToken: 'agora-token',
      });

      await this.topicsService.updateOne(topicId, session.id, {});

      // Broadcast message to all users in chat
      client.to(`room-${roomId}`).emit('session-started', { session });

      return {
        status: 'success',
        result: 'Session started successfully',
        session,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }
  // TODO: Event -> end session (use update session from sessions service)
  @SubscribeMessage('end-session')
  async endSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      const { sessionId, roomId } = data;

      console.log(sessionId);

      const session = await this.sessionsService.update(sessionId, {
        endTime: new Date(),
      });

      // Broadcast message to all users in chat
      client.to(`room-${roomId}`).emit('session-ended', { session });

      return {
        status: 'success',
        result: 'Session ended successfully',
        session,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // TODO: Event -> join session (use create session from student-sessions service)
  @SubscribeMessage('join-session')
  async joinSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { sessionId, userId, roomId } = data;

      // TODO: Get student id using userId and add it to student session

      // Create student session
      const studentSession = await this.studentSessionsService.create(
        userId,
        sessionId,
        { joinDate: new Date() },
      );

      // Broadcast message to all users in chat
      client
        .to(`room-${roomId}`)
        .emit('user-joined-session', { studentSession });

      return {
        status: 'success',
        result: 'Session joined successfully',
        studentSession,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
  }

  // TODO: Event -> leave session (use update session from student-sessions service)
  @SubscribeMessage('leave-session')
  async leaveSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { userId, roomId } = data;

      const studentSession = await this.studentSessionsService.update(userId, {
        leaveDate: new Date(),
      });

      // Broadcast message to all users in chat
      client.to(`room-${roomId}`).emit('user-left-session', { studentSession });

      return {
        status: 'success',
        result: 'Session left successfully',
        studentSession,
      };
    } catch (error) {
      console.error(error);
      return { status: 'error', result: error.message };
    }
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
}
