import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { EventEmitter } from 'events';
import sgMail from '@sendgrid/mail';
import { ScheduleService } from '../schedule/schedule.service';
import { PrismaService } from '../app/prisma.service';
import { EmailIntegration, Job } from '@prisma/client';

@Injectable()
export class NotificationsService extends EventEmitter implements OnModuleInit {
  private readonly logger = new Logger(ScheduleService.name);

  constructor(private prisma: PrismaService) {
    super();
    sgMail.setApiKey(process.env.SENDGRID_API_KEY as string); // Set SendGrid API key
  }

  onModuleInit() {
    this.on(
      'emailIntegration',
      async (job: Job & { emailIntegration: EmailIntegration }) => {
        this.logger.log(`"emailIntegration" runs: ${job.id}`);
        if (job.emailIntegration) {
          await this.sendEmail(job.emailIntegration);
        }
      }
    );
    this.on('slackIntegration', async (jobId: string) => {
      this.logger.log(`"slackIntegration" runs: ${jobId}`);
    });
  }

  async sendEmail(emailIntegration: EmailIntegration) {
    if (!emailIntegration?.email) {
      this.logger.error(
        `No email address specified for email integration: ${emailIntegration.id}`
      );
      return;
    }

    const msg = {
      to: emailIntegration.email, // The email address specified in the email integration
      from: 'scout@lost-pixel.com', // The email address you've verified with SendGrid
      subject: 'Lost Pixel Scout: Visual change detected',
      text: 'Visual changes detected',
      html: `<strong>Visual changes detected</strong>`,
    };

    try {
      await sgMail.send(msg);
      this.logger.log(`Email sent to ${emailIntegration.email}`);
    } catch (error) {
      this.logger.error(
        `Error sending email to ${emailIntegration.email}: ${error}`
      );
    }
  }

  // notifyVisualChange function goes here...
}
