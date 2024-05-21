import { IsEmail, IsString, MinLength, Matches, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsString()
  street: string;

  @IsString()
  city: string;

  @IsString()
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
  @Matches(/^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/)
  postalCode: string;

  @IsString()
  country: string;
}

export class UpdateOrganizationDto {
  @IsString()
  @MinLength(2)
  name: String;

  @IsString()
  adminName: String;

  @IsEmail()
  email: String;

  @IsString()
  @Matches(/^(\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}$/)
  phoneNumber: String;

  @IsString()
  websiteUrl: String;

  @IsString()
  logoUrl: String;

  @Type(() => AddressDto)
  address: AddressDto;
}
