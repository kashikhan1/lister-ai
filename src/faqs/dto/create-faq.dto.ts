import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateFaqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @ApiProperty()
  question: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @ApiProperty()
  answer: string;
}
