import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { UpdateMaterialDto } from './dtos/update-material.dto';

@Injectable()
export class MaterialService {
  constructor(private readonly prisma: PrismaService) {}

  async getMaterials() {
    return await this.prisma.material.findMany({
      include: {
        styles: {
          include: {
            colors: {
              include: {
                heights: true,
              },
            },
          },
        },
      },
    });
  }

  async getMaterial(id: string) {
    const material = await this.prisma.material.findUnique({
      where: {
        id,
      },
      include: {
        styles: {
          include: {
            colors: {
              include: {
                heights: true,
              },
            },
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
          styles: {
            create: createMaterialDto.styles.map((style) => ({
              name: style.name,
              colors: {
                create: style.colors.map((color) => ({
                  name: color.name,
                  heights: {
                    create: color.heights.map((height) => ({
                      feet: height.feet as number,
                      pricePer8Ft: height.pricePer8Ft as number,
                      pricePer4Ft: height.pricePer4Ft as number,
                      priceSingleGate: height.priceSingleGate as number,
                      priceDoubleGate: height.priceDoubleGate as number,
                    })),
                  },
                })),
              },
            })),
          },
        },
        include: {
          styles: {
            include: {
              colors: {
                include: {
                  heights: true,
                },
              },
            },
          },
        },
      });
      return createdMaterial;
    } catch (e) {
      console.log(e);
      return await e;
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
        styles: {
          create: updateMaterialDto.styles.map((style) => ({
            name: style.name,
            colors: {
              create: style.colors.map((color) => ({
                name: color.name,
                height: {
                  create: color.heights.map((height) => ({
                    feet: height.feet,
                    pricePer8Ft: height.pricePer8Ft,
                    pricePer4Ft: height.pricePer4Ft,
                    priceSingleGate: height.priceSingleGate,
                    priceDoubleGate: height.priceDoubleGate,
                  })),
                },
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
