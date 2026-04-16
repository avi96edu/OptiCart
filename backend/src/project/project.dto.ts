import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNumber()
  budget: number;

  @IsDateString()
  deadline: string;
}