import {
  PostCreateInputSchema,
  PostSchema,
  PostUpdateInputSchema,
} from '@no-code/prisma';
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
