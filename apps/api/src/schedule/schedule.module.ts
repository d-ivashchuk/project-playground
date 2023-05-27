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
      useFactory: async (configService: ConfigService) => {
        try {
          const redisHost = configService.get('REDIS_HOST');
          const redisPort = configService.get('REDIS_PORT');
          const redisPassword = configService.get('REDIS_PASSWORD');
          const redisUsername = configService.get('REDIS_USERNAME');

          console.log(`Connecting to Redis at ${redisHost}:${redisPort}`);
          return {
            redis: {
              host: redisHost,
              password: redisPassword,
              port: Number(redisPort),
              username: redisUsername,
            },
          };
        } catch (error) {
          console.error('Error setting up Bull queues:', error);
          throw error;
        }
      },
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
