import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { PrismaService } from 'src/database/prisma.service';
import { StyleService } from './style/style.service';
import { ColorService } from './style/color/color.service';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService, StyleService, ColorService]
})
export class MaterialModule {}
