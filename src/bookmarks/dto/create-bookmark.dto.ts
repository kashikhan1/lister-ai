import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsNumber } from 'class-validator';

export class CreateBookmarkDto {
  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  userId: number;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  toolId: number;
}
