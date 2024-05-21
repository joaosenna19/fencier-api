import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';



async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  app.use(cookieParser());
  const configService = app.get(ConfigService);
  
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(configService.get('PORT'));
}
bootstrap();
