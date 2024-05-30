import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService]
})
export class MaterialModule {}
