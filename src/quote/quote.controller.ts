import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateQuoteDto } from './dtos/create-quote.dto'
import { ValidateTenantIdPipe } from 'src/pipes/tenantId-validation.pipe';
import { QuoteService } from './quote.service';

@Controller('quote')
export class QuoteController {

    constructor(private quoteService: QuoteService) {}

    @Get()
    async getQuotes() {
        return 'Quote';
    }

    @Get(':id')
    async getQuoteById() {
        return 'Quote by Id';
    }

    @Post()
    async createQuote(@Body() createQuoteDto: CreateQuoteDto, @Query('tenantId', ValidateTenantIdPipe) tenantId: string){
        return await this.quoteService.createQuote(createQuoteDto, tenantId);
    }

    @Delete()
    async deleteQuote(@Query('id') id: string){
        return 'Delete Quote';
    }

    @Patch()
    async updateQuote(@Body() createQuoteDto: CreateQuoteDto, @Query('id') id: string){
        return 'Update Quote';
    }




}
