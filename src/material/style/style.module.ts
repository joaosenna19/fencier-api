import { Module } from '@nestjs/common';
import { StyleService } from './style.service';
import { StyleController } from './style.controller';
import { PrismaService } from 'src/database/prisma.service';
import { ColorController } from './color/color.controller';
import { ColorModule } from './color/color.module';
import { ColorService } from './color/color.service';
import { UploadService } from '../upload/upload.service';

@Module({
  providers: [StyleService, PrismaService, ColorService, UploadService],
  controllers: [StyleController, ColorController],
  imports: [ColorModule]
})
export class StyleModule {}
