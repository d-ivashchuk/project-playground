/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { NestFactory } from '@nestjs/core';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();

  app.useLogger(app.get(Logger));

  const port = process.env.PORT || 3000;
  await app.listen(port);
}

bootstrap();
