import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';

@Module({
  providers: [SessionsService]
})
export class SessionsModule {}
