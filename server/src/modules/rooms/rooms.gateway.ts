import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'rooms',
  cors: {
    origin: 'http://localhost:5000',
  },
})
export class RoomsGateway {
  @SubscribeMessage('message')
  handleMessage(
    @MessageBody() data: any,
    @ConnectedSocket() client: Socket,
  ): string {
    return 'Hello world!';
  }
}
