import { BadRequestException, Injectable } from '@nestjs/common';
import { getDefaultResultOrder } from 'dns';
import { get } from 'http';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class OrganizationService {
  constructor(private prisma: PrismaService) {}

  async createOrganization(organization: any) {
    const {
      name,
      address,
      phoneNumber,
      email,
      adminName,
      websiteUrl,
      logoUrl,
    } = organization;
    return await this.prisma.organization.create({
      data: {
        name,
        address,
        phoneNumber,
        email,
        adminName,
        websiteUrl,
        logoUrl,
      },
    });
  }

  async getOrganizations() {
    return await this.prisma.organization.findMany();
  }

  async getOrganization(id: string) {
    try {
      const org = await this.prisma.organization.findUnique({
        where: {
          id,
        },
      });

      if (org === null) {
        throw new BadRequestException('Organization not found');
      }
      return org;
    } catch (error) {
      throw new BadRequestException('Organization not found');
    }
  }

  async deleteOrganization(id: string) {
    const organization = await this.getOrganization(id);
    if (!organization) {
      throw new BadRequestException('Organization not found');
    }
    return await this.prisma.organization.delete({
      where: {
        id,
      },
    });
  }

  async updateOrganization(id: string, organization: any) {
    const {
      name,
      address,
      phoneNumber,
      email,
      adminName,
      websiteUrl,
      logoUrl,
    } = organization;
    return await this.prisma.organization.update({
      where: {
        id,
      },
      data: {
        name,
        address,
        phoneNumber,
        email,
        adminName,
        websiteUrl,
        logoUrl,
      },
    });
  }
}
