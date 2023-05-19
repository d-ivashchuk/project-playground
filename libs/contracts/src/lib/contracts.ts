import {
  JobCreateInputSchema,
  JobSchema,
  PostCreateInputSchema,
  PostSchema,
  PostUpdateInputSchema,
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

export const apiBlog = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    responses: {
      201: PostSchema,
    },
    body: PostCreateInputSchema,
    summary: 'Create a post',
  },
  updatePost: {
    method: 'PATCH',
    path: `/posts/:id`,
    responses: { 200: PostSchema },
    body: PostUpdateInputSchema,
    summary: 'Update a post',
  },

  fetchAllPosts: {
    method: 'GET',
    path: `/posts`,
    responses: { 200: z.array(PostSchema) },
    summary: 'Fetch all posts',
  },
});

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
  fetchAllJobsByProjectId: {
    method: 'GET',
    path: '/jobs/project/:projectId',
    responses: {
      200: z.array(JobSchema),
    },
    summary: 'Fetch all jobs by project id',
  },
  fetchAllJobsByUserId: {
    method: 'GET',
    path: '/jobs/user/:userId',
    responses: {
      200: z.array(JobSchema),
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
});
