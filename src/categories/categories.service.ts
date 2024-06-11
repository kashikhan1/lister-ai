import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({ data: createCategoryDto });
  }

  async findAll() {
    const categories = await this.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        subCategory: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            tool: {
              select: {
                id: true,
                name: true,
                description: true,
                url: true,
                body: true,
                imgurl: true,
                topic: true,
                views: true,
                published: true,
                featured: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            _count: {
              select: {
                tool: true,
              },
            },
          },
        },
      },
    });
    return categories;
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        subCategory: {
          select: {
            id: true,
            name: true,
            description: true,
            createdAt: true,
            updatedAt: true,
            tool: {
              select: {
                id: true,
                name: true,
                description: true,
                url: true,
                body: true,
                imgurl: true,
                topic: true,
                views: true,
                published: true,
                featured: true,
                verified: true,
                createdAt: true,
                updatedAt: true,
              },
            },
            _count: {
              select: {
                tool: true,
              },
            },
          },
        },
      },
    });
    // const category = await this.prisma.category.findUnique({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }
    return category;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.category.delete({ where: { id } });
  }
}
