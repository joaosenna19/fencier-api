import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStyleDto } from '../dtos/create-style.dto';
import { UpdateStyleDto } from '../dtos/update-style.dto';
import { UploadService } from '../upload/upload.service';
@Injectable()
export class StyleService {
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async getStyles(materialId: string) {
    return await this.prisma.style.findMany({
      where: {
        materialId: materialId,
      },
      include: {
        colors: {
          include: {
            heights: true,
          },
        },
      },
    });
  }

  async getStyleById(id: string) {
    const style = await this.prisma.style.findUnique({
      where: {
        id: id,
      },
      include: {
        colors: {
          include: {
            heights: true,
          },
        },
      },
    });

    return style;
  }

  async createStyle(createStyleDto: CreateStyleDto, materialId: string) {
    try {
      return await this.prisma.style.create({
        data: {
          name: createStyleDto.name,
          materialId: materialId,
          imageUrl: createStyleDto.styleImageUrl || '',
          colors: {
            create: createStyleDto.colors.map((color) => ({
              name: color.name,
              imageUrl: color.colorImageUrl || '',
              heights: {
                create: color.heights.map((height) => ({
                  imageUrl:
                    height.heightImageUrl ||
                    'https://fencierriofence.s3.amazonaws.com/fenceheight.jpg',
                  feet: height.feet as number,
                  pricePer8Ft: height.pricePer8Ft as number,
                  pricePer4Ft: height.pricePer4Ft as number,
                  priceSingleGate: height.priceSingleGate as number,
                  priceDoubleGate: height.priceDoubleGate as number,
                })),
              },
            })),
          },
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async deleteStyle(id: string) {
    const style = await this.prisma.style.findUnique({
      where: {
        id,
      },
    });

    const imageUrls = await this.collectImageUrls(style);

    for (const imageUrl of imageUrls) {
      const fileName = imageUrl.split('/').pop();
      if (fileName) {
        await this.uploadService.delete(fileName);
      }
    }

    const deleted = await this.prisma.style.delete({
      where: {
        id,
      },
    });

    return deleted;
  }

  private async collectImageUrls(style: any): Promise<string[]> {
    let imageUrls: string[] = [];

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

    return imageUrls;
  }

  async updateStyle(updateStyleDto: UpdateStyleDto, id: string) {
    return await this.prisma.style.update({
      where: {
        id,
      },
      data: {
        name: updateStyleDto.name,
      },
    });
  }
}
