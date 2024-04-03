import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { WebSocketAdapter } from './adapters/websocket.adapter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const adapter = new WebSocketAdapter(app);
  app.useWebSocketAdapter(adapter);
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
