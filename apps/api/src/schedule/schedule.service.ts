import { Injectable, Logger } from '@nestjs/common';
import { Job } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ScheduleService {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(@InjectQueue('jobQueue') private jobQueue: Queue) {}

  async addJob(job: Job) {
    try {
      this.logger.log(`"addJob" runs: ${job.id}`);

      const bullJob = await this.jobQueue.add('crawl', job, {
        jobId: job.id,
        repeat: {
          cron: job.schedule,
        },
      });

      this.logger.log(
        `Job ${JSON.stringify(bullJob, null, 2)} has been added.`
      );
    } catch (error) {
      this.logger.error(error);
    }
  }
  async deleteJob({ jobId, schedule }: { jobId: string; schedule: string }) {
    try {
      this.logger.log(`"deleteJob" runs: ${jobId}`);

      const job = await this.jobQueue.removeRepeatableByKey(
        `crawl:${jobId}:::${schedule}`
      );
      this.logger.log(`Job ${job} has been deleted.`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
