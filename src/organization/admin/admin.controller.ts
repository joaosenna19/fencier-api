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
import { AuthService } from './auth/auth.service';

@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService, private authService: AuthService) {}

  @Get(':tenantId')
  async getAdmins(@Param('tenantId', ValidateTenantIdPipe) tenantId: string) {
    const admins = await this.adminService.getAdmins(tenantId);
    return admins;
  }

  @Get(':tenantId/:id')
  async getAdmin(@Param('tenantId', ValidateTenantIdPipe) tenantId: string, @Param('id', ValidateAdminIdPipe) id: string) {
    const admin = await this.adminService.getAdmin(tenantId, id);
    return admin;
  }

  @Post('/signup')
  async createAdmin(
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
    @Body() body: CreateAdminDto,
  ) {
    const admin = await this.authService.signUp(tenantId, body);
    return { message: 'Admin created successfully', admin };
  }

  @Post('/signin')
    async signIn(
        @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        const response = await this.authService.signIn(tenantId, email, password);
        return response;
    }

  @Delete()
  async deleteAdmin(@Query('tenantId', ValidateTenantIdPipe) tenantId: string, @Query('id', ValidateAdminIdPipe) id: string) {
    const admin = await this.adminService.deleteAdmin(tenantId, id);
    return { message: 'Admin deleted successfully', admin: admin };
  }

  @Patch()
  async updateAdmin(
    @Query('tenantId', ValidateTenantIdPipe) tenantId: string,
    @Query('id', ValidateAdminIdPipe) id: string,
    @Body() body: UpdateAdminDto,
  ) {
    const admin = await this.adminService.updateAdmin(tenantId, id, body);
    return { message: 'Admin updated successfully', admin: admin };
  }
}