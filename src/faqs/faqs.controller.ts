import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { CreateFaqDto } from './dto/create-faq.dto';
import { UpdateFaqDto } from './dto/update-faq.dto';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FAQEntity } from './entities/faq.entity';

@Controller('faqs')
@ApiTags('faqs')
export class FaqsController {
  constructor(private readonly faqsService: FaqsService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateFaqDto })
  create(@Body() createFaqDto: CreateFaqDto) {
    return this.faqsService.create(createFaqDto);
  }

  @Get()
  @ApiOkResponse({ type: CreateFaqDto, isArray: true })
  findAll() {
    return this.faqsService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: FAQEntity })
  findOne(@Param('id') id: string) {
    return this.faqsService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: FAQEntity })
  update(@Param('id') id: string, @Body() updateFaqDto: UpdateFaqDto) {
    return this.faqsService.update(+id, updateFaqDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: FAQEntity })
  remove(@Param('id') id: string) {
    return this.faqsService.remove(+id);
  }
}

