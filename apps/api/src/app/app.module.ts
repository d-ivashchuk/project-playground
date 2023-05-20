import { Module } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';

import { PrismaService } from './prisma.service';
import { PostService } from './post.service';
import { ScheduleModule } from '../schedule/schedule.module';
import { VisualModule } from '../visual/visual.module';

@Module({
  imports: [
    ScheduleModule,
    VisualModule,
    LoggerModule.forRootAsync({
      useFactory: async () => {
        return {
          pinoHttp: {
            name: '[LOGGER]',
            level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
            transport:
              process.env.NODE_ENV !== 'production'
                ? {
                    target: 'pino-pretty',
                  }
                : undefined,
            quietReqLogger: true,
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [PrismaService, PostService],
})
export class AppModule {}
