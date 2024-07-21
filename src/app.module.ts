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
import { SendGridModule } from '@anchan828/nest-sendgrid';
import { EmailModule } from './email/email.module';
import { EmailService } from './email/email.service';

@Module({
  imports: [
    OrganizationModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    QuoteModule,
    SendGridModule.forRoot({
      apikey: process.env.SENDGRID_API_KEY,
    }),
    EmailModule,
  ],
  controllers: [AppController, QuoteController],
  providers: [
    AppService,
    OrganizationService,
    PrismaService,
    AuthModule,
    QuoteService,
    StyleModule,
    EmailService,
  ],
})
export class AppModule {}
