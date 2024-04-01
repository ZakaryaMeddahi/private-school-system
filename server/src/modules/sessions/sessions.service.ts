import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from 'src/shared/entities/session.entity';
import { CreateSessionParams, UpdateSessionParams } from 'src/shared/types';
import { Equal, Repository } from 'typeorm';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private readonly sessionsRepository: Repository<Session>,
  ) {}

  // Implement create session
  async create(
    sessionData: CreateSessionParams,
    // roomId: number,
  ) {
    // implement create session
    try {
      const newSession = this.sessionsRepository.create({
        ...sessionData,
      });

      const session = await this.sessionsRepository.save({
        ...newSession,
        // room: { id: roomId },
      });

      return session;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot create session', 500);
    }
  }

  // implement update session
  async update(id: number, sessionData: UpdateSessionParams) {
    try {
      const session = await this.sessionsRepository.findOne({
        where: { id: Equal(id) },
      });

      if (!session) {
        throw new NotFoundException('Session not found');
      }

      const updatedSession = await this.sessionsRepository.save({
        ...session,
        ...sessionData,
      });

      return updatedSession;
    } catch (error) {
      console.error(error);
      throw new HttpException('Cannot update session', 500);
    }
  }
}
