import { Processor, Process } from '@nestjs/bull';
import { Logger } from '@nestjs/common';
import { Job } from 'bull';
import { VisualService } from '../visual/visual.service';

@Processor('jobQueue')
export class JobProcessor {
  private readonly logger = new Logger(JobProcessor.name);

  constructor(private readonly visualService: VisualService) {
    this.logger.log(`"JobProcessor" constructor called`);
  } // Inject the VisualService

  @Process('crawl')
  handleJob(job: Job<any>) {
    this.logger.log(`"handleJob" runs: ${JSON.stringify(job.data, null, 2)}`);
    this.visualService.getJobScreenshot(job.data);
  }
}
