import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { Type } from '@prisma/client';
import { UpdateMaterialDto } from './dtos/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async getMaterials() {
    return await this.prisma.material.findMany(
      {
        include: {
          styles: {
            include: {
              colors: true,
            },
          },
        },
      }
    );
  }

  async getMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: {
        id,
      },
      include: {
        styles: {
          include: {
            colors: true,
          },
        },
      },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return material;
  }

  async createMaterial(createMaterialDto: CreateMaterialDto, tenantId: string) {
    try {
      const createdMaterial = await this.prisma.material.create({
        data: {
          tenantId: tenantId,
          name: createMaterialDto.name,
          description: createMaterialDto.description,
          type: createMaterialDto.type as Type,
          styles: {
            create: createMaterialDto.styles.map((style) => ({
              name: style.name,
              colors: {
                create: style.colors.map((color) => ({
                  name: color.name,
                  pricePerFoot: color.pricePerFoot,
                })),
              },
            })),
          },
        },
        include: {
          styles: {
            include: {
              colors: true,
            },
          },
        },
      });

      return createdMaterial;
    } catch (e) {
      return e;
    }
  }

  async deleteMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: {
        id,
      },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return await this.prisma.material.delete({
      where: {
        id,
      },
    });
    
  }

  async updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto) {
    const material = await this.prisma.material.findUnique({
      where: {
        id,
      },
    });

    if (!material) {
      throw new NotFoundException('Material not found');
    }

    return await this.prisma.material.update({
      where: {
        id,
      },
      data: {
        name: updateMaterialDto.name,
        description: updateMaterialDto.description,
        styles: {
          deleteMany: {},
          create: updateMaterialDto.styles.map((style) => ({
            name: style.name,
            colors: {
              create: style.colors.map((color) => ({
                name: color.name,
                pricePerFoot: color.pricePerFoot,
              })),
            },
          })),
        },
      },
      include: {
        styles: {
          include: {
            colors: true,
          },
        },
      },
    });
  }
}
