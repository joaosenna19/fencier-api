import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { PrismaService } from 'src/database/prisma.service';
import { HeightModule } from './height/height.module';

@Module({
  providers: [ColorService, PrismaService],
  controllers: [ColorController],
  imports: [HeightModule]
})
export class ColorModule {}
