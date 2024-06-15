import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrganizationService } from './organization/organization.service';
import { OrganizationModule } from './organization/organization.module';
import { PrismaService } from './database/prisma.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './admin/auth/auth.module';
import { QuoteService } from './quote/quote.service';
import { QuoteController } from './quote/quote.controller';
import { QuoteModule } from './quote/quote.module';
import { StyleModule } from './material/style/style.module';

@Module({
  imports: [
    OrganizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuoteModule,
  ],
  controllers: [AppController, QuoteController],
  providers: [AppService, OrganizationService, PrismaService, AuthModule, QuoteService, StyleModule],
})
export class AppModule {}
