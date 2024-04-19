import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookmarksService {
  constructor(private prisma: PrismaService) {}

  create(createBookmarkDto: CreateBookmarkDto) {
    return this.prisma.bookmark.create({ data: createBookmarkDto });
  }

  findAll() {
    return this.prisma.bookmark.findMany({});
  }

  async findOne(id: number) {
    const bookmark = await this.prisma.bookmark.findUnique({ where: { id } });
    if (!bookmark) {
      throw new NotFoundException(`Bookmark with ID ${id} not found`);
    }
    return bookmark;
  }

  update(id: number, updateBookmarkDto: UpdateBookmarkDto) {
    return this.prisma.bookmark.update({
      where: { id },
      data: updateBookmarkDto,
    });
  }

  remove(id: number) {
    return this.prisma.bookmark.delete({ where: { id } });
  }
}
