import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { CreateQuoteDto } from './dtos/create-quote.dto'

@Controller('quote')
export class QuoteController {

    @Get()
    async getQuotes() {
        return 'Quote';
    }

    @Get(':id')
    async getQuoteById() {
        return 'Quote by Id';
    }

    @Post()
    async createQuote(@Body() createQuoteDto: CreateQuoteDto, tenantId: string){
        return 'Create Quote';
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
