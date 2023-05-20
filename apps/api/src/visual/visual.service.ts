import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { chromium, Browser } from 'playwright';
import { promises as fs } from 'fs';
import { join } from 'path';
import { Job } from '@prisma/client';
import { ScheduleService } from '../schedule/schedule.service';

@Injectable()
export class VisualService implements OnModuleInit {
  private browser!: Browser;
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private readonly prisma: PrismaService) {
    this.logger.log(`"VisualService" constructor called`);
  }

  async onModuleInit() {
    this.logger.log(`VisualService "onModuleInit" runs`);
    this.browser = await chromium.launch();
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async getJobScreenshot(job: Job): Promise<Buffer> {
    if (!job) {
      throw new Error(`Job is missing`);
    }
    this.logger.log(`"getJobScreenshot" runs: ${job.id}`);
    const page = await this.browser.newPage();
    await page.goto(job.url);
    const screenshotBuffer = await page.screenshot({ fullPage: true });
    const screenshotPath = join(__dirname, `../screenshots/job_${job.id}.png`);
    await fs.writeFile(screenshotPath, screenshotBuffer);
    await page.close();
    return screenshotBuffer;
  }
}
