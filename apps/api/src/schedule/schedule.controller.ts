import { Controller } from '@nestjs/common';
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
    console.log(123);

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

    return { status: 201 as const, body: response };
  }
}
