import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';

@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) {}

  async createQuote(data: CreateQuoteDto, tenantId: string) {
    const color = await this.prisma.color.findUnique({
      where: { id: data.colorId },
    });

    if (!color) {
      throw new Error('Color not found');
    }

    const price = (data.feet * color.pricePerFoot) + (data.nOfGates * color.gatePrice);

    const quote = await this.prisma.quote.create({
      data: {
        tenantId: tenantId,
        materialId: data.materialId,
        styleId: data.styleId,
        colorId: data.colorId,
        feet: data.feet,
        nOfGates: data.nOfGates,
        price: price,
        status: data.status,
        customerInfo: {
          create: {
            firstName: data.customerInfo.firstName,
            lastName: data.customerInfo.lastName,
            address: {
              street: data.customerInfo.address.street,
              city: data.customerInfo.address.city,
              province: data.customerInfo.address.province,
              postalCode: data.customerInfo.address.postalCode,
              country: data.customerInfo.address.country,
            },
            phoneNumber: data.customerInfo.phoneNumber,
            email: data.customerInfo.email,
          },
        },
      },
    });

    return quote;
  }


  async getQuotesByTenant(tenantId: string) {
    return await this.prisma.quote.findMany(
      {
        where: {
          tenantId: tenantId
        }
      }
    );
  }
  

  async getQuoteById(id: string) {
    return await this.prisma.quote.findUnique({
      where: { id: id },
    });
  }

  async deleteQuote(id: string) {
    return await this.prisma.quote.delete({
      where: { id: id },
    });
  }

  async updateQuote(id: string, data: UpdateQuoteDto) {
    return await this.prisma.quote.update({
      where: { id: id },
      data: {
        status: data.status,
        price: data.price,
      },
    });
  }



}
