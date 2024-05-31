import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { ValidateTenantIdPipe } from 'src/pipes/tenantId-validation.pipe';
import { QuoteService } from './quote.service';
import { UpdateQuoteDto } from './dtos/update-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  @Get()
  async getQuotes(@Query('tenantId', ValidateTenantIdPipe) tenantId: string) {
    return await this.quoteService.getQuotesByTenant(tenantId);
  }

  @Get()
  async getQuoteById(@Query('id') id: string) {
    return await this.quoteService.getQuoteById(id);
  }

  @Post()
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
  ) {
    return await this.quoteService.createQuote(createQuoteDto, tenantId);
  }

  @Delete()
  async deleteQuote(@Query('id') id: string) {
    return await this.quoteService.deleteQuote(id);
  }

  @Patch()
  async updateQuote(
    @Body() updateQuoteDto: UpdateQuoteDto,
    @Query('id') id: string,
  ) {
    return await this.quoteService.updateQuote(id, updateQuoteDto);
  }
}
