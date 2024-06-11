import { IsNumber, IsEnum, IsOptional } from 'class-validator';

enum QuoteStatus {
  PENDING = 'PENDING',
  ACCEPTED = 'ACCEPTED',
  REJECTED = 'REJECTED',
}

export class UpdateQuoteDto {
  @IsOptional()
  @IsEnum(QuoteStatus)
  status: QuoteStatus;

  @IsOptional()
  @IsNumber()
  finalPrice: number;
}
