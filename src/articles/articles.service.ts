import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ArticlesService {
  constructor(private prisma: PrismaService) {}

  create(createArticleDto: CreateArticleDto) {
    return this.prisma.article.create({ data: createArticleDto });
  }

  findAll(skip: number, take: number, where: any, orderBy: any) {
    return this.prisma.article.findMany({
      skip,
      take,
      orderBy,
      include: {
        author: true,
      },
      where: { ...where, published: true },
    });
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id },
      include: {
        author: true,
      },
    });
    if (!article) {
      throw new NotFoundException(`Article with ID ${id} not found`);
    }
    return article;
  }

  async findTrends(skip: number, take: number, where: any, orderBy: any) {
    const now: Date = new Date();
    const articles = await this.prisma.article.findMany({
      orderBy: [{ views: 'desc' }, orderBy],
      where: {
        published: true,
        ...where,
      },
    });

    // Calculate a simple trending score (views per hour since published, adjusted by recency)
    articles.forEach((article: any) => {
      const hoursSincePublished: number =
        (now.getMilliseconds() -
          new Date(article.createdAt).getMilliseconds()) /
        (1000 * 60 * 60);
      article.views = article.views / hoursSincePublished;
    });

    // Sort by trend score
    articles.sort((a, b) => b.views - a.views);

    return articles.slice(skip, take); // Return top 10 trending articles
  }

  findDrafts(skip: number, take: number, where: any, orderBy: any) {
    return this.prisma.article.findMany({
      skip,
      take,
      orderBy,
      where: { ...where, published: false },
    });
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
