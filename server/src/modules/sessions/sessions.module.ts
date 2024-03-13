import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsGateway } from './sessions.gateway';

@Module({
  providers: [SessionsService, SessionsGateway]
})
export class SessionsModule {}
