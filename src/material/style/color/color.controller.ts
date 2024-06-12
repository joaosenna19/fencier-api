import { Body, Controller, Delete, Patch, Post } from '@nestjs/common';
import { ColorService } from './color.service';
import { Get, Query, Param } from '@nestjs/common';
import { ValidateMongoIdStylePipe } from 'src/pipes/mongoId-validation-style.pipe';
import { ValidateMongoIdColorPipe } from 'src/pipes/mongoId-validation-color.pipe';
import { CreateColorDto } from 'src/material/dtos/create-color.dto';
import { UpdateColorDto } from 'src/material/dtos/update-color.dto';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get()
  async getColors(@Query('styleId', ValidateMongoIdStylePipe) styleId: string) {
    return await this.colorService.getColors(styleId);
  }

  @Get(':id')
  async getColorById(@Param('id', ValidateMongoIdColorPipe) id: string) {
    return await this.colorService.getColorById(id);
  }

  @Post()
  async createColor(
    @Body() createColorDto: CreateColorDto,
    @Query('styleId', ValidateMongoIdStylePipe) styleId: string,
  ) {
    return await this.colorService.createColor(createColorDto, styleId);
  }

  @Delete()
  async deleteColor(@Query('id', ValidateMongoIdColorPipe) id: string) {
    return await this.colorService.deleteColor(id);
  }

  @Patch()
  async updateColor(
    @Body() updateColorDto: UpdateColorDto,
    @Query('id', ValidateMongoIdColorPipe) id: string,
  ) {
    return await this.colorService.updateColor(updateColorDto, id);
  }
}
