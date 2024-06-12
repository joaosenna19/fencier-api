import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { PrismaService } from 'src/database/prisma.service';
import { StyleModule } from './style/style.module';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService],
  imports: [StyleModule]
})
export class MaterialModule {}
