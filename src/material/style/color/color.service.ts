import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateColorDto } from 'src/material/dtos/create-color.dto';
import { UpdateColorDto } from 'src/material/dtos/update-color.dto';
import { UploadService } from 'src/material/upload/upload.service';

@Injectable()
export class ColorService {
  constructor(
    private prisma: PrismaService,
    private readonly uploadService: UploadService,
  ) {}

  async getColors(styleId: string) {
    return await this.prisma.color.findMany({
      where: {
        styleId: styleId,
      },
      include: {
        heights: true,
      },
    });
  }

  async getColorById(id: string) {
    const color = await this.prisma.color.findUnique({
      where: {
        id: id,
      },
      include: {
        heights: true,
      },
    });

    return color;
  }

  async createColor(createColorDto: CreateColorDto, styleId: string) {
    try {
      return await this.prisma.color.create({
        data: {
          name: createColorDto.name,
          styleId: styleId,
          imageUrl: createColorDto.colorImageUrl || '',
          heights: {
            create: createColorDto.heights.map((height) => ({
              imageUrl: height.heightImageUrl || 'https://fencierriofence.s3.amazonaws.com/fenceheight.jpg',
              feet: height.feet as number,
              pricePer8Ft: height.pricePer8Ft as number,
              pricePer4Ft: height.pricePer4Ft as number,
              priceSingleGate: height.priceSingleGate as number,
              priceDoubleGate: height.priceDoubleGate as number,
            })),
          },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteColor(id: string) {
    const color = await this.prisma.color.delete({
      where: {
        id: id,
      },
    });
    const fileName = color.imageUrl.split('/').pop();
    if (fileName) await this.uploadService.delete(fileName);

    return color;
  }

  async updateColor(updateColorDto: UpdateColorDto, id: string) {
    try {
      return await this.prisma.color.update({
        where: {
          id: id,
        },
        data: {
          name: updateColorDto.name,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
}
