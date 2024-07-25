import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { CreateQuoteDto } from './dtos/create-quote.dto';
import { UpdateQuoteDto } from './dtos/update-quote.dto';
import { EmailService } from 'src/email/email.service';

@Injectable()
export class QuoteService {
  constructor(
    private prisma: PrismaService,
    private emailService: EmailService,
  ) {}

  async createQuote(data: CreateQuoteDto, tenantId: string) {
    const height = await this.prisma.height.findUnique({
      where: { id: data.heightId },
    });

    if (!height) {
      throw new NotFoundException('Height not found');
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

    const emailData = {
      customerInfo: customerInfo,
      material: material,
      style: style,
      color: color,
      height: heightFeet,
      feet: data.feet,
      singleGate: data.singleGate,
      finalPrice: price,
    };

    await sendEmailToCustomer(this.emailService, emailData);
    await sendEmailToContractor(this.emailService, emailData);

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
  const gateFeet = height.gateFeet || 0;
  const pricePer8Ft = height.pricePer8Ft || 0;
  const pricePer4Ft = height.pricePer4Ft || 0;
  const priceSingleGate = height.priceSingleGate || 0;
  const priceDoubleGate = height.priceDoubleGate || 0;

  let actualFeet = data.singleGate
    ? data.feet - gateFeet
    : data.feet - gateFeet * 2;

  const actualFeetIn8FootSections = actualFeet / 8;
  const numberOf8Feet = Math.floor(actualFeetIn8FootSections);
  const remainingFeet = actualFeet - numberOf8Feet * 8;
  const numberOf4Feet = Math.ceil(remainingFeet / 4);

  let price = 0;
  if (!data.singleGate) {
    price =
      numberOf8Feet * pricePer8Ft +
      numberOf4Feet * pricePer4Ft +
      priceDoubleGate;
  } else {
    price =
      numberOf8Feet * pricePer8Ft +
      numberOf4Feet * pricePer4Ft +
      priceSingleGate;
  }

  console.log('Price Calculation:', {
    numberOf8Feet,
    numberOf4Feet,
    pricePer8Ft,
    pricePer4Ft,
    priceSingleGate,
    priceDoubleGate,
    totalPrice: price,
  });

  return price;
}

async function sendEmailToCustomer(emailService, data) {
  const customerEmailContent = `
    Dear ${data.customerInfo.firstName} ${data.customerInfo.lastName},
    
    Thank you for requesting a quote from Fencier. Here are the details of your quote:

    - Material: ${data.material.name}
    - Style: ${data.style.name}
    - Color: ${data.color.name}
    - Height: ${data.height} feet
    - Length: ${data.feet}
    - Single Gate: ${data.singleGate ? 'Yes' : 'No'}
    - Final Price: $${data.finalPrice}
    
    We appreciate your interest in our services and look forward to assisting you further.

    Best regards,
    The Fencier Team
  `;

  const customerEmailHtml = `
    <p>Dear <strong>${data.customerInfo.firstName} ${data.customerInfo.lastName}</strong>,</p>
    <p>Thank you for requesting a quote from Fencier. Here are the details of your quote:</p>
    <ul>
      <li><strong>Material:</strong> ${data.material.name}</li>
      <li><strong>Style:</strong> ${data.style.name}</li>
      <li><strong>Color:</strong> ${data.color.name}</li>
      <li><strong>Height:</strong> ${data.height} feet</li>
      <li><strong>Length:</strong> ${data.feet}</li>
      <li><strong>Single Gate:</strong> ${data.singleGate ? 'Yes' : 'No'}</li>
      <li><strong>Final Price:</strong> $${data.finalPrice}</li>
    </ul>
    <p>We appreciate your interest in our services and look forward to assisting you further.</p>
    <p>Best regards,<br>The Fencier Team</p>
  `;

  await emailService.sendEmail(
    data.customerInfo.email,
    process.env.FROM_EMAIL,
    'Here is your quote! - Fencier',
    customerEmailContent,
    customerEmailHtml,
  );
}

async function sendEmailToContractor(emailService, data) {
  const contractorEmailContent = `
    Hello Team,

    A new quote request has been received. Here are the details:

    - Customer Name: ${data.customerInfo.firstName} ${data.customerInfo.lastName}
    - Material: ${data.material.name}
    - Style: ${data.style.name}
    - Color: ${data.color.name}
    - Height: ${data.height} feet
    - Length: ${data.feet}
    - Single Gate: ${data.singleGate ? 'Yes' : 'No'}
    - Final Price: $${data.finalPrice}
    
    Please review and follow up as needed.

    Best regards,
    Fencier System
  `;

  const contractorEmailHtml = `
    <p>Hello Team,</p>
    <p>A new quote request has been received. Here are the details:</p>
    <ul>
      <li><strong>Customer Name:</strong> ${data.customerInfo.firstName} ${data.customerInfo.lastName}</li>
      <li><strong>Material:</strong> ${data.material.name}</li>
      <li><strong>Style:</strong> ${data.style.name}</li>
      <li><strong>Color:</strong> ${data.color.name}</li>
      <li><strong>Height:</strong> ${data.height} feet</li>
      <li><strong>Length:</strong> ${data.feet}</li>
      <li><strong>Single Gate:</strong> ${data.singleGate ? 'Yes' : 'No'}</li>
      <li><strong>Final Price:</strong> $${data.finalPrice}</li>
    </ul>
    <p>Please review and follow up as needed.</p>
    <p>Best regards,<br>Fencier System</p>
  `;

  await emailService.sendEmail(
    process.env.FROM_EMAIL,
    process.env.FROM_EMAIL,
    'New Quote Request',
    contractorEmailContent,
    contractorEmailHtml,
  );
}
