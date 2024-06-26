import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';

@Injectable()
export class QuoteService {
  constructor(private prisma: PrismaService) {}

  async createQuote(data: CreateQuoteDto, tenantId: string) {
    const height = await this.prisma.height.findUnique({
      where: { id: data.heightId },
    });

    if (!height) {
      throw new NotFoundException('Color not found');
    }

    const price = calculatePrice(data, height);

    const quote = await this.prisma.quote.create({
      data: {
        tenantId: tenantId,
        materialId: data.materialId,
        styleId: data.styleId,
        colorId: data.colorId,
        heightId: data.heightId,
        feet: data.feet,
        singleGate: data.singleGate,
        finalPrice: price,
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

    const customerInfo = await this.prisma.customerInfo.findFirst({
      where: { quoteId: quote.id },
    });

    const material = await this.prisma.material.findUnique({
      where: { id: quote.materialId },
      select: {
        id: true,
        name: true,
      },
    });

    const style = await this.prisma.style.findUnique({
      where: { id: quote.styleId },
      select: {
        id: true,
        name: true,
      },
    });

    const color = await this.prisma.color.findUnique({
      where: { id: quote.colorId },
      select: {
        id: true,
        name: true,
      },
    });

    const heightFeet = height.feet;

    return {
      ...quote,
      customerInfo: customerInfo,
      material: material,
      style: style,
      color: color,
      height: heightFeet,
    };
  }

  async getQuotesByTenant(tenantId: string) {
    const quotes = await this.prisma.quote.findMany({
      where: {
        tenantId: tenantId,
      },
    });

    const detailedQuotes = await Promise.all(
      quotes.map(async (quote) => {
        const customerInfo = await this.prisma.customerInfo.findFirst({
          where: { quoteId: quote.id },
        });

        const material = await this.prisma.material.findUnique({
          where: { id: quote.materialId },
        });

        const style = await this.prisma.style.findUnique({
          where: { id: quote.styleId },
        });

        const color = await this.prisma.color.findUnique({
          where: { id: quote.colorId },
        });

        const height = await this.prisma.height.findUnique({
          where: { id: quote.heightId },
        });

        return {
          ...quote,
          customerInfo: customerInfo,
          material: material,
          style: style,
          color: color,
          height: height,
        };
      }),
    );

    return detailedQuotes;
  }

  async getQuoteById(id: string) {
    console.log(id);
    const quote = await this.prisma.quote.findUnique({
      where: { id: id },
    });

    console.log(quote);

    const customerInfo = await this.prisma.customerInfo.findFirst({
      where: { quoteId: quote.id },
    });

    const material = await this.prisma.material.findUnique({
      where: { id: quote.materialId },
    });
    const style = await this.prisma.style.findUnique({
      where: { id: quote.styleId },
    });
    const color = await this.prisma.color.findUnique({
      where: { id: quote.colorId },
    });
    const height = await this.prisma.height.findUnique({
      where: { id: quote.heightId },
    });

    return {
      ...quote,
      customerInfo: customerInfo,
      material: material,
      style: style,
      color: color,
      height: height,
    };
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
        finalPrice: data.finalPrice,
      },
    });
  }
}

function calculatePrice(data, height) {
  let actualFeet = data.singleGate
    ? data.feet - height.gateFeet
    : data.feet - height.gateFeet * 2;

  const actualFeetIn8FootSections = actualFeet / 8;

  const numberOf8Feet = Math.floor(actualFeetIn8FootSections);

  const remainingFeet = actualFeet - numberOf8Feet * 8;

  const numberOf4Feet = Math.ceil(remainingFeet / 4);

  let price = 0;

  if (!data.singleGate) {
    price =
      numberOf8Feet * height.pricePer8Ft +
      numberOf4Feet * height.pricePer4Ft +
      height.priceDoubleGate;
  } else {
    price =
      numberOf8Feet * height.pricePer8Ft +
      numberOf4Feet * height.pricePer4Ft +
      height.priceSingleGate;
  }

  return price;
}
