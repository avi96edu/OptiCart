import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(3)
  password: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateAdminDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  fullName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class PasswordDto {
  @IsNotEmpty()
  @MinLength(3)
  password: string;
}