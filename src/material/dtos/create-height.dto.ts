import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class CreateHeightDto {

    @IsOptional()
    @IsNotEmpty()
    heightImageUrl: string

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