import { IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateStyleDto } from './create-style.dto';

export class UpdateMaterialDto {
  @IsString()
  name: string;

  @ValidateNested({ each: true })
  @Type(() => CreateStyleDto)
  @IsArray()
  styles: CreateStyleDto[];
}
