import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationModule } from './organization/organization.module';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './admin/auth/auth.module';

@Module({
  imports: [
    OrganizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, OrganizationService, PrismaService, AuthModule],
})
export class AppModule {}
