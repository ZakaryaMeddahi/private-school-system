import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { RoomsGateway } from './rooms.gateway';

@Injectable()
export class RoomsEvents {
  constructor(private readonly roomsGateway: RoomsGateway) {}

  @OnEvent('room-message.created')
  broadcastMessage(data: any) {
    const { userId, roomId, message } = data;
    const client = this.roomsGateway.sessions.getSession(userId);
    const server = this.roomsGateway.server;
    if (client) {
      console.log('Inside broadcastMessage');

      console.log('roomId: ' + roomId);
      console.log('userId: ' + userId);
      

      client.to(`room-${roomId}`).emit('message', { message });
    } else {
      console.error('Client not found');
    }
  }
}
