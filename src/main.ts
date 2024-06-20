import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    methods: 'GET,POST,PUT,DELETE, PATCH, OPTIONS',
    allowedHeaders:  'Content-Type, Authorization, Cookie, Access-Control-Allow-Origin, Access-Control-Allow-Headers, Access-Control-Allow-Methods',
    credentials: true,
  });
  app.use(cookieParser());
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
}
bootstrap();
