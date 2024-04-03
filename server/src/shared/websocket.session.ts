import { Injectable } from '@nestjs/common';
import { UserSocket } from 'src/shared/interfaces';

@Injectable()
export class SocketSession {
  private readonly sessions: Map<number, UserSocket> = new Map();

  getSession(id: number) {
    return this.sessions.get(id);
  }

  setSession(id: number, socket: UserSocket) {
    this.sessions.set(id, socket);
  }

  removeSession(id: number) {
    this.sessions.delete(id);
  }
}
