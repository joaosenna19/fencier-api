import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateHeightDto {

    @IsNotEmpty()
    @IsNumber()
    feet: Number

    @IsNotEmpty()
    @IsNumber()
    pricePer8Ft: Number

    @IsNotEmpty()
    @IsNumber()
    pricePer4Ft: Number

    @IsNotEmpty()
    @IsNumber()
    priceSingleGate: Number

    @IsNotEmpty()
    @IsNumber()
    priceDoubleGate: Number

    @IsNotEmpty()
    @IsNumber()
    gateFeet: Number
}