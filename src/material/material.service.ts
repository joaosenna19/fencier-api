import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateMaterialDto } from './dtos/create-material.dto';
import { UpdateMaterialDto } from './dtos/update-material.dto';
import { UploadService } from './upload/upload.service';

@Injectable()
export class MaterialService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

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
          imageUrl: createMaterialDto.materialImageUrl || '',
          styles: {
            create: createMaterialDto.styles.map((style) => ({
              name: style.name,
              imageUrl: style.styleImageUrl || '',
              colors: {
                create: style.colors.map((color) => ({
                  name: color.name,
                  imageUrl: color.colorImageUrl || '',
                  heights: {
                    create: color.heights.map((height) => ({
                      imageUrl: height.heightImageUrl || '',
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

    const styleIds = await this.prisma.style
      .findMany({
        where: { materialId: id },
        select: { id: true },
      })
      .then((styles) => styles.map((style) => style.id));

    const colorIds = await this.prisma.color
      .findMany({
        where: { styleId: { in: styleIds } },
        select: { id: true },
      })
      .then((colors) => colors.map((color) => color.id));

    const imageUrls = this.collectImageUrls(material, styleIds, colorIds);

    for (const imageUrl of await imageUrls) {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await this.uploadService.delete(fileName);
      }
    }

    const deleted = await this.prisma.material.delete({
      where: {
        id,
      },
    });

    return deleted;
  }

  private async collectImageUrls(
    material: any,
    styleIds: string[],
    colorIds: string[],
  ): Promise<string[]> {
    let imageUrls: string[] = [];

    if (material.imageUrl) {
      imageUrls.push(material.imageUrl);
    }

    const styles = await this.prisma.style.findMany({
      where: { id: { in: styleIds } },
    });

    for (const style of styles) {
      if (style.imageUrl) {
        imageUrls.push(style.imageUrl);
      }

      const colors = await this.prisma.color.findMany({
        where: { styleId: style.id },
      });

      for (const color of colors) {
        if (color.imageUrl) {
          imageUrls.push(color.imageUrl);
        }
      }
    }

    return imageUrls;
  }

  // async updateMaterial(id: string, updateMaterialDto: UpdateMaterialDto) {
  //   const material = await this.prisma.material.findUnique({
  //     where: {
  //       id,
  //     },
  //   });

  //   if (!material) {
  //     throw new NotFoundException('Material not found');
  //   }

  //   return await this.prisma.material.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       name: updateMaterialDto.name,
  //       styles: {
  //         create: updateMaterialDto.styles.map((style) => ({
  //           name: style.name,
  //           imageUrl: style.imageUrl,
  //           colors: {
  //             create: style.colors.map((color) => ({
  //               name: color.name,
  //               imageUrl: color.imageUrl,
  //               height: {
  //                 create: color.heights.map((height) => ({
  //                   feet: height.feet,
  //                   pricePer8Ft: height.pricePer8Ft,
  //                   pricePer4Ft: height.pricePer4Ft,
  //                   priceSingleGate: height.priceSingleGate,
  //                   priceDoubleGate: height.priceDoubleGate,
  //                 })),
  //               },
  //             })),
  //           },
  //         })),
  //       },
  //     },
  //     include: {
  //       styles: {
  //         include: {
  //           colors: true,
  //         },
  //       },
  //     },
  //   });
  // }
}
