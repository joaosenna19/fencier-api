import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateStyleDto } from '../dtos/create-style.dto';
import { UpdateStyleDto } from '../dtos/update-style.dto';
@Injectable()
export class StyleService {
  constructor(private prisma: PrismaService) {}

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
          colors: {
            create: createStyleDto.colors.map((color) => ({
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
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  }

  async deleteStyle(id: string) {
    return await this.prisma.style.delete({
        where: {
            id,
        },
        });
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
