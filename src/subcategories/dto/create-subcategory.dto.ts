import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsAlpha,
  IsNumber,
} from 'class-validator';
export class CreateSubcategoryDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @IsAlpha()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  categoryId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  description?: string;
}
