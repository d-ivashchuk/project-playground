import { Controller, Get, Query } from '@nestjs/common';
import { apiBlog } from '@no-code/contracts';
import {
  nestControllerContract,
  NestControllerInterface,
  NestRequestShapes,
  TsRest,
  TsRestRequest,
} from '@ts-rest/nest';
import { PostService } from './post.service';
import { PrismaService } from './prisma.service';
import { prisma } from '@prisma/client';

const c = nestControllerContract(apiBlog);
type RequestShapes = NestRequestShapes<typeof c>;

// You can implement the NestControllerInterface interface to ensure type safety
@Controller()
export class PostController implements NestControllerInterface<typeof c> {
  constructor(
    private readonly postService: PostService,
    private readonly prisma: PrismaService
  ) {}

  @Get('/test')
  test(@Query() queryParams: any) {
    return { queryParams };
  }

  @TsRest(c.createPost)
  async createPost(@TsRestRequest() { body }: RequestShapes['createPost']) {
    const post = await this.postService.createPost({
      title: body.title,
      published: body.published,
      content: body.content,
      description: body.description,
      importantFieldWithoutDefault: body.importantFieldWithoutDefault,
    });

    return { status: 201 as const, body: post };
  }

  @TsRest(c.updatePost)
  async updatePost(
    @TsRestRequest() { params: { id }, body }: RequestShapes['updatePost']
  ) {
    const post = await this.postService.updatePost(id, {
      title: body.title,
      content: body.content,
      published: body.published,
      description: body.description,
    });

    return { status: 200 as const, body: post };
  }

  @TsRest(c.fetchAllPosts)
  // eslint-disable-next-line no-empty-pattern
  async fetchAllPosts(@TsRestRequest() {}: RequestShapes['fetchAllPosts']) {
    const posts = await this.prisma.post.findMany();

    return { status: 200 as const, body: posts };
  }
}
