import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class FaqsService {
  constructor(private prisma: PrismaService) {}

  create(createFaqDto: CreateFaqDto) {
    return this.prisma.fAQ.create({ data: createFaqDto });
  }

  findAll() {
    return this.prisma.fAQ.findMany();
  }

  findOne(id: number) {
    const faq = this.prisma.fAQ.findUnique({ where: { id } });
    if (!faq) {
      throw new NotFoundException(`FAQ with ID ${id} not found`);
    }
    return faq;
  }

  update(id: number, updateFaqDto: UpdateFaqDto) {
    return this.prisma.fAQ.update({ data: updateFaqDto, where: { id } });
  }

  remove(id: number) {
    return this.prisma.fAQ.delete({ where: { id } });
  }
}
