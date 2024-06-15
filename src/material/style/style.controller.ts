import { Controller } from '@nestjs/common';
import { StyleService } from './style.service';
import { Get, Post, Body, Query, Param, Patch, Delete } from '@nestjs/common';
import { CreateStyleDto } from 'src/material/dtos/create-style.dto';
import { ValidateMongoIdMaterialPipe } from 'src/pipes/mongoId-validation-material.pipe';
import { ValidateMongoIdStylePipe } from 'src/pipes/mongoId-validation-style.pipe';
import { UpdateStyleDto } from '../dtos/update-style.dto';

@Controller('style')
export class StyleController {
  constructor(private readonly styleService: StyleService) {}

  @Get()
  async getStyles(
    @Query('materialId', ValidateMongoIdMaterialPipe) materialId: string,
  ) {
    return await this.styleService.getStyles(materialId);
  }

  @Get(':id')
  async getStyleById(@Param('id', ValidateMongoIdStylePipe) id: string) {
    return await this.styleService.getStyleById(id);
  }

  @Post()
  async createStyle(
    @Body() createStyleDto: CreateStyleDto,
    @Query('materialId', ValidateMongoIdMaterialPipe) materialId: string,
  ) {
    return await this.styleService.createStyle(createStyleDto, materialId);
  }

  @Delete()
  async deleteStyle(@Query('id', ValidateMongoIdStylePipe) id: string) {
    return await this.styleService.deleteStyle(id);
  }

  @Patch()
  async updateStyle(
    @Body() updateStyleDto: UpdateStyleDto,
    @Query('id', ValidateMongoIdStylePipe) id: string,
  ) {
    return await this.styleService.updateStyle(updateStyleDto, id);
  }
}
