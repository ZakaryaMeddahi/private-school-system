import { JwtService } from '@nestjs/jwt';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { UserSocket } from '../shared/interfaces';

export class WebSocketAdapter extends IoAdapter {
  private readonly jwtService = new JwtService();

  create(port: number, options?: any) {
    console.log('Inside Websocket adapter');
    const server = super.create(port, options);
    // const server = super.createIOServer(port, options);
    server.use((client: UserSocket, next: Function) => {
      console.log('Inside Websocket Middleware');
      try {
        const token = this.extractTokenFromHandshake(client);
        // const token = client.handshake.query.token;
        console.log(token);
        const user = this.jwtService.verify(token as string, {
          secret: 'secret',
        });
        if (!user) {
          throw new WsException('Unauthorized');
        }
        client.user = user;
        next();
      } catch (error) {
        console.error(error);
        next(error);
      }
    });
    return server;
  }

  private extractTokenFromHandshake(socket: Socket): string | undefined {
    const [type, token] =
      typeof socket.handshake.query.token === 'string'
        ? socket.handshake.query.token.split(' ')
        : [];
    return type === 'Bearer' ? token : undefined;
  }
}
