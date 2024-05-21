import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { isUUID } from 'class-validator';

@Injectable()
export class ValidateTenantIdPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    const tenantId = value;
    console.log(tenantId);
    if (!value) {
      throw new BadRequestException('Tenant ID is required');
    } else if (!isUUID(tenantId)) {
      throw new BadRequestException('Invalid Tenant ID');
    } else {
      const tenant = await this.prisma.organization.findUnique({
        where: {
          tenantId: tenantId,
        },
      });

      if (!tenant) {
        throw new NotFoundException('Tenant not found');
      }

      return tenantId;
    }
  }
}
