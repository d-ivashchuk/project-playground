import { Injectable } from '@nestjs/common';
import { Job } from '@prisma/client';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class ScheduleService {
  constructor(@InjectQueue('jobQueue') private jobQueue: Queue) {}

  async addJob(job: Job) {
    // You can add a job to the queue like this:
    console.log({ job });
    await this.jobQueue.add(job);
  }
}
