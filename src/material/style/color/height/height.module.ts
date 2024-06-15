import { Module } from '@nestjs/common';
import { HeightController } from './height.controller';
import { HeightService } from './height.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [HeightController],
  providers: [HeightService, PrismaService]
})
export class HeightModule {}
