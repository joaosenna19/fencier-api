import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { ValidateTenantIdPipe } from './pipes/tenantId-validation.pipe';
import { ValidateAdminIdPipe } from './pipes/adminId-validation.pipe';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get(':tenantId')
  async getAdmins(@Param('tenantId') tenantId: string) {
    const admins = await this.adminService.getAdmins(tenantId);
    return admins;
  }

  @Get(':tenantId/:id')
  async getAdmin(@Param('tenantId') tenantId: string, @Param('id') id: string) {
    const admin = await this.adminService.getAdmin(tenantId, id);
    return admin;
  }

  @Post()
  async createAdmin(
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
    @Body() body: CreateAdminDto,
  ) {
    const admin = await this.adminService.createAdmin(tenantId, body);
    return { message: 'Admin created successfully', admin };
  }

  @Delete()
  async deleteAdmin(@Query('tenantId', ValidateTenantIdPipe) tenantId: string, @Query('id', ValidateAdminIdPipe) id: string) {
    const admin = await this.adminService.deleteAdmin(tenantId, id);
    return { message: 'Admin deleted successfully', admin: admin };
  }

  @Patch()
  updateAdmin(
    @Query('tenantId') tenantId: string,
    @Query('id') id: string,
    @Body() body: UpdateAdminDto,
  ) {
    return `Update admin ${id} for tenant ${tenantId}`;
  }
}
