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
  export class ValidateMongoIdMaterialPipe implements PipeTransform {
    constructor(private prisma: PrismaService) {}
  
    async transform(value: any, metadata: ArgumentMetadata) {
      const id = value;
      if (!value) {
        throw new BadRequestException('ID is required');
      } else if (!isMongoId(id)) {
        throw new BadRequestException('Invalid ID');
      } else {
        const material = await this.prisma.material.findUnique({
          where: {
            id: id,
          },
        });
  
        if (!material) {
          throw new NotFoundException('Resource not found');
        }
  
        return id;
      }
    }
  }
  