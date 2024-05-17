import {
  PipeTransform,
  BadRequestException,
  Injectable,
  ArgumentMetadata,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { isMongoId } from 'class-validator';

@Injectable()
export class ValidateAdminIdPipe implements PipeTransform {
  constructor(private prisma: PrismaService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const adminId = value;
    if (!value) {
      throw new BadRequestException('Admin ID is required');
    } else if (!isMongoId(adminId)) {
      throw new BadRequestException('Invalid Admin ID');
    } else {
      const admin = await this.prisma.admin.findUnique({
        where: {
          id: adminId,
        },
      });

      if (!admin) {
        throw new NotFoundException('Admin not found');
      }

      return adminId;
    }
  }
}
