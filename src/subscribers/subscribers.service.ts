import { Injectable } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubscribersService {
  constructor(private prisma: PrismaService) {}

  create(createSubscriberDto: CreateSubscriberDto) {
    return this.prisma.subscriber.create({ data: createSubscriberDto });
  }

  findAll() {
    return this.prisma.subscriber.findMany({});
  }

  async findOne(id: number) {
    return await this.prisma.subscriber.findUnique({ where: { id } });
  }

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    return this.prisma.subscriber.update({
      where: { id },
      data: updateSubscriberDto,
    });
  }

  remove(id: number) {
    return this.prisma.subscriber.delete({
      where: { id: id },
    });
  }
}
