import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async createPost(params: Prisma.PostCreateInput) {
    const post = await this.prisma.post.create({
      data: {
        ...params,
      },
    });

    return post;
  }

  async updatePost(id: string, params: Prisma.PostUpdateInput) {
    const post = await this.prisma.post.update({
      where: { id },
      data: {
        ...params,
      },
    });

    return post;
  }
}
