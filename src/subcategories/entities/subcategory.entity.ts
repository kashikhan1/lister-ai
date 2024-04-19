import { ApiProperty } from '@nestjs/swagger';
import { SubCategory } from '@prisma/client';

export class SubCategoryEntity implements SubCategory {
  constructor(partial: Partial<SubCategoryEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  name: string;

  @ApiProperty()
  categoryId: number;
}
