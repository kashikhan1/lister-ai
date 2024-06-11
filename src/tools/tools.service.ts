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

  async findAll(
    skip: number,
    take: number,
    where: any,
    orderBy: any,
    bookmarkUserId: any,
  ) {
    return this.prisma.tool.findMany({
      select: {
        id: true,
        name: true,
        body: true,
        imgurl: true,
        topic: true,
        views: true,
        published: true,
        featured: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
        tagId: true,
        subCategoryId: true,
        _count: {
          select: { bookmark: true },
        },
        bookmark: bookmarkUserId
          ? {
              where: {
                userId: bookmarkUserId,
              },
              select: {
                id: true,
                userId: true,
                createdAt: true,
                updatedAt: true,
              },
            }
          : false,
        tag: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
            category: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
      skip,
      take,
      where,
      orderBy,
    });
  }

  findOne(id: number) {
    const tool = this.prisma.tool.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        body: true,
        imgurl: true,
        topic: true,
        views: true,
        published: true,
        featured: true,
        verified: true,
        createdAt: true,
        updatedAt: true,
        tagId: true,
        subCategoryId: true,
        _count: {
          select: { bookmark: true },
        },
        tag: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        subCategory: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
            categoryId: true,
            category: {
              select: {
                id: true,
                name: true,
                createdAt: true,
                updatedAt: true,
              },
            },
          },
        },
      },
    });
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
