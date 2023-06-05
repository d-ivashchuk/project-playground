import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../app/prisma.service';
import { chromium, Browser } from 'playwright';
import { Job } from '@prisma/client';
import { v2 as cloudinary } from 'cloudinary';
import { SHA256 } from 'crypto-js';
import { Readable } from 'stream';
import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import axios from 'axios';
import { NotificationsService } from '../notifications/notifications.service';

@Injectable()
export class VisualService implements OnModuleInit {
  private browser!: Browser;
  private browserPromise: Promise<void>; // A promise that represents the browser initialization
  private readonly logger = new Logger(VisualService.name);

  constructor(
    private readonly prisma: PrismaService,
    private notifications: NotificationsService
  ) {
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
      if (!this.browser || !this.browser.isConnected()) {
        this.browser = await chromium.launch();
      }
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
    try {
      await this.initBrowser();

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

      // Get the up-to-date job from the database, instead of using the one passed in on creation of Bull job
      const upToDateJob = await this.prisma.job.findUnique({
        where: { id: job.id },
        include: {
          slackIntegration: true,
          emailIntegration: true,
        },
      });

      if (upToDateJob?.baselineImageUrl) {
        this.logger.log(
          `"getJobScreenshot" baselineImageUrl found: ${upToDateJob.baselineImageUrl}`
        );
        this.logger.log(
          `"getJobScreenshot" comparing images for job ${job.id}`
        );

        const baselineImageBuffer = await this.downloadImage(
          upToDateJob.baselineImageUrl
        );

        const { diffUrl, diffPercentage, diffPixels } =
          await this.compareImages({
            baselineImageBuffer,
            newImageBuffer: buffer,
          });

        this.createRunAndUpdateJob({
          job,
          screenshotUrl,
          diffUrl,
          diffPercentage,
          diffPixels,
        });

        this.logger.log(
          `"getJobScreenshot" diffUrl: ${diffUrl}, diffPercentage: ${diffPercentage}, diffPixels: ${diffPixels}`
        );

        // Integrations part, we only send notifications if there are visual changes detected

        if (diffPixels > 0) {
          this.logger.log(
            `"getJobScreenshot" visual changes detected, sending notifications for job ${upToDateJob.id}`
          );
          this.logger.log(
            `"getJobScreenshot" xxx ${upToDateJob.emailIntegrationId}`
          );
          if (upToDateJob.slackIntegrationId) {
            this.logger.log(
              `"getJobScreenshot" sending Slack notification for job ${upToDateJob.id}`
            );
            this.notifications.emit('slackIntegration', upToDateJob);
          }
          if (upToDateJob.emailIntegrationId) {
            this.logger.log(
              `"getJobScreenshot" sending Email notification for job ${upToDateJob.id}`
            );
            this.notifications.emit('emailIntegration', upToDateJob);
          }
        }
      } else {
        this.createRunAndUpdateJob({ job, screenshotUrl });
      }
      await page.close();
    } catch (error) {
      this.logger.error(`"getJobScreenshot" error: ${error}`);
    }
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
      // If the resource does not exist, error.code will be 'not_found'
      if (
        typeof error === 'object' &&
        error &&
        JSON.parse(JSON.stringify(error)).error.http_code === 404
      ) {
        this.logger.log(
          `"uploadImage" resource does not exist, uploading with publicId: ${publicId}`
        );
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

  async compareImages({
    baselineImageBuffer,
    newImageBuffer,
  }: {
    baselineImageBuffer: Buffer;
    newImageBuffer: Buffer;
  }): Promise<{ diffUrl: string; diffPercentage: number; diffPixels: number }> {
    this.logger.log('"compareImages" runs');

    // Convert the buffers to PNG images
    const img1 = PNG.sync.read(baselineImageBuffer);
    const img2 = PNG.sync.read(newImageBuffer);

    // Create a new PNG to hold the diff image
    const { width, height } = img1;
    const diff = new PNG({ width, height });

    // Compare the images
    const diffPixels = pixelmatch(
      img1.data,
      img2.data,
      diff.data,
      width,
      height,
      { threshold: 0.1 }
    );

    // Calculate the percentage of different pixels
    const totalPixels = width * height;
    const diffPercentage = (diffPixels / totalPixels) * 100;

    // Convert the diff image back to a buffer
    const buffer = PNG.sync.write(diff);

    // Upload the diff image to Cloudinary
    const diffUrl = await this.uploadImageToCloudinary({ buffer });

    // Return the diff image buffer and diff percentage
    return { diffPercentage, diffPixels, diffUrl };
  }
  async downloadImage(url: string): Promise<Buffer> {
    this.logger.log(`"downloadImage" runs for url: ${url}`);
    const response = await axios.get(url, {
      responseType: 'arraybuffer', // This is important. It tells axios to retrieve binary data
    });
    return Buffer.from(response.data, 'binary');
  }

  async createRunAndUpdateJob({
    job,
    screenshotUrl,
    diffUrl,
    diffPixels,
    diffPercentage,
  }: {
    job: Job;
    screenshotUrl: string;
    diffUrl?: string;
    diffPixels?: number;
    diffPercentage?: number;
  }): Promise<void> {
    try {
      const getStatus = (
        diffUrl: string | undefined
      ): 'DIFFERENCE' | 'NO_CHANGE' => {
        if (diffUrl) {
          return 'DIFFERENCE';
        } else {
          return 'NO_CHANGE';
        }
      };
      const createdRun = await this.prisma.run.create({
        data: {
          jobId: job.id,
          screenshotUrl,
          diffUrl,
          diffPixels,
          diffPercentage,
          status: getStatus(diffUrl),
          startedAt: new Date(),
          endedAt: new Date(),
        },
      });

      const updatedJob = await this.prisma.job.update({
        where: { id: job.id },
        data: { baselineImageUrl: screenshotUrl },
      });

      this.logger.log(`"createRunAndUpdateJob" createdRun: ${createdRun.id}`);
      this.logger.log(
        `"createRunAndUpdateJob" baseline updated for: ${updatedJob.id}`
      );
    } catch (error) {
      this.logger.error(`"createRunAndUpdateJob" error: ${error}`);
    }
  }
}
