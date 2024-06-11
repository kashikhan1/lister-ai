import { ApiProperty } from '@nestjs/swagger';
import { Tool } from '@prisma/client';

export class ToolEntity implements Tool {
  constructor(partial: Partial<ToolEntity>) {
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
  description: string;

  @ApiProperty()
  body: string;

  @ApiProperty()
  url?: string;

  @ApiProperty()
  imgurl: string;

  @ApiProperty()
  topic: string;

  @ApiProperty()
  views: number;

  @ApiProperty()
  published: boolean;

  @ApiProperty()
  featured: boolean;

  @ApiProperty()
  verified: boolean;

  @ApiProperty()
  subCategoryId: number;

  @ApiProperty()
  tagId: number;
}
