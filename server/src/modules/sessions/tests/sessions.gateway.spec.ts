import { Test, TestingModule } from '@nestjs/testing';
import { SessionsGateway } from '../sessions.gateway';

describe('SessionsGateway', () => {
  let gateway: SessionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SessionsGateway],
    }).compile();

    gateway = module.get<SessionsGateway>(SessionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
