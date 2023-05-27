import { Controller, Logger } from '@nestjs/common';
import { apiIntegrations } from '@no-code/contracts';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  NestResponseShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { PrismaService } from '../app/prisma.service';

const c = nestControllerContract(apiIntegrations);
type RequestShapes = NestRequestShapes<typeof c>;
type ResponseShapes = NestResponseShapes<typeof c>;

@Controller()
export class NotificationsController
  implements NestControllerInterface<typeof c>
{
  private readonly logger = new Logger(NotificationsController.name);

  constructor(private readonly prisma: PrismaService) {}

  // Email Integration
  @TsRest(c.createEmailIntegration)
  async createEmailIntegration(
    @TsRestRequest() { body }: RequestShapes['createEmailIntegration']
  ): Promise<ResponseShapes['createEmailIntegration']> {
    try {
      const response = await this.prisma.emailIntegration.create({
        data: body,
      });

      return { status: 201 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.updateEmailIntegration)
  async updateEmailIntegration(
    @TsRestRequest() { body, params }: RequestShapes['updateEmailIntegration']
  ): Promise<ResponseShapes['updateEmailIntegration']> {
    try {
      const response = await this.prisma.emailIntegration.update({
        where: {
          id: params.id,
        },
        data: body,
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.fetchEmailIntegrationById)
  async fetchEmailIntegrationById(
    @TsRestRequest() { params }: RequestShapes['fetchEmailIntegrationById']
  ): Promise<ResponseShapes['fetchEmailIntegrationById']> {
    try {
      const response = await this.prisma.emailIntegration.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!response) {
        return {
          status: 404 as const,
          body: { message: 'EmailIntegration not found' },
        };
      }

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.deleteEmailIntegrationById)
  async deleteEmailIntegrationById(
    @TsRestRequest() { params }: RequestShapes['deleteEmailIntegrationById']
  ): Promise<ResponseShapes['deleteEmailIntegrationById']> {
    try {
      const emailIntegration = await this.prisma.emailIntegration.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!emailIntegration) {
        return {
          status: 404 as const,
          body: { message: 'EmailIntegration not found' },
        };
      }

      const response = await this.prisma.emailIntegration.delete({
        where: {
          id: params.id,
        },
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }
  // Slack Integration
  @TsRest(c.createSlackIntegration)
  async createSlackIntegration(
    @TsRestRequest() { body }: RequestShapes['createSlackIntegration']
  ): Promise<ResponseShapes['createSlackIntegration']> {
    try {
      const response = await this.prisma.slackIntegration.create({
        data: body,
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.updateSlackIntegration)
  async updateSlackIntegration(
    @TsRestRequest() { body, params }: RequestShapes['updateSlackIntegration']
  ): Promise<ResponseShapes['updateSlackIntegration']> {
    try {
      const response = await this.prisma.slackIntegration.update({
        where: {
          id: params.id,
        },
        data: body,
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.fetchSlackIntegrationById)
  async fetchSlackIntegrationById(
    @TsRestRequest() { params }: RequestShapes['fetchSlackIntegrationById']
  ): Promise<ResponseShapes['fetchSlackIntegrationById']> {
    try {
      const response = await this.prisma.slackIntegration.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!response) {
        return {
          status: 404 as const,
          body: { message: 'SlackIntegration not found' },
        };
      }

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }

  @TsRest(c.deleteSlackIntegrationById)
  async deleteSlackIntegrationById(
    @TsRestRequest() { params }: RequestShapes['deleteSlackIntegrationById']
  ): Promise<ResponseShapes['deleteSlackIntegrationById']> {
    try {
      const slackIntegration = await this.prisma.slackIntegration.findUnique({
        where: {
          id: params.id,
        },
      });

      if (!slackIntegration) {
        return {
          status: 404 as const,
          body: { message: 'SlackIntegration not found' },
        };
      }

      const response = await this.prisma.slackIntegration.delete({
        where: {
          id: params.id,
        },
      });

      return { status: 200 as const, body: response };
    } catch (error) {
      this.logger.error(error);
      return { status: 400 as const, body: null };
    }
  }
}
