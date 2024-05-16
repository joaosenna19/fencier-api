import { Module } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { OrganizationController } from './organization.controller';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  providers: [OrganizationService, PrismaService],
  controllers: [OrganizationController]
})
export class OrganizationModule {}
