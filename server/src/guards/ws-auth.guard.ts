import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';

@Injectable()
export class WsAuth implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const client = context.switchToWs().getClient();
    const event = context.switchToWs().getPattern();
    console.log(event);
    try {
      const token = this.extractTokenFromHandshake(client);
      console.log(token);
      if (!token) throw new WsException('Unauthorized');
      const user = this.jwtService.verify(token, { secret: 'secret' });
      console.log(user);
      client.user = user;
      return true;
    } catch (error) {
      console.error(error);
      client.emit(event, { status: 'error', result: 'Unauthorized' });
    }
  }

  private extractTokenFromHandshake(client: Socket): string | undefined {
    const [type, token] =
      typeof client.handshake.query.token === 'string'
        ? client.handshake.query.token.split(' ')
        : [];
    return type === 'Bearer' ? token : undefined;
  }
}
