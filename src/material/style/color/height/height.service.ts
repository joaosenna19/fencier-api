import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateHeightDto } from 'src/material/dtos/create-height.dto';
import { UpdateHeightDto } from 'src/material/dtos/update-height.dto';

@Injectable()
export class HeightService {
  constructor(private prisma: PrismaService) {}

  async getHeights(colorId: string) {
    return await this.prisma.height.findMany({
      where: {
        colorId: colorId,
      },
    });
  }

  async getHeightById(id: string) {
    const height = await this.prisma.height.findUnique({
      where: {
        id: id,
      },
    });

    return height;
  }

  async createHeight(createHeightDto: CreateHeightDto, colorId: string) {
    try {
      return await this.prisma.height.create({
        data: {
          feet: createHeightDto.feet as number,
          pricePer8Ft: createHeightDto.pricePer8Ft as number,
          pricePer4Ft: createHeightDto.pricePer4Ft as number,
          priceSingleGate: createHeightDto.priceSingleGate as number,
          priceDoubleGate: createHeightDto.priceDoubleGate as number,
          gateFeet: createHeightDto.gateFeet as number,
          colorId: colorId,
        },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteHeight(id: string) {
    return await this.prisma.height.delete({
      where: {
        id: id,
      },
    });
  }

  async updateHeight(id: string, updateHeightDto: UpdateHeightDto) {
    return await this.prisma.height.update({
      where: {
        id: id,
      },
      data: {
        feet: updateHeightDto.feet as number,
        pricePer8Ft: updateHeightDto.pricePer8Ft as number,
        pricePer4Ft: updateHeightDto.pricePer4Ft as number,
        priceSingleGate: updateHeightDto.priceSingleGate as number,
        priceDoubleGate: updateHeightDto.priceDoubleGate as number,
        gateFeet: updateHeightDto.gateFeet as number,
      },
    });
  }
}
