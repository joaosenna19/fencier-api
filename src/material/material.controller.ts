import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Param,
  Query,
  Body,
} from '@nestjs/common';
import { MaterialService } from './material.service';
import { ValidateMongoIdMaterialPipe } from '../pipes/mongoId-validation-material.pipe';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { ValidateTenantIdPipe } from '../pipes/tenantId-validation.pipe';
import { PrismaService } from 'src/database/prisma.service';
import { UpdateMaterialDto } from './dtos/update-material.dto';

@Controller('/material')
export class MaterialController {
  constructor(private materialService: MaterialService,
    private prisma: PrismaService,
  ) {}

 

  @Get()
  async getMaterials() {
    return await this.materialService.getMaterials();
  }


  @Get(':id')
  async getMaterial(@Param('id', ValidateMongoIdMaterialPipe) id: string) {

    return await this.materialService.getMaterial(id);
  }
  

  @Post()
  async createMaterial(
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string, @Body()
    material: CreateMaterialDto,
  ) {
    
    return await this.materialService.createMaterial(material, tenantId);
  }

  @Delete()
  async deleteMaterial(@Query('id', ValidateMongoIdMaterialPipe) id: string){
    return await this.materialService.deleteMaterial(id);
  }

  @Patch()
  async updateMaterial(@Body() material: UpdateMaterialDto, @Query('id', ValidateMongoIdMaterialPipe) id: string){
    return await this.materialService.updateMaterial(id, material);
  }
}
