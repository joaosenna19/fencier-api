import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateStyleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

}