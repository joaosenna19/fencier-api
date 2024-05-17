import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdmins(tenantId: string) {
    return await this.prisma.admin.findMany({
      where: {
        tenantId,
      },
    });
  }

  async getAdmin(tenantId: string, adminId: string) {
    return await this.prisma.admin.findUnique({
      where: {
        tenantId: tenantId,
        id: adminId,
      },
    });
  }

  async getAdminByEmail(tenantId: string, email: string) {
    return await this.prisma.admin.findUnique({
      where: {
        tenantId,
        email,
      },
    });
  }

  async createAdmin(tenantId: string, admin: CreateAdminDto) {
    return await this.prisma.admin.create({
      data: {
        ...admin,
        tenantId,
      },
    });
  }

  async deleteAdmin(tenantId: string, adminId: string) {
    return await this.prisma.admin.delete({
      where: {
        tenantId,
        id: adminId,
      },
    });
  }

  async updateAdmin(tenantId: string, adminId: string, admin: UpdateAdminDto) {
    return await this.prisma.admin.update({
      where: {
        tenantId,
        id: adminId,
      },
      data: admin,
    });
  }
}
