import { Controller } from '@nestjs/common';
import { HeightService } from './height.service';
import { Get, Param, Query, Post, Body, Delete, Patch } from '@nestjs/common';
import { CreateHeightDto } from 'src/material/dtos/create-height.dto';
import { UpdateHeightDto } from 'src/material/dtos/update-height.dto';
import { ValidateMongoIdHeightPipe } from 'src/pipes/mongoId-validation-height.pipe';
import { ValidateMongoIdColorPipe } from 'src/pipes/mongoId-validation-color.pipe';

@Controller('height')
export class HeightController {
  constructor(private readonly HeightService: HeightService) {}

  @Get()
  async getHeights(
    @Query('colorId', ValidateMongoIdColorPipe) colorId: string,
  ) {
    return await this.HeightService.getHeights(colorId);
  }

  @Get(':id')
  async getHeightById(@Param('id', ValidateMongoIdHeightPipe) id: string) {
    return await this.HeightService.getHeightById(id);
  }

  @Post()
  async createHeight(
    @Body() createHeightDto: CreateHeightDto,
    @Query('colorId', ValidateMongoIdColorPipe) colorId: string,
  ) {
    return await this.HeightService.createHeight(createHeightDto, colorId);
  }

  @Delete()
  async deleteHeight(@Query('id', ValidateMongoIdHeightPipe) id: string) {
    return await this.HeightService.deleteHeight(id);
  }

  @Patch()
  async updateHeight(
    @Query('id', ValidateMongoIdHeightPipe) id: string,
    @Body() updateHeightDto: UpdateHeightDto,
  ) {
    return await this.HeightService.updateHeight(id, updateHeightDto);
  }
}
