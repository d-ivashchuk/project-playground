import { Injectable, Logger } from '@nestjs/common';
import { Job } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(@InjectQueue('jobQueue') private jobQueue: Queue) {}

  async addJob(job: Job) {
    this.logger.log(`"addJob" runs: ${job.id}`);

    await this.jobQueue.add(job, {
      repeat: {
        cron: job.schedule,
      },
    });
  }
}
