import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { WebSocketAdapter } from './adapters/websocket.adapter';
import { setupSwagger, SWAGGER_PATH } from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = Number(configService.get('PORT') ?? 8080);

  app.enableCors();
  app.useWebSocketAdapter(new WebSocketAdapter(app));
  app.useGlobalPipes(new ValidationPipe());

  setupSwagger(app, {
    port,
    publicUrl: configService.get<string>('API_PUBLIC_URL'),
  });

  await app.listen(port);

  const logger = new Logger('Bootstrap');
  logger.log(`API listening on http://localhost:${port}/api/v1`);
  logger.log(`Swagger docs on http://localhost:${port}/${SWAGGER_PATH}`);
}
bootstrap();
