import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  ValidateNested,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStyleDto } from './create-style.dto';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @ValidateNested({ each: true })
  @Type(() => CreateStyleDto)
  @IsArray()
  styles: CreateStyleDto[];
}
