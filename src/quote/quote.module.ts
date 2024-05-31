import { Module } from '@nestjs/common';
import { QuoteController } from './quote.controller';
import { QuoteService } from './quote.service';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  controllers: [QuoteController],
  providers: [QuoteService, PrismaService]
})
export class QuoteModule {}
