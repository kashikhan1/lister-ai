import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ToolsService } from './tools.service';
import { CreateToolDto } from './dto/create-tool.dto';
import { UpdateToolDto } from './dto/update-tool.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ToolEntity } from './entities/tool.entity';
import { QueryOptionsDto } from '../users/dto/query-options.dto';

@Controller('tools')
@ApiTags('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateToolDto })
  create(@Body() createToolDto: CreateToolDto) {
    return this.toolsService.create(createToolDto);
  }

  @Get()
  @ApiOkResponse({ type: ToolEntity, isArray: true })
  async findAll(@Query() queryOptions: QueryOptionsDto) {
    const { page, pageSize, search, orderBy, userId } = queryOptions;
    const skip = (page - 1) * pageSize > 0 ? (page - 1) * pageSize : 0;
    const take = pageSize || 20;
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { email: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};
    const orderByObject = orderBy ? JSON.parse(orderBy) : { createdAt: 'desc' };
    const tools = await this.toolsService.findAll(
      skip,
      take,
      where,
      orderByObject,
      userId,
    );
    return tools.map((tool) => new ToolEntity(tool));
  }

  @Get(':id')
  @ApiOkResponse({ type: ToolEntity })
  findOne(@Param('id') id: string) {
    return this.toolsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ToolEntity })
  update(@Param('id') id: string, @Body() updateToolDto: UpdateToolDto) {
    return this.toolsService.update(+id, updateToolDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ToolEntity })
  remove(@Param('id') id: string) {
    return this.toolsService.remove(+id);
  }
}
