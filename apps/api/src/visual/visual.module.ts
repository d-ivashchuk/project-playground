import { Module } from '@nestjs/common';
import { VisualService } from './visual.service';
import { VisualController } from './visual.controller';

@Module({
  controllers: [VisualController],
  providers: [VisualService],
})
export class VisualModule {}
