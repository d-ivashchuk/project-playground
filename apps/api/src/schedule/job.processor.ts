import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';

@Processor('jobQueue')
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  @Process('crawl')
  handleJob(job: Job<any>) {
    this.logger.log(`"handleJob" runs: ${JSON.stringify(job.data, null, 2)}`);
  }
}
