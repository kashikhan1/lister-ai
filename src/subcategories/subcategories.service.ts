import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class SubcategoriesService {
  constructor(private prisma: PrismaService) {}

  create(createSubcategoryDto: CreateSubcategoryDto) {
    return this.prisma.subCategory.create({ data: createSubcategoryDto });
  }

  findAll() {
    return this.prisma.subCategory.findMany({});
  }

  findOne(id: number) {
    const subCategory = this.prisma.subCategory.findUnique({ where: { id } });
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
