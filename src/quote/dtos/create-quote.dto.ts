import {
  IsNumber,
  IsString,
  IsEnum,
  ValidateNested,
  IsArray,
  IsBoolean,
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

  @IsString()
  heightId: string;

  @IsNumber()
  feet: number;

  @IsBoolean()
  singleGate: boolean;

  @IsEnum(QuoteStatus)
  status: QuoteStatus;

  @ValidateNested()
  @Type(() => CustomerInfoDto)
  customerInfo: CustomerInfoDto;
}
