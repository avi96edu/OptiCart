import { IsInt, IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateProfileDto {
  @IsNotEmpty()
  @Matches(/^\d+$/)
  phone: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsInt()
  age: number;
}