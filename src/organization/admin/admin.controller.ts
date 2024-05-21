import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import { ValidateTenantIdPipe } from './pipes/tenantId-validation.pipe';
import { ValidateAdminIdPipe } from './pipes/adminId-validation.pipe';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUser(@CurrentUser() user: any) {
    return user;
  }

  @Get(':id')
  async getAdmin(@Param('id', ValidateAdminIdPipe) id: string) {
    const admin = await this.adminService.getAdmin(id);
    return admin;
  }

  @Post('/signup')
  async createAdmin(
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
    @Body() body: CreateAdminDto,
  ) {
    const admin = await this.adminService.createAdmin(tenantId, body);
    return { message: 'Admin created successfully', admin };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':tenantId')
  async getAdmins(@Param('tenantId', ValidateTenantIdPipe) tenantId: string) {
    const admins = await this.adminService.getAdmins(tenantId);
    return admins;
  }

  @Delete()
  async deleteAdmin(@Query('id', ValidateAdminIdPipe) id: string) {
    const admin = await this.adminService.deleteAdmin(id);
    return { message: 'Admin deleted successfully', admin: admin };
  }

  @UseGuards(JwtAuthGuard)
  @Patch()
  async updateAdmin(
    @Query('id', ValidateAdminIdPipe) id: string,
    @Body() body: UpdateAdminDto,
  ) {
    const admin = await this.adminService.updateAdmin(id, body);
    return { message: 'Admin updated successfully', admin: admin };
  }
}