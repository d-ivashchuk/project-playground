import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { PrismaService } from '../app/prisma.service';

@Module({
  controllers: [NotificationsController],
  providers: [PrismaService, NotificationsService],
})
export class NotificationsModule {}
