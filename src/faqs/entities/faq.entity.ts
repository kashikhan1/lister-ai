import { FAQ } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class FAQEntity implements FAQ {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  question: string;

  @ApiProperty()
  answer: string;
}
