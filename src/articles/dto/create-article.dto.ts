import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateArticleDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  title: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  body: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  imgurl?: string;

  @IsString()
  @IsOptional()
  @MaxLength(300)
  @ApiProperty({ required: false })
  topic?: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty({ required: false })
  views?: number;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  featured?: boolean = false;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false, default: false })
  published?: boolean = false;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  authorId?: number;
}
