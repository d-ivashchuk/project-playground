import { Module } from '@nestjs/common';

import { PostController } from './post.controller';

import { PrismaService } from './prisma.service';
import { PostService } from './post.service';
import { ScheduleModule } from '../schedule/schedule.module';

@Module({
  imports: [ScheduleModule],
  controllers: [PostController],
  providers: [PrismaService, PostService],
})
export class AppModule {}
