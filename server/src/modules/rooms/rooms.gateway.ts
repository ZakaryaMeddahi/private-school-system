import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { RoomsService } from './rooms.service';
import { ChatsService } from '../chats/chats.service';
import { SessionsService } from '../sessions/sessions.service';
import { StudentSessionsService } from '../student-sessions/student-sessions.service';
import { TopicsService } from '../topics/topics.service';
import { UseGuards } from '@nestjs/common';
import { WsAuth } from 'src/guards/ws-auth.guard';
import { UserSocket } from 'src/shared/interfaces';
import { SocketSession } from '../../shared/websocket.session';

// We should have as DS like Map to store user sockets in room

@WebSocketGateway({
  namespace: 'rooms',
  cors: {
    origin: 'http://localhost:5000',
  },
})
export class RoomsGateway {
  constructor(
    readonly sessions: SocketSession,
    private readonly roomsService: RoomsService,
    private readonly chatsService: ChatsService,
    private readonly messagesService: MessagesService,
    private readonly topicsService: TopicsService,
    private readonly sessionsService: SessionsService,
    private readonly studentSessionsService: StudentSessionsService,
  ) {}

  @WebSocketServer()
  server: Server;

  // Event: connection
  handleConnection(client: UserSocket, ...args: any[]) {
    console.log('------------------------------------------------');
    console.log(`Client with id ${client.id} connected`);
    console.log('------------------------------------------------');

    const { sub: userId } = client.user;
    // Add user to session
    this.sessions.setSession(userId, client);

    console.log(this.sessions);
  }

  // Event: disconnection
  handleDisconnect(client: UserSocket) {
    console.log('------------------------------------------------');
    console.log(`Client with id ${client.id} disconnected`);
    console.log('------------------------------------------------');

    // Leave all rooms on disconnect
    client.rooms.forEach((room) => {
      client.leave(room);
    });

    // Remove user from session
    const { sub: userId } = client.user;
    this.sessions.removeSession(userId);
  }

  // Event: send message
  @UseGuards(WsAuth)
  @SubscribeMessage('message')
  async handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ): Promise<any> {
    try {
      console.log(data);
      // const { id, firstName, lastName, role, profilePicture } = user
      // TODO: Extract user id from socket
      const { sub: userId } = client.user;
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
        userId,
        chat.id,
        message,
      );

      console.log('roomId' + roomId);

      // Broadcast message to all users in chat
      client.to(`room-${roomId}`).emit('message', { message: newMessage });
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
  @UseGuards(WsAuth)
  @SubscribeMessage('update-message')
  async updateMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { sub: userId } = client.user;
      const { roomId, messageId, message } = data;

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
  @UseGuards(WsAuth)
  @SubscribeMessage('remove-message')
  async removeMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { sub: userId } = client.user;
      const { roomId, messageId } = data;

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
  @UseGuards(WsAuth)
  @SubscribeMessage('join-room')
  async joinRoom(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ) {
    try {
      const { roomId } = data;
      // Check if room exist
      const room = await this.roomsService.findOne(roomId);
      if (!room) {
        throw new WsException(`There is no room with id ${roomId}`);
      }

      console.log('roomId: ' + roomId);
      console.log('userId: ' + client.user.sub);

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
  @UseGuards(WsAuth)
  leaveRoom(@MessageBody() data: any, @ConnectedSocket() client: Socket) {
    const { roomId } = data;

    // Leave room
    client.leave(`room-${roomId}`);

    // Broadcast Message to all users in room
    client.to(`room-${roomId}`).emit('user-left', { socketId: client.id });

    return { result: `User with id ${client.id} left the chat ${roomId}` };
  }

  // TODO: Event -> start session (use create session from sessions service)
  @UseGuards(WsAuth)
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
  @UseGuards(WsAuth)
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
  @UseGuards(WsAuth)
  @SubscribeMessage('join-session')
  async joinSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { sub: userId } = client.user;
      const { sessionId, roomId } = data;

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
  @UseGuards(WsAuth)
  @SubscribeMessage('leave-session')
  async leaveSession(
    @MessageBody() data: any,
    @ConnectedSocket() client: UserSocket,
  ) {
    try {
      // TODO: Extract user id from socket
      const { sub: userId } = client.user;
      const { roomId } = data;

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
}
