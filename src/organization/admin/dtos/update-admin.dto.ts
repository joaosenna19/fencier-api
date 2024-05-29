import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @MinLength(2)
  firstName: string;

  @IsString()
  @MinLength(2)
  lastName: string;

  @IsString()
  @Matches(/^(\(\d{3}\)|\d{3})[ .-]?\d{3}[ .-]?\d{4}$/)
  phoneNumber: string;

  @IsEmail()
  email: string;

}
