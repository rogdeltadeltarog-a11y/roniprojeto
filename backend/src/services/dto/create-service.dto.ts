import { IsString, IsNotEmpty, IsNumber, IsOptional, IsJSON } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  basePrice: number;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsOptional()
  pricingRules?: any;
}
