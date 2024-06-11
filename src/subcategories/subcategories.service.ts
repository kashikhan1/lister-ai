import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) { }

  create(createSubcategoryDto: CreateSubcategoryDto) {
    return this.prisma.subCategory.create({ data: createSubcategoryDto });
  }

  async findAll() {
    const subCategory = await this.prisma.subCategory.findMany({
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        tool: {
          select: {
            id: true,
            name: true,
            description: true,
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
    });
    return subCategory;
  }

  findOne(id: number) {
    const subCategory = this.prisma.subCategory.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        createdAt: true,
        updatedAt: true,
        tool: {
          select: {
            id: true,
            name: true,
            description: true,
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
    });
    if (!subCategory) {
      throw new NotFoundException(`Sub Category with ID ${id} not found`);
    }
    return subCategory;
  }

  update(id: number, updateSubcategoryDto: UpdateSubcategoryDto) {
    return this.prisma.subCategory.update({
      where: { id },
      data: updateSubcategoryDto,
    });
  }

  remove(id: number) {
    return this.prisma.subCategory.delete({ where: { id } });
  }
}
