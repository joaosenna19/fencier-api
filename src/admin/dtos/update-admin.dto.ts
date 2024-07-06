import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsEmail()
  email: string;
}
