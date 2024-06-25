import { IsString, IsNotEmpty, ValidateNested, IsArray, IsOptional } from 'class-validator';
import { CreateHeightDto } from './create-height.dto';
import { Type } from 'class-transformer';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  colorImageUrl: string;

  @ValidateNested({ each: true })
  @Type(() => CreateHeightDto)
  @IsArray()
  @IsNotEmpty()
  heights: CreateHeightDto[];
}
