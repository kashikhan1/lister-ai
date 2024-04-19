import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookmarksService } from './bookmarks.service';
import { CreateBookmarkDto } from './dto/create-bookmark.dto';
import { UpdateBookmarkDto } from './dto/update-bookmark.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BookmarkEntity } from './entities/bookmark.entity';

@Controller('bookmarks')
@ApiTags('bookmarks')
export class BookmarksController {
  constructor(private readonly bookmarksService: BookmarksService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateBookmarkDto })
  create(@Body() createBookmarkDto: CreateBookmarkDto) {
    return this.bookmarksService.create(createBookmarkDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateBookmarkDto, isArray: true })
  findAll() {
    return this.bookmarksService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: BookmarkEntity })
  findOne(@Param('id') id: string) {
    return this.bookmarksService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: BookmarkEntity })
  update(
    @Param('id') id: string,
    @Body() updateBookmarkDto: UpdateBookmarkDto,
  ) {
    return this.bookmarksService.update(+id, updateBookmarkDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: BookmarkEntity })
  remove(@Param('id') id: string) {
    return this.bookmarksService.remove(+id);
  }
}
