import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MinLength,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';
export class CreateToolDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  body: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  url: string;

  @IsString()
  @ApiProperty()
  @IsOptional()
  imgurl: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  topic: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  views: number;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  published: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  featured: boolean;

  @IsBoolean()
  @ApiProperty()
  @IsOptional()
  verified: boolean;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  subCategoryId: number;

  @IsNumber()
  @ApiProperty()
  @IsNotEmpty()
  tagId: number;
}
