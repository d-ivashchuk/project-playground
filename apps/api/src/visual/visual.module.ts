import { Global, Module } from '@nestjs/common';
import { VisualService } from './visual.service';
import { VisualController } from './visual.controller';
import { PrismaService } from '../app/prisma.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, VisualService],
  controllers: [VisualController],
  exports: [VisualService],
})
export class VisualModule {}
