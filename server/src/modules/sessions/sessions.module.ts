import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from 'src/shared/entities/session.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Session])],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
