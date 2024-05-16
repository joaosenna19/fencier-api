import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';
import { CreateOrganizationDto } from './dtos/create-organization.dto';
import { UpdateOrganizationDto } from './dtos/update-organization.dto';
import { OrganizationService } from './organization.service';

@Controller('organization')
export class OrganizationController {
  constructor(private organizationService: OrganizationService) {}

  @Get()
  getOrganizations() {
    return this.organizationService.getOrganizations();
  }

  @Get(':id')
  getOrganization(@Param('id') id: string) {
    return this.organizationService.getOrganization(id);
  }

  // Tenho q escrever um teste para ver se o email e unico
  @Post()
  createOrganization(@Body() body: CreateOrganizationDto) {
    return this.organizationService.createOrganization(body);
  }

  @Delete(':id')
  deleteOrganization(@Param('id') id: string) {
    return this.organizationService.deleteOrganization(id);
  }

  @Patch(':id')
  updateOrganization(
    @Param('id') id: string,
    @Body() body: UpdateOrganizationDto,
  ) {
    return 'Update organization';
  }
}
