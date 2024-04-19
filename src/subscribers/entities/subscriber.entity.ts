import { ApiProperty } from '@nestjs/swagger';
import { Subscriber } from '@prisma/client';

export class SubscriberEntity implements Subscriber {
  constructor(partial: Partial<SubscriberEntity>) {
    Object.assign(this, partial);
  }
  @ApiProperty()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  email: string;

  @ApiProperty({ required: false, nullable: true })
  name: string | null;
}
