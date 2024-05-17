import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AuthService } from './auth/auth.service';

@Module({
  providers: [AdminService, PrismaService, AuthService],
  controllers: [AdminController]
})
export class AdminModule {}
