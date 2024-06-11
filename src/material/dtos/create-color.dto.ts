import { IsString, IsNotEmpty, ValidateNested, IsArray } from 'class-validator';
import { CreateHeightDto } from './create-height.dto';
import { Type } from 'class-transformer';

export class CreateColorDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @ValidateNested()
  @ValidateNested({ each: true })
  @Type(() => CreateHeightDto)
  @IsArray()
  heights: CreateHeightDto[];

}