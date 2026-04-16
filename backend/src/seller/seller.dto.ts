import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateSellerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  sellerName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  shopName: string;

  @IsNotEmpty()
  @Matches(/^\d+$/)
  phone: string;
}