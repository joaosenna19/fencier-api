import { IsString, IsNotEmpty, IsNumber, IsOptional, ValidateNested, IsArray, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStyleDto } from './create-style.dto';

export class CreateMaterialDto {
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsNumber()
    @IsNotEmpty()
    quantity: number;

    @IsString()
    @IsOptional()
    description: string;
  
    @IsEnum(['gate, fence'])
    @IsString()
    @IsOptional()
    type: string;
  
    @ValidateNested({ each: true })
    @Type(() => CreateStyleDto)
    @IsArray()
    styles: CreateStyleDto[];
  }

