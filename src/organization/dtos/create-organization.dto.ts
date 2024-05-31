import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsEnum,
} from 'class-validator';
import { Type } from 'class-transformer';

export class AddressDto {
  @IsString()
  @IsNotEmpty()
  street: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  @IsEnum([
    'AB',
    'BC',
    'MB',
    'NB',
    'NL',
    'NS',
    'NT',
    'NU',
    'ON',
    'PE',
    'QC',
    'SK',
    'YT',
  ])
  province: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;
}

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  name: String;

  @IsString()
  @IsNotEmpty()
  adminName: String;

  @IsEmail()
  @IsNotEmpty()
  email: String;

  @IsString()
  @IsNotEmpty()
  @Matches(/^(\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}$/)
  phoneNumber: String;

  @IsString()
  websiteUrl: String;

  @IsString()
  logoUrl: String;

  @Type(() => AddressDto)
  address: AddressDto;
}
