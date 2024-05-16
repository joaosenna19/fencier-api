import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationModule } from './organization/organization.module';
import { PrismaService } from './database/prisma.service';


@Module({
  imports: [OrganizationModule],
  controllers: [AppController],
  providers: [AppService, OrganizationService, PrismaService],
})
export class AppModule {}
