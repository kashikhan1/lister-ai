import { Module } from '@nestjs/common';
import { FaqsService } from './faqs.service';
import { FaqsController } from './faqs.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [FaqsController],
  providers: [FaqsService],
  imports: [PrismaModule],
})
export class FaqsModule {}
