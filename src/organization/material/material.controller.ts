import { Controller, Get, Post, Delete, Patch, Param, Query } from '@nestjs/common';
import { MaterialService } from './material.service';
import { ValidateMongoIdPipe } from '../pipes/mongoId-validation.pipe';
import { CreateMaterialDto } from './dtos/create-material.dto';

@Controller('material')
export class MaterialController {
  constructor(private materialService: MaterialService) {}

  @Get()
  getMaterials() {
    return this.materialService.getMaterials();
  }

  @Get(':id')
  getMaterial(@Param('id', ValidateMongoIdPipe) id: string ) {
    return this.materialService.getMaterial(id);
  }

  @Post()
  createMaterial(@Query('tenantId') tenantId: string, material: CreateMaterialDto) {
    return 'Create a material';
  }

  @Delete(':id')
  deleteMaterial() {
    return 'Delete a material';
  }

  @Patch(':id')
  updateMaterial() {
    return 'Update a material';
  }
}
