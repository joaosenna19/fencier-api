import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
