import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';
export class CreateTagDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @MinLength(1)
  @ApiProperty()
  name: string;
}
