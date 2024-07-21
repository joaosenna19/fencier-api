import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaService } from 'src/database/prisma.service';
import { EmailService } from 'src/email/email.service';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService, PrismaService, EmailService],
})
export class QuoteModule {}
