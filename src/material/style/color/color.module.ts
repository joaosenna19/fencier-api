import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HeightModule } from './height/height.module';
import { UploadService } from 'src/material/upload/upload.service';

@Module({
  providers: [ColorService, PrismaService, UploadService],
  controllers: [ColorController],
  imports: [HeightModule]
})
export class ColorModule {}
