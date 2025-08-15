import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  const uploadDir = process.env.UPLOAD_DIR ?? 'uploads';
  app.use(`/${uploadDir}`, express.static(path.join(process.cwd(), uploadDir)));
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
