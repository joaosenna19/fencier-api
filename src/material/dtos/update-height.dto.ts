import { IsNumber } from 'class-validator';

export class UpdateHeightDto {
  @IsNumber()
  feet: Number;

  @IsNumber()
  pricePer8Ft: Number;

  @IsNumber()
  pricePer4Ft: Number;

  @IsNumber()
  priceSingleGate: Number;

  @IsNumber()
  priceDoubleGate: Number;

  @IsNumber()
  gateFeet: Number;
}
