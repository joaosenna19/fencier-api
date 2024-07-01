import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import { PrismaService } from 'src/database/prisma.service';
import { CreateAdminDto } from './dtos/create-admin.dto';
import { UpdateAdminDto } from './dtos/update-admin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getAdmins(tenantId: string) {
    return await this.prisma.admin.findMany({
      omit: {
        password: true,
      },
      where: {
        tenantId,
      },
    });
  }

  async getAdmin(adminId: string) {
    return await this.prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });
  }

  async getAdminById(adminId: string) {
    return await this.prisma.admin.findUnique({
      where: {
        id: adminId,
      },
    });
  }

  async createAdmin(tenantId: string, a: CreateAdminDto) {
    const { email, password } = a;

    const adminExists = await this.prisma.admin.findFirst({
      where: {
        email,
      },
    });

    if (adminExists) {
      throw new BadRequestException('Email already in use');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await this.prisma.admin.create({
      data: {
        ...a,
        password: hashedPassword,
        tenantId,
      },
    });

    return admin;
  }

  async validateAdmin(email: string, password: string) {
    const admin = await this.prisma.admin.findUnique({
      where: {
        email,
      },
    });

    if (!admin) {
      throw new BadRequestException('Invalid email or password');
    }

    const passwordMatch = await bcrypt.compare(password, admin.password);

    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials.');
    }

    return admin;
  }

  async deleteAdmin(adminId: string) {
    return await this.prisma.admin.delete({
      where: {
        id: adminId,
      },
    });
  }

  async updateAdmin(adminId: string, admin: UpdateAdminDto) {
    return await this.prisma.admin.update({
      where: {
        id: adminId,
      },
      data: admin,
    });
  }
}
