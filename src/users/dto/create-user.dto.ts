import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  IsOptional,
} from 'class-validator';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  password: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  provider?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  passwordResetToken?: string;

  @IsOptional()
  @ApiProperty()
  passwordResetTokenExpiry?: Date;

  @IsOptional()
  @ApiProperty()
  passwordResetAt?: Date;
}
