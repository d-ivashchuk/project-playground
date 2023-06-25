import {
  EmailIntegrationCreateInputSchema,
  EmailIntegrationSchema,
  EmailIntegrationUpdateInputSchema,
  JobCreateInputSchema,
  JobSchema,
  JobUpdateInputSchema,
  ProjectCreateInputSchema,
  ProjectSchema,
  ProjectUpdateInputSchema,
  RunSchema,
  SlackIntegrationCreateInputSchema,
  SlackIntegrationSchema,
  SlackIntegrationUpdateInputSchema,
} from './prisma-generated-zod';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

export interface Post {
  id: string;
  title: string;
  description: string | null;
  content: string | null;
  published: boolean;
  tags: string[];
}

const c = initContract();

export const apiJobs = c.router({
  createJob: {
    method: 'POST',
    path: '/jobs',
    responses: {
      201: JobSchema,
    },
    body: JobCreateInputSchema,
    summary: 'Create a job',
  },
  updateJob: {
    method: 'PUT',
    path: '/jobs/:id',
    responses: {
      200: JobSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: JobUpdateInputSchema,
    summary: 'Update a job',
  },
  createProject: {
    method: 'POST',
    path: '/project',
    responses: {
      201: ProjectSchema,
    },
    body: ProjectCreateInputSchema,
    summary: 'Create a project',
  },
  updateProject: {
    method: 'PUT',
    path: '/projects/:id',
    responses: {
      200: ProjectSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: ProjectUpdateInputSchema,
    summary: 'Update a job',
  },
  fetchAllJobsByProjectId: {
    method: 'GET',
    path: '/jobs/project/:projectId',
    responses: {
      200: z.array(JobSchema),
    },
    summary: 'Fetch all jobs by project id',
  },
  fetchAllProjectsByUserId: {
    method: 'GET',
    path: '/projects/user/:userId',
    responses: {
      200: z.array(ProjectSchema.extend({ jobs: z.array(JobSchema) })),
    },
    summary: 'Fetch all jobs by project id',
  },
  deleteProjectById: {
    method: 'DELETE',
    path: '/projects/:id',
    responses: {
      200: z.string(),
    },
    body: null,
    summary: 'Delete project by id',
  },
  fetchAllJobsByUserId: {
    method: 'GET',
    path: '/jobs/user/:userId',
    responses: {
      200: z.array(
        JobSchema.extend({
          emailIntegration: EmailIntegrationSchema,
          slackIntegration: SlackIntegrationSchema,
          runs: z.array(RunSchema),
        })
      ),
    },
    summary: 'Fetch all jobs by user id',
  },
  fetchTest: {
    method: 'GET',
    path: '/jobs/test',
    responses: {
      200: z.string,
    },
    summary: 'test',
  },
  deleteJobById: {
    method: 'DELETE',
    path: '/jobs/:id',
    responses: {
      200: z.string,
    },
    body: null,
    summary: 'Delete job by id',
  },
  fetchAllRunsByJobId: {
    method: 'GET',
    path: '/jobs/:id/runs',
    query: z.object({
      limit: z.string().optional(),
    }),
    responses: {
      200: z.array(
        RunSchema.extend({
          job: z.object({
            name: z.string(),
            url: z.string(),
          }),
        })
      ),
    },
    summary: 'Fetch all runs by job id',
  },
  fetchAllRunsForUser: {
    method: 'GET',
    path: '/jobs/runs/user/:userId',
    responses: {
      200: z.array(
        RunSchema.extend({
          job: z.object({
            name: z.string(),
            url: z.string(),
          }),
        })
      ),
    },
    summary: 'Fetch all runs for user',
  },
  fetchRunById: {
    method: 'GET',
    path: '/jobs/runs/:id',
    responses: {
      200: RunSchema.extend({
        job: JobSchema,
      }),
    },
    summary: 'Fetch run by id',
  },
  fetchJobById: {
    method: 'GET',
    path: '/jobs/job/:id',
    responses: {
      200: JobSchema.extend({
        emailIntegration: EmailIntegrationSchema,
        slackIntegration: SlackIntegrationSchema,
      }),
    },
    summary: 'Fetch job by id',
  },
  fetchProjectById: {
    method: 'GET',
    path: '/projects/:id',
    responses: {
      200: ProjectSchema.extend({
        jobs: z.array(
          JobSchema.extend({
            runs: z.array(RunSchema),
            slackIntegration: SlackIntegrationSchema,
            emailIntegration: EmailIntegrationSchema,
          })
        ),
      }),
    },
    summary: 'Fetch project by id',
  },
});

export const apiIntegrations = c.router({
  createEmailIntegration: {
    method: 'POST',
    path: '/integrations/email',
    responses: {
      200: EmailIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: EmailIntegrationCreateInputSchema,
    summary: 'Create an email integration',
  },
  updateEmailIntegration: {
    method: 'PUT',
    path: '/integrations/email/:id',
    responses: {
      200: EmailIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: EmailIntegrationUpdateInputSchema,
    summary: 'Update an email integration',
  },
  fetchEmailIntegrationById: {
    method: 'GET',
    path: '/integrations/email/:id',
    responses: {
      200: EmailIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
      404: z.object({
        message: z.string(),
      }),
    },
    summary: 'Fetch an email integration by id',
  },
  deleteEmailIntegrationById: {
    method: 'DELETE',
    path: '/integrations/email/:id',
    responses: {
      200: z.any(),
      400: z.any(), // this can be your ErrorSchema if you have one
      404: z.object({
        message: z.string(),
      }),
    },
    body: null,
    summary: 'Delete an email integration by id',
  },
  // Slack Integrations
  createSlackIntegration: {
    method: 'POST',
    path: '/integrations/slack',
    responses: {
      200: SlackIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: SlackIntegrationCreateInputSchema,
    summary: 'Create a slack integration',
  },
  updateSlackIntegration: {
    method: 'PUT',
    path: '/integrations/slack/:id',
    responses: {
      200: SlackIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
    },
    body: SlackIntegrationUpdateInputSchema,
    summary: 'Update a slack integration',
  },
  fetchSlackIntegrationById: {
    method: 'GET',
    path: '/integrations/slack/:id',
    responses: {
      200: SlackIntegrationSchema,
      400: z.any(), // this can be your ErrorSchema if you have one
      404: z.object({
        message: z.string(),
      }),
    },
    summary: 'Fetch a slack integration by id',
  },
  deleteSlackIntegrationById: {
    method: 'DELETE',
    path: '/integrations/slack/:id',
    responses: {
      200: z.any(),
      400: z.any(), // this can be your ErrorSchema if you have one
      404: z.object({
        message: z.string(),
      }),
    },
    body: null,
    summary: 'Delete a slack integration by id',
  },
});
