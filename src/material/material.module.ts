import { Module } from '@nestjs/common';
import { MaterialController } from './material.controller';
import { MaterialService } from './material.service';
import { PrismaService } from 'src/database/prisma.service';
import { StyleModule } from './style/style.module';
import { UploadService } from './upload/upload.service';
import { UploadModule } from './upload/upload.module';

@Module({
  controllers: [MaterialController],
  providers: [MaterialService, PrismaService, UploadService],
  imports: [StyleModule, UploadModule]
})
export class MaterialModule {}
