import {
  IsNumber,
  IsString,
  IsEnum,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { AddressDto } from 'src/organization/dtos/create-organization.dto';

enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

class CustomerInfoDto {
  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;

  @IsString()
  phoneNumber: string;

  @IsString()
  email: string;
}

export class CreateQuoteDto {
  @IsString()
  materialId: string;

  @IsString()
  styleId: string;

  @IsString()
  colorId: string;

  @IsNumber()
  feet: number;

  @IsNumber()
  nOfGates: number;

  @IsEnum(QuoteStatus)
  status: QuoteStatus;

  @ValidateNested()
  @Type(() => CustomerInfoDto)
  customerInfo: CustomerInfoDto;
}
