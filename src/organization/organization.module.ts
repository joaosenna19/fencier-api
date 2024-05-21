import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaService } from 'src/database/prisma.service';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './admin/auth/auth.module';
import { MaterialModule } from './material/material.module';

@Module({
  providers: [OrganizationService, PrismaService],
  controllers: [OrganizationController],
  imports: [AdminModule, AuthModule, MaterialModule]
})
export class OrganizationModule {}
