import { Global, Module } from '@nestjs/common';
import { VisualService } from './visual.service';
import { VisualController } from './visual.controller';
import { PrismaService } from '../app/prisma.service';
import { NotificationsService } from '../notifications/notifications.service';

@Global()
@Module({
  imports: [],
  providers: [PrismaService, VisualService, NotificationsService],
  controllers: [VisualController],
  exports: [VisualService],
})
export class VisualModule {}
