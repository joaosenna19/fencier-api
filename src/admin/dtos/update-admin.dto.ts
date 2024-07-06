import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
