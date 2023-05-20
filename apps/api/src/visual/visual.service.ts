import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { chromium, Browser } from 'playwright';
import { Job } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { SHA256 } from 'crypto-js';
import { Readable } from 'stream';

@Injectable()
export class VisualService implements OnModuleInit {
  private browser!: Browser;
  private browserPromise: Promise<void>; // A promise that represents the browser initialization
  private readonly logger = new Logger(VisualService.name);

  constructor(private readonly prisma: PrismaService) {
    this.logger.log(`"VisualService" constructor called`);
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    this.browserPromise = this.initBrowser();
  }

  // Separate the browser initialization into its own method
  private async initBrowser() {
    try {
      this.logger.log(`VisualService "initBrowser" runs`);
      this.browser = await chromium.launch();
    } catch (error) {
      this.logger.error('Browser initialization failed', error);
      throw error; // re-throw the error after logging it
    }
  }

  async onModuleInit() {
    this.logger.log(`VisualService "onModuleInit" runs`);
    try {
      await this.browserPromise;
    } catch (error) {
      this.logger.error('Failed to launch browser:', error);
      // Handle browser launch failure
    }
  }

  async onModuleDestroy() {
    await this.browser.close();
  }

  async getJobScreenshot(job: Job) {
    await this.browserPromise;

    if (!job || !job.url) {
      this.logger.error('Job or job URL is missing');
      throw new Error('Job or job URL is missing');
    }

    const isValidUrl = this.validateURL(job.url);
    if (!isValidUrl) {
      this.logger.error(`Invalid URL for job ${job.id}`);
      throw new Error(`Invalid URL: ${job.url}`);
    }

    const page = await this.browser.newPage();
    let buffer: Buffer | null = null;

    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        await page.goto(job.url);
        buffer = await page.screenshot({ fullPage: true });
        break; // If screenshot is successful, break the loop
      } catch (error) {
        this.logger.error(
          `Attempt ${attempt + 1} - Error taking screenshot: ${error}`
        );
        if (attempt === 2) {
          // If all 3 attempts fail, throw error
          throw error;
        }
      }
    }

    if (!buffer) {
      throw new Error('Failed to capture screenshot after all attempts');
    }

    this.logger.log(
      `"getJobScreenshot" successfully generated buffer for job ${job.id}`
    );

    const screenshotUrl = await this.uploadImageToCloudinary({ buffer });

    this.logger.log(`"getJobScreenshot" screenshotUrl: ${screenshotUrl}`);

    const createdRun = await this.prisma.run.create({
      data: {
        jobId: job.id,
        screenshotUrl,
        status: 'SUCCESS',
        startedAt: new Date(),
        endedAt: new Date(),
      },
    });

    this.logger.log(`"getJobScreenshot" createdRun: ${createdRun.id}`);

    await page.close();
  }

  private validateURL(url: string): boolean {
    try {
      new URL(url);
    } catch (_) {
      return false;
    }
    return true;
  }

  async uploadImageToCloudinary({
    buffer,
  }: {
    buffer: Buffer;
  }): Promise<string> {
    const publicId = SHA256(buffer.toString()).toString();

    try {
      await cloudinary.api.resource(publicId);
      const url = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}`;
      this.logger.log(
        `"uploadImage" resource exists, skipping the upload, the URL is: ${url}`
      );
      // If the resource exists, we just return its URL
      return url;
    } catch (error: any) {
      this.logger.log('"uploadImage" resource does not exist, uploading[1]');
      this.logger.log({
        a: typeof error,
        b: error,
        d: JSON.parse(JSON.stringify(error)).error,
        e: JSON.parse(JSON.stringify(error)),
        f: JSON.parse(JSON.stringify(error)).error.http_code,
      });
      // If the resource does not exist, error.code will be 'not_found'
      if (
        typeof error === 'object' &&
        error &&
        JSON.parse(JSON.stringify(error)).error.http_code === 404
      ) {
        this.logger.log('"uploadImage" resource does not exist, uploading[2]');
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            { public_id: publicId },
            (uploadError, result) => {
              if (uploadError) {
                this.logger.error('"uploadImage" uploadError:', uploadError);
                reject(uploadError);
              } else if (result) {
                this.logger.log('"uploadImage" result:', result);
                resolve(result.url);
              } else {
                this.logger.error(
                  '"uploadImage" No result returned from Cloudinary'
                );
                reject(
                  new Error('Upload error: No result returned from Cloudinary')
                );
              }
            }
          );

          const readableStream = new Readable();
          readableStream.push(buffer);
          readableStream.push(null);
          readableStream.pipe(uploadStream);
        });
      } else {
        this.logger.error('"uploadImage" error final:', error);
        // If the error is not a 'not_found' error, we throw it
        throw error;
      }
    }
  }
}
