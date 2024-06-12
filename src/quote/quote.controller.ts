import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Query,
  Param
} from '@nestjs/common';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { ValidateTenantIdPipe } from 'src/pipes/tenantId-validation.pipe';
import { QuoteService } from './quote.service';
import { UpdateQuoteDto } from './dtos/update-quote.dto';

@Controller('quote')
export class QuoteController {
  constructor(private quoteService: QuoteService) {}

  // Protect it later
  @Get()
  async getQuotes(@Query('tenantId', ValidateTenantIdPipe) tenantId: string) {
    return await this.quoteService.getQuotesByTenant(tenantId);
  }

  // Protect it later
  @Get(':id')
  async getQuoteById(@Param('id') id: string) {
    return await this.quoteService.getQuoteById(id);
  }

  // Can't be protected with JWT as it will come from the quote form
  @Post()
  async createQuote(
    @Body() createQuoteDto: CreateQuoteDto,
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
  ) {
    return await this.quoteService.createQuote(createQuoteDto, tenantId);
  }

  // Protect it later
  @Delete()
  async deleteQuote(@Query('id') id: string) {
    return await this.quoteService.deleteQuote(id);
  }

  // Protect it later
  @Patch()
  async updateQuote(
    @Body() updateQuoteDto: UpdateQuoteDto,
    @Query('id') id: string,
  ) {
    return await this.quoteService.updateQuote(id, updateQuoteDto);
  }
}
