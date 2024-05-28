import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleEntity } from './entities/article.entity';
import { QueryOptionsDto } from '../users/dto/query-options.dto';
import { title } from 'process';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: ArticleEntity })
  async create(@Body() createArticleDto: CreateArticleDto) {
    return new ArticleEntity(
      await this.articlesService.create(createArticleDto),
    );
  }

  @Get()
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findAll(@Query() queryOptions: QueryOptionsDto) {
    const { page, pageSize, search, orderBy, featured } = queryOptions;
    console.log(`............`, queryOptions);
    const skip = (page - 1) * pageSize > 0 ? (page - 1) * pageSize : 0;
    const take = pageSize || 20;

    const searchCriteria = {
      AND: [],
    };
    if (search) {
      console.log('search', search);
      console.log('search', search);
      console.log('search', search);
      console.log('search', search);
      console.log('search', search);
      searchCriteria.AND.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (featured) {
      searchCriteria.AND.push({
        featured: true,
      });
    }
    const orderByObject = orderBy ? JSON.parse(orderBy) : { createdAt: 'desc' };
    const articles = await this.articlesService.findAll(
      skip,
      take,
      searchCriteria,
      orderByObject,
    );
    return articles.map((article) => new ArticleEntity(article));
  }

  @Get('trends')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findTrends(@Query() queryOptions: QueryOptionsDto) {
    const { page, pageSize, search, orderBy } = queryOptions;
    const skip = (page - 1) * pageSize > 0 ? (page - 1) * pageSize : 0;
    const take = pageSize || 20;
    const where = search
      ? {
          OR: [
            { topic: { contains: search, mode: 'insensitive' } },
            { title: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};
    const orderByObject = orderBy ? JSON.parse(orderBy) : { createdAt: 'desc' };
    const trends = await this.articlesService.findTrends(
      skip,
      take,
      where,
      orderByObject,
    );
    return trends.map((trend) => new ArticleEntity(trend));
  }

  @Get('drafts')
  @ApiOkResponse({ type: ArticleEntity, isArray: true })
  async findDrafts(@Query() queryOptions: QueryOptionsDto) {
    const { page, pageSize, search, orderBy, featured } = queryOptions;
    const skip = (page - 1) * pageSize > 0 ? (page - 1) * pageSize : 0;
    const take = pageSize || 20;

    const searchCriteria = {
      AND: [],
    };
    if (search) {
      searchCriteria.AND.push({
        OR: [
          { title: { contains: search, mode: 'insensitive' } },
          { description: { contains: search, mode: 'insensitive' } },
        ],
      });
    }
    if (featured) {
      searchCriteria.AND.push({
        featured: true,
      });
    }
    const orderByObject = orderBy ? JSON.parse(orderBy) : { createdAt: 'desc' };
    const drafts = await this.articlesService.findDrafts(
      skip,
      take,
      searchCriteria,
      orderByObject,
    );
    return drafts.map((draft) => new ArticleEntity(draft));
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.findOne(id));
  }

  @Patch(':id')
  @ApiCreatedResponse({ type: ArticleEntity })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateArticleDto: UpdateArticleDto,
  ) {
    return new ArticleEntity(
      await this.articlesService.update(id, updateArticleDto),
    );
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleEntity })
  async remove(@Param('id', ParseIntPipe) id: number) {
    return new ArticleEntity(await this.articlesService.remove(id));
  }
}
