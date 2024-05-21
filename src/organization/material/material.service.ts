import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async getMaterials() {
    return await this.prisma.material.findMany();
  }

  async getMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: {
        id,
      },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }
}
