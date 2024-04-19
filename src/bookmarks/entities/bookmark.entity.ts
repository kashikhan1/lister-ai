import { Bookmark } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/users/entities/user.entity';
import { ToolEntity } from 'src/tools/entities/tool.entity';

export class BookmarkEntity implements Bookmark {
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false, nullable: true })
  userId: number | null;

  @ApiProperty({ required: false, type: UserEntity })
  user?: UserEntity;

  @ApiProperty({ required: false, nullable: true })
  toolId: number | null;

  @ApiProperty({ required: false, type: ToolEntity })
  tool?: ToolEntity;

  constructor({ user, tool, ...data }: Partial<BookmarkEntity>) {
    Object.assign(this, data);

    if (user) {
      this.user = new UserEntity(user);
    }

    if (tool) {
      this.tool = new ToolEntity(tool);
    }
  }
}
