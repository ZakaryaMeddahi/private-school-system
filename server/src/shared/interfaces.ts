import { JwtPayload } from './types';
import { Socket } from 'socket.io';

export interface UserSocket extends Socket {
  user: JwtPayload;
}
