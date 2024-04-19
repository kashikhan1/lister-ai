import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength, IsString, IsOptional } from 'class-validator';

export class CreateSubscriberDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @ApiProperty()
  email: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  name?: string;
}
