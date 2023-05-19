import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('jobQueue')
export class JobProcessor {
  @Process()
  handleJob(job: Job<any>) {
    // Here you handle your job.
    // This method will be invoked for each job in the queue.

    console.log({ job });
  }
}
