import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ToolsService {
  constructor(private prisma: PrismaService) {}

  create(createToolDto: CreateToolDto) {
    return this.prisma.tool.create({ data: createToolDto });
  }

  async findAll(skip: number, take: number, where: any, orderBy: any) {
    return this.prisma.tool.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        tag: true,
      },
    });
  }

  findOne(id: number) {
    const tool = this.prisma.tool.findUnique({ where: { id } });
    if (!tool) {
      throw new NotFoundException(`Tool with ID ${id} not found`);
    }
    return tool;
  }

  update(id: number, updateToolDto: UpdateToolDto) {
    return this.prisma.tool.update({
      where: { id },
      data: updateToolDto,
    });
  }

  remove(id: number) {
    return this.prisma.tool.delete({
      where: { id },
    });
  }
}
