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
  }

  @TsRest(c.fetchAllRunsByJobId)
  async fetchAllRunsByJobId(
    @TsRestRequest() { params }: RequestShapes['fetchAllRunsByJobId']
  ): Promise<ResponseShapes['fetchAllRunsByJobId']> {
    const response = await this.prisma.run.findMany({
      where: {
        jobId: params.id,
      },
    });

    return { status: 200 as const, body: response };
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
}
