import { Controller, Logger } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { apiJobs } from '@no-code/contracts';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  NestResponseShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { PrismaService } from '../app/prisma.service';
import { error } from 'console';

const c = nestControllerContract(apiJobs);
type RequestShapes = NestRequestShapes<typeof c>;
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class ScheduleController implements NestControllerInterface<typeof c> {
  private readonly logger = new Logger(ScheduleController.name);

  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly prisma: PrismaService
  ) {}

  @TsRest(c.createJob)
  async createJob(
    @TsRestRequest() { body }: RequestShapes['createJob']
  ): Promise<ResponseShapes['createJob']> {
    this.logger.log(`Creating job: ${body.sizeMode}`);
    const response = await this.prisma.job.create({
      data: {
        ...body,
      },
    });

    if (response.id) {
      this.logger.log(`Adding job to queue: ${response.id}`);
      await this.scheduleService.addJob(response);
    }

    return { status: 201 as const, body: response };
  }

  @TsRest(c.updateJob)
  async updateJob(
    @TsRestRequest() { body, params }: RequestShapes['updateJob']
  ): Promise<ResponseShapes['updateJob']> {
    try {
      this.logger.log(`Updating job: ${params.id}`);
      const existingJob = await this.prisma.job.findUnique({
        where: {
          id: params.id,
        },
      });

      // If existing job doesn't exist, then return an error
      if (!existingJob) {
        this.logger.error(`Job not found: ${params.id}`);
        return { status: 404 as const, body: 'Job not found.' };
      }

      // Update the job in the database
      const updatedJob = await this.prisma.job.update({
        where: {
          id: params.id,
        },
        data: body,
      });

      // If the schedule has changed, then remove the existing job and add the new job to the queue
      if (existingJob.schedule !== updatedJob.schedule) {
        this.logger.log(`Updating schedule for job: ${params.id}`);
        await this.scheduleService.deleteJob({
          jobId: existingJob.id,
          schedule: existingJob.schedule,
        });
        await this.scheduleService.addJob(updatedJob);
      }

      return { status: 200 as const, body: updatedJob };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: 'Update operation failed.' };
    }
  }

  @TsRest(c.fetchAllJobsByProjectId)
  async fetchAllJobsByProjectId(
    @TsRestRequest() { params }: RequestShapes['fetchAllJobsByProjectId']
  ): Promise<ResponseShapes['fetchAllJobsByProjectId']> {
    const response = await this.prisma.job.findMany({
      where: {
        projectId: params.projectId,
      },
    });

    return { status: 201 as const, body: response };
  }
  @TsRest(c.fetchAllJobsByUserId)
  async fetchAllJobsByUserId(
    @TsRestRequest() { params }: RequestShapes['fetchAllJobsByUserId']
  ): Promise<ResponseShapes['fetchAllJobsByUserId']> {
    const response = await this.prisma.job.findMany({
      where: {
        userId: params.userId,
      },
      include: {
        slackIntegration: true,
        emailIntegration: true,
        runs: {
          take: 5,
          orderBy: {
            startedAt: 'desc',
          },
        },
      },
    });

    return { status: 201 as const, body: response };
  }
  @TsRest(c.fetchTest)
  // eslint-disable-next-line no-empty-pattern
  async fetchTest(@TsRestRequest() {}) {
    return { status: 201 as const, body: 'blah' };
  }
  @TsRest(c.deleteJobById)
  async deleteJobById(
    @TsRestRequest() { params }: RequestShapes['deleteJobById']
  ): Promise<ResponseShapes['deleteJobById']> {
    try {
      this.logger.log(`Deleting job: ${params.id}`);
      const response = await this.prisma.job.delete({
        where: {
          id: params.id,
        },
      });

      if (response.id) {
        this.logger.log(`Deleting job from queue: ${response.id}`);
        await this.scheduleService.deleteJob({
          jobId: response.id,
          schedule: response.schedule,
        });
      }

      return { status: 201 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: error };
    }
  }

  @TsRest(c.fetchAllRunsByJobId)
  async fetchAllRunsByJobId(
    @TsRestRequest() { params, query }: RequestShapes['fetchAllRunsByJobId']
  ): Promise<ResponseShapes['fetchAllRunsByJobId']> {
    try {
      this.logger.log(`Fetching all runs for job: ${params.id}${query.limit}`);
      this.logger.log(`Query limit: ${query.limit}`);
      const response = await this.prisma.run.findMany({
        take: Number(query.limit),
        where: {
          jobId: params.id,
        },
        include: {
          job: true,
        },
        orderBy: {
          startedAt: 'desc',
        },
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(`Error fetching runs for job: ${params.id}`, error);
      return { status: 400 as const, body: error };
    }
  }

  @TsRest(c.fetchAllRunsForUser)
  async fetchAllRunsForUser(
    @TsRestRequest() { params }: RequestShapes['fetchAllRunsForUser']
  ): Promise<ResponseShapes['fetchAllRunsForUser']> {
    this.logger.log(`Fetching all runs for user: ${params.userId}`);
    const jobs = await this.prisma.job.findMany({
      where: {
        userId: params.userId,
      },
      include: {
        runs: {
          include: {
            job: true,
          },
          orderBy: {
            startedAt: 'desc',
          },
          take: 100,
        },
      },
    });

    const response = jobs
      .flatMap((job) =>
        job.runs.map((run) => ({
          ...run,
          job: {
            name: job.name,
            url: job.url,
          },
        }))
      )
      .sort((a, b) => {
        if (a.startedAt && b.startedAt) {
          return b.startedAt.getTime() - a.startedAt.getTime();
        } else {
          return 0;
        }
      })
      .slice(0, 100);

    return { status: 200 as const, body: response };
  }

  @TsRest(c.fetchRunById)
  async fetchRunById(
    @TsRestRequest() { params }: RequestShapes['fetchRunById']
  ): Promise<ResponseShapes['fetchRunById']> {
    const response = await this.prisma.run.findUnique({
      where: {
        id: params.id,
      },
      include: {
        job: true,
      },
    });
    if (response) {
      return { status: 200 as const, body: response };
    } else {
      return { status: 404 as const, body: response };
    }
  }
  @TsRest(c.fetchJobById)
  async fetchJobById(
    @TsRestRequest() { params }: RequestShapes['fetchJobById']
  ): Promise<ResponseShapes['fetchJobById']> {
    const response = await this.prisma.job.findUnique({
      where: {
        id: params.id,
      },
      include: {
        slackIntegration: true,
        emailIntegration: true,
      },
    });
    if (response) {
      return { status: 201 as const, body: response };
    } else {
      return { status: 404 as const, body: response };
    }
  }
}
