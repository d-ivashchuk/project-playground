import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { JobProcessor } from './job.processor';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../app/prisma.service';
// ... other imports

@Global()
@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    BullModule.registerQueue({
      name: 'jobQueue',
    }),
  ],
  providers: [PrismaService, JobProcessor, ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
