import { Module, Global } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JobProcessor } from './job.processor';
import { ScheduleService } from './schedule.service';
import { ScheduleController } from './schedule.controller';
import { PrismaService } from '../app/prisma.service';
import { BullBoardModule } from '@nestql/bull-board';
import { VisualModule } from '../visual/visual.module';

@Global()
@Module({
  imports: [
    BullModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        redis: configService.get('REDIS_URL'),
      }),
    }),
    BullModule.registerQueue({
      name: 'jobQueue',
    }),
    BullBoardModule.register(),
    VisualModule,
  ],
  providers: [PrismaService, JobProcessor, ScheduleService],
  controllers: [ScheduleController],
  exports: [ScheduleService],
})
export class ScheduleModule {}
