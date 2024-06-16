import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateColorDto } from  './create-color.dto';

export class CreateStyleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateColorDto)
  @IsNotEmpty()
  colors: CreateColorDto[];
}