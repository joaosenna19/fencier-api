import { IsString, IsNotEmpty, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateColorDto } from  './create-color.dto';

export class CreateStyleDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  styleImageUrl: string;

  @ValidateNested({ each: true })
  @Type(() => CreateColorDto)
  @IsNotEmpty()
  colors: CreateColorDto[];
}