import {
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStyleDto } from './create-style.dto';

export class CreateMaterialDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  materialImageUrl: string;

  @ValidateNested({ each: true })
  @Type(() => CreateStyleDto)
  @IsArray()
  @IsNotEmpty()
  styles: CreateStyleDto[];
}
