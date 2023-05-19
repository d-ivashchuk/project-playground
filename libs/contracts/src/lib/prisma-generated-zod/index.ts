import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const JobScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'schedule',
  'waitBeforeScreenshot',
  'actionBeforeScreenshot',
  'differenceThreshold',
  'createdAt',
  'updatedAt',
]);

export const JobUrlScalarFieldEnumSchema = z.enum(['jobId', 'urlId']);

export const PostScalarFieldEnumSchema = z.enum([
  'id',
  'createdAt',
  'updatedAt',
  'title',
  'content',
  'description',
  'published',
  'tags',
  'image',
  'importantFieldWithoutDefault',
]);

export const QueryModeSchema = z.enum(['default', 'insensitive']);

export const ResultScalarFieldEnumSchema = z.enum([
  'id',
  'runId',
  'url',
  'screenshotUrl',
  'diffUrl',
  'createdAt',
  'updatedAt',
]);

export const RunScalarFieldEnumSchema = z.enum([
  'id',
  'jobId',
  'status',
  'startedAt',
  'endedAt',
]);

export const SortOrderSchema = z.enum(['asc', 'desc']);

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
]);

export const UrlScalarFieldEnumSchema = z.enum([
  'id',
  'url',
  'waitBeforeScreenshot',
  'actionBeforeScreenshot',
  'differenceThreshold',
  'baselineScreenshotUrl',
]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// POST SCHEMA
/////////////////////////////////////////

export const PostSchema = z.object({
  id: z.string().cuid(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  title: z.string(),
  content: z.string().nullable(),
  description: z.string().nullable(),
  published: z.boolean(),
  tags: z.string().array(),
  image: z.string().nullable(),
  importantFieldWithoutDefault: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

/////////////////////////////////////////
// JOB SCHEMA
/////////////////////////////////////////

export const JobSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().nullable(),
  actionBeforeScreenshot: z.string().nullable(),
  differenceThreshold: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Job = z.infer<typeof JobSchema>;

/////////////////////////////////////////
// RUN SCHEMA
/////////////////////////////////////////

export const RunSchema = z.object({
  id: z.number().int(),
  jobId: z.number().int(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().nullable(),
});

export type Run = z.infer<typeof RunSchema>;

/////////////////////////////////////////
// RESULT SCHEMA
/////////////////////////////////////////

export const ResultSchema = z.object({
  id: z.number().int(),
  runId: z.number().int(),
  url: z.string(),
  screenshotUrl: z.string(),
  diffUrl: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type Result = z.infer<typeof ResultSchema>;

/////////////////////////////////////////
// URL SCHEMA
/////////////////////////////////////////

export const UrlSchema = z.object({
  id: z.number().int(),
  url: z.string(),
  waitBeforeScreenshot: z.number().int().nullable(),
  actionBeforeScreenshot: z.string().nullable(),
  differenceThreshold: z.number().nullable(),
  baselineScreenshotUrl: z.string().nullable(),
});

export type Url = z.infer<typeof UrlSchema>;

/////////////////////////////////////////
// JOB URL SCHEMA
/////////////////////////////////////////

export const JobUrlSchema = z.object({
  jobId: z.number().int(),
  urlId: z.number().int(),
});

export type JobUrl = z.infer<typeof JobUrlSchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// POST
//------------------------------------------------------

export const PostSelectSchema: z.ZodType<Prisma.PostSelect> = z
  .object({
    id: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    title: z.boolean().optional(),
    content: z.boolean().optional(),
    description: z.boolean().optional(),
    published: z.boolean().optional(),
    tags: z.boolean().optional(),
    image: z.boolean().optional(),
    importantFieldWithoutDefault: z.boolean().optional(),
  })
  .strict();

// JOB
//------------------------------------------------------

export const JobIncludeSchema: z.ZodType<Prisma.JobInclude> = z
  .object({
    runs: z
      .union([z.boolean(), z.lazy(() => RunFindManyArgsSchema)])
      .optional(),
    jobUrls: z
      .union([z.boolean(), z.lazy(() => JobUrlFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => JobCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const JobArgsSchema: z.ZodType<Prisma.JobArgs> = z
  .object({
    select: z.lazy(() => JobSelectSchema).optional(),
    include: z.lazy(() => JobIncludeSchema).optional(),
  })
  .strict();

export const JobCountOutputTypeArgsSchema: z.ZodType<Prisma.JobCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => JobCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const JobCountOutputTypeSelectSchema: z.ZodType<Prisma.JobCountOutputTypeSelect> =
  z
    .object({
      runs: z.boolean().optional(),
      jobUrls: z.boolean().optional(),
    })
    .strict();

export const JobSelectSchema: z.ZodType<Prisma.JobSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    schedule: z.boolean().optional(),
    waitBeforeScreenshot: z.boolean().optional(),
    actionBeforeScreenshot: z.boolean().optional(),
    differenceThreshold: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    runs: z
      .union([z.boolean(), z.lazy(() => RunFindManyArgsSchema)])
      .optional(),
    jobUrls: z
      .union([z.boolean(), z.lazy(() => JobUrlFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => JobCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// RUN
//------------------------------------------------------

export const RunIncludeSchema: z.ZodType<Prisma.RunInclude> = z
  .object({
    job: z.union([z.boolean(), z.lazy(() => JobArgsSchema)]).optional(),
    results: z
      .union([z.boolean(), z.lazy(() => ResultFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RunCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const RunArgsSchema: z.ZodType<Prisma.RunArgs> = z
  .object({
    select: z.lazy(() => RunSelectSchema).optional(),
    include: z.lazy(() => RunIncludeSchema).optional(),
  })
  .strict();

export const RunCountOutputTypeArgsSchema: z.ZodType<Prisma.RunCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => RunCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const RunCountOutputTypeSelectSchema: z.ZodType<Prisma.RunCountOutputTypeSelect> =
  z
    .object({
      results: z.boolean().optional(),
    })
    .strict();

export const RunSelectSchema: z.ZodType<Prisma.RunSelect> = z
  .object({
    id: z.boolean().optional(),
    jobId: z.boolean().optional(),
    status: z.boolean().optional(),
    startedAt: z.boolean().optional(),
    endedAt: z.boolean().optional(),
    job: z.union([z.boolean(), z.lazy(() => JobArgsSchema)]).optional(),
    results: z
      .union([z.boolean(), z.lazy(() => ResultFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => RunCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// RESULT
//------------------------------------------------------

export const ResultIncludeSchema: z.ZodType<Prisma.ResultInclude> = z
  .object({
    run: z.union([z.boolean(), z.lazy(() => RunArgsSchema)]).optional(),
  })
  .strict();

export const ResultArgsSchema: z.ZodType<Prisma.ResultArgs> = z
  .object({
    select: z.lazy(() => ResultSelectSchema).optional(),
    include: z.lazy(() => ResultIncludeSchema).optional(),
  })
  .strict();

export const ResultSelectSchema: z.ZodType<Prisma.ResultSelect> = z
  .object({
    id: z.boolean().optional(),
    runId: z.boolean().optional(),
    url: z.boolean().optional(),
    screenshotUrl: z.boolean().optional(),
    diffUrl: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    run: z.union([z.boolean(), z.lazy(() => RunArgsSchema)]).optional(),
  })
  .strict();

// URL
//------------------------------------------------------

export const UrlIncludeSchema: z.ZodType<Prisma.UrlInclude> = z
  .object({
    jobUrls: z
      .union([z.boolean(), z.lazy(() => JobUrlFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UrlCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const UrlArgsSchema: z.ZodType<Prisma.UrlArgs> = z
  .object({
    select: z.lazy(() => UrlSelectSchema).optional(),
    include: z.lazy(() => UrlIncludeSchema).optional(),
  })
  .strict();

export const UrlCountOutputTypeArgsSchema: z.ZodType<Prisma.UrlCountOutputTypeArgs> =
  z
    .object({
      select: z.lazy(() => UrlCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const UrlCountOutputTypeSelectSchema: z.ZodType<Prisma.UrlCountOutputTypeSelect> =
  z
    .object({
      jobUrls: z.boolean().optional(),
    })
    .strict();

export const UrlSelectSchema: z.ZodType<Prisma.UrlSelect> = z
  .object({
    id: z.boolean().optional(),
    url: z.boolean().optional(),
    waitBeforeScreenshot: z.boolean().optional(),
    actionBeforeScreenshot: z.boolean().optional(),
    differenceThreshold: z.boolean().optional(),
    baselineScreenshotUrl: z.boolean().optional(),
    jobUrls: z
      .union([z.boolean(), z.lazy(() => JobUrlFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UrlCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// JOB URL
//------------------------------------------------------

export const JobUrlIncludeSchema: z.ZodType<Prisma.JobUrlInclude> = z
  .object({
    job: z.union([z.boolean(), z.lazy(() => JobArgsSchema)]).optional(),
    url: z.union([z.boolean(), z.lazy(() => UrlArgsSchema)]).optional(),
  })
  .strict();

export const JobUrlArgsSchema: z.ZodType<Prisma.JobUrlArgs> = z
  .object({
    select: z.lazy(() => JobUrlSelectSchema).optional(),
    include: z.lazy(() => JobUrlIncludeSchema).optional(),
  })
  .strict();

export const JobUrlSelectSchema: z.ZodType<Prisma.JobUrlSelect> = z
  .object({
    jobId: z.boolean().optional(),
    urlId: z.boolean().optional(),
    job: z.union([z.boolean(), z.lazy(() => JobArgsSchema)]).optional(),
    url: z.union([z.boolean(), z.lazy(() => UrlArgsSchema)]).optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const PostWhereInputSchema: z.ZodType<Prisma.PostWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => PostWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => PostWhereInputSchema),
        z.lazy(() => PostWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    content: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    description: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    published: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    tags: z.lazy(() => StringNullableListFilterSchema).optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    importantFieldWithoutDefault: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
  })
  .strict();

export const PostOrderByWithRelationInputSchema: z.ZodType<Prisma.PostOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      importantFieldWithoutDefault: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostWhereUniqueInputSchema: z.ZodType<Prisma.PostWhereUniqueInput> =
  z
    .object({
      id: z.string().cuid().optional(),
    })
    .strict();

export const PostOrderByWithAggregationInputSchema: z.ZodType<Prisma.PostOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      importantFieldWithoutDefault: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => PostCountOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => PostMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => PostMinOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const PostScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.PostScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => PostScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema),
          z.lazy(() => PostScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      title: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      content: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      published: z
        .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
        .optional(),
      tags: z.lazy(() => StringNullableListFilterSchema).optional(),
      image: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      importantFieldWithoutDefault: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const JobWhereInputSchema: z.ZodType<Prisma.JobWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => JobWhereInputSchema),
        z.lazy(() => JobWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => JobWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => JobWhereInputSchema),
        z.lazy(() => JobWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    schedule: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    waitBeforeScreenshot: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    actionBeforeScreenshot: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    differenceThreshold: z
      .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    runs: z.lazy(() => RunListRelationFilterSchema).optional(),
    jobUrls: z.lazy(() => JobUrlListRelationFilterSchema).optional(),
  })
  .strict();

export const JobOrderByWithRelationInputSchema: z.ZodType<Prisma.JobOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      schedule: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      runs: z.lazy(() => RunOrderByRelationAggregateInputSchema).optional(),
      jobUrls: z
        .lazy(() => JobUrlOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const JobWhereUniqueInputSchema: z.ZodType<Prisma.JobWhereUniqueInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export const JobOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      schedule: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => JobCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => JobAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => JobMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => JobMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => JobSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const JobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => JobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => JobScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => JobScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      schedule: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const RunWhereInputSchema: z.ZodType<Prisma.RunWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => RunWhereInputSchema),
        z.lazy(() => RunWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => RunWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => RunWhereInputSchema),
        z.lazy(() => RunWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    jobId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    status: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    startedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    endedAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    job: z
      .union([
        z.lazy(() => JobRelationFilterSchema),
        z.lazy(() => JobWhereInputSchema),
      ])
      .optional(),
    results: z.lazy(() => ResultListRelationFilterSchema).optional(),
  })
  .strict();

export const RunOrderByWithRelationInputSchema: z.ZodType<Prisma.RunOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      job: z.lazy(() => JobOrderByWithRelationInputSchema).optional(),
      results: z
        .lazy(() => ResultOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const RunWhereUniqueInputSchema: z.ZodType<Prisma.RunWhereUniqueInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export const RunOrderByWithAggregationInputSchema: z.ZodType<Prisma.RunOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => RunCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => RunAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => RunMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => RunMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => RunSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const RunScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RunScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RunScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RunScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RunScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RunScalarWhereWithAggregatesInputSchema),
          z.lazy(() => RunScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      jobId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      status: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      startedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      endedAt: z
        .union([
          z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ResultWhereInputSchema: z.ZodType<Prisma.ResultWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => ResultWhereInputSchema),
        z.lazy(() => ResultWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ResultWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ResultWhereInputSchema),
        z.lazy(() => ResultWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    runId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    screenshotUrl: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    diffUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    run: z
      .union([
        z.lazy(() => RunRelationFilterSchema),
        z.lazy(() => RunWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const ResultOrderByWithRelationInputSchema: z.ZodType<Prisma.ResultOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      diffUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      run: z.lazy(() => RunOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const ResultWhereUniqueInputSchema: z.ZodType<Prisma.ResultWhereUniqueInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export const ResultOrderByWithAggregationInputSchema: z.ZodType<Prisma.ResultOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      diffUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => ResultCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => ResultAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => ResultMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => ResultMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => ResultSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const ResultScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ResultScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ResultScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ResultScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ResultScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ResultScalarWhereWithAggregatesInputSchema),
          z.lazy(() => ResultScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      runId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      url: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      screenshotUrl: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      diffUrl: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const UrlWhereInputSchema: z.ZodType<Prisma.UrlWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => UrlWhereInputSchema),
        z.lazy(() => UrlWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UrlWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UrlWhereInputSchema),
        z.lazy(() => UrlWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    waitBeforeScreenshot: z
      .union([z.lazy(() => IntNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    actionBeforeScreenshot: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    differenceThreshold: z
      .union([z.lazy(() => FloatNullableFilterSchema), z.number()])
      .optional()
      .nullable(),
    baselineScreenshotUrl: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    jobUrls: z.lazy(() => JobUrlListRelationFilterSchema).optional(),
  })
  .strict();

export const UrlOrderByWithRelationInputSchema: z.ZodType<Prisma.UrlOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      baselineScreenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      jobUrls: z
        .lazy(() => JobUrlOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const UrlWhereUniqueInputSchema: z.ZodType<Prisma.UrlWhereUniqueInput> =
  z
    .object({
      id: z.number().int().optional(),
    })
    .strict();

export const UrlOrderByWithAggregationInputSchema: z.ZodType<Prisma.UrlOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      baselineScreenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => UrlCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => UrlAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => UrlMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => UrlMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => UrlSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const UrlScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UrlScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => UrlScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UrlScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => UrlScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => UrlScalarWhereWithAggregatesInputSchema),
          z.lazy(() => UrlScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      url: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.lazy(() => IntNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.lazy(() => FloatNullableWithAggregatesFilterSchema),
          z.number(),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.lazy(() => StringNullableWithAggregatesFilterSchema),
          z.string(),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JobUrlWhereInputSchema: z.ZodType<Prisma.JobUrlWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => JobUrlWhereInputSchema),
        z.lazy(() => JobUrlWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => JobUrlWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => JobUrlWhereInputSchema),
        z.lazy(() => JobUrlWhereInputSchema).array(),
      ])
      .optional(),
    jobId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    urlId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    job: z
      .union([
        z.lazy(() => JobRelationFilterSchema),
        z.lazy(() => JobWhereInputSchema),
      ])
      .optional(),
    url: z
      .union([
        z.lazy(() => UrlRelationFilterSchema),
        z.lazy(() => UrlWhereInputSchema),
      ])
      .optional(),
  })
  .strict();

export const JobUrlOrderByWithRelationInputSchema: z.ZodType<Prisma.JobUrlOrderByWithRelationInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
      job: z.lazy(() => JobOrderByWithRelationInputSchema).optional(),
      url: z.lazy(() => UrlOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const JobUrlWhereUniqueInputSchema: z.ZodType<Prisma.JobUrlWhereUniqueInput> =
  z
    .object({
      jobId_urlId: z
        .lazy(() => JobUrlJobIdUrlIdCompoundUniqueInputSchema)
        .optional(),
    })
    .strict();

export const JobUrlOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobUrlOrderByWithAggregationInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => JobUrlCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => JobUrlAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => JobUrlMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => JobUrlMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => JobUrlSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const JobUrlScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobUrlScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => JobUrlScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JobUrlScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => JobUrlScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => JobUrlScalarWhereWithAggregatesInputSchema),
          z.lazy(() => JobUrlScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      jobId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      urlId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const PostCreateInputSchema: z.ZodType<Prisma.PostCreateInput> = z
  .object({
    id: z.string().cuid().optional(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    title: z.string(),
    content: z.string().optional().nullable(),
    description: z.string().optional().nullable(),
    published: z.boolean().optional(),
    tags: z
      .union([z.lazy(() => PostCreatetagsInputSchema), z.string().array()])
      .optional(),
    image: z.string().optional().nullable(),
    importantFieldWithoutDefault: z.string(),
  })
  .strict();

export const PostUncheckedCreateInputSchema: z.ZodType<Prisma.PostUncheckedCreateInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      title: z.string(),
      content: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      published: z.boolean().optional(),
      tags: z
        .union([z.lazy(() => PostCreatetagsInputSchema), z.string().array()])
        .optional(),
      image: z.string().optional().nullable(),
      importantFieldWithoutDefault: z.string(),
    })
    .strict();

export const PostUpdateInputSchema: z.ZodType<Prisma.PostUpdateInput> = z
  .object({
    id: z
      .union([
        z.string().cuid(),
        z.lazy(() => StringFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    description: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    published: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    tags: z
      .union([z.lazy(() => PostUpdatetagsInputSchema), z.string().array()])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    importantFieldWithoutDefault: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })
  .strict();

export const PostUncheckedUpdateInputSchema: z.ZodType<Prisma.PostUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tags: z
        .union([z.lazy(() => PostUpdatetagsInputSchema), z.string().array()])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      importantFieldWithoutDefault: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostCreateManyInputSchema: z.ZodType<Prisma.PostCreateManyInput> =
  z
    .object({
      id: z.string().cuid().optional(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      title: z.string(),
      content: z.string().optional().nullable(),
      description: z.string().optional().nullable(),
      published: z.boolean().optional(),
      tags: z
        .union([z.lazy(() => PostCreatetagsInputSchema), z.string().array()])
        .optional(),
      image: z.string().optional().nullable(),
      importantFieldWithoutDefault: z.string(),
    })
    .strict();

export const PostUpdateManyMutationInputSchema: z.ZodType<Prisma.PostUpdateManyMutationInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tags: z
        .union([z.lazy(() => PostUpdatetagsInputSchema), z.string().array()])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      importantFieldWithoutDefault: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const PostUncheckedUpdateManyInputSchema: z.ZodType<Prisma.PostUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.string().cuid(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      title: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      content: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      description: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      published: z
        .union([
          z.boolean(),
          z.lazy(() => BoolFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tags: z
        .union([z.lazy(() => PostUpdatetagsInputSchema), z.string().array()])
        .optional(),
      image: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      importantFieldWithoutDefault: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobCreateInputSchema: z.ZodType<Prisma.JobCreateInput> = z
  .object({
    name: z.string(),
    schedule: z.string(),
    waitBeforeScreenshot: z.number().int().optional().nullable(),
    actionBeforeScreenshot: z.string().optional().nullable(),
    differenceThreshold: z.number().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    runs: z.lazy(() => RunCreateNestedManyWithoutJobInputSchema).optional(),
    jobUrls: z
      .lazy(() => JobUrlCreateNestedManyWithoutJobInputSchema)
      .optional(),
  })
  .strict();

export const JobUncheckedCreateInputSchema: z.ZodType<Prisma.JobUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      schedule: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      runs: z
        .lazy(() => RunUncheckedCreateNestedManyWithoutJobInputSchema)
        .optional(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedCreateNestedManyWithoutJobInputSchema)
        .optional(),
    })
    .strict();

export const JobUpdateInputSchema: z.ZodType<Prisma.JobUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    schedule: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    waitBeforeScreenshot: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    actionBeforeScreenshot: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    differenceThreshold: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    runs: z.lazy(() => RunUpdateManyWithoutJobNestedInputSchema).optional(),
    jobUrls: z
      .lazy(() => JobUrlUpdateManyWithoutJobNestedInputSchema)
      .optional(),
  })
  .strict();

export const JobUncheckedUpdateInputSchema: z.ZodType<Prisma.JobUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      runs: z
        .lazy(() => RunUncheckedUpdateManyWithoutJobNestedInputSchema)
        .optional(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedUpdateManyWithoutJobNestedInputSchema)
        .optional(),
    })
    .strict();

export const JobCreateManyInputSchema: z.ZodType<Prisma.JobCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    name: z.string(),
    schedule: z.string(),
    waitBeforeScreenshot: z.number().int().optional().nullable(),
    actionBeforeScreenshot: z.string().optional().nullable(),
    differenceThreshold: z.number().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })
  .strict();

export const JobUpdateManyMutationInputSchema: z.ZodType<Prisma.JobUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const RunCreateInputSchema: z.ZodType<Prisma.RunCreateInput> = z
  .object({
    status: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().optional().nullable(),
    job: z.lazy(() => JobCreateNestedOneWithoutRunsInputSchema),
    results: z
      .lazy(() => ResultCreateNestedManyWithoutRunInputSchema)
      .optional(),
  })
  .strict();

export const RunUncheckedCreateInputSchema: z.ZodType<Prisma.RunUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      jobId: z.number().int(),
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
      results: z
        .lazy(() => ResultUncheckedCreateNestedManyWithoutRunInputSchema)
        .optional(),
    })
    .strict();

export const RunUpdateInputSchema: z.ZodType<Prisma.RunUpdateInput> = z
  .object({
    status: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    startedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    endedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    job: z
      .lazy(() => JobUpdateOneRequiredWithoutRunsNestedInputSchema)
      .optional(),
    results: z
      .lazy(() => ResultUpdateManyWithoutRunNestedInputSchema)
      .optional(),
  })
  .strict();

export const RunUncheckedUpdateInputSchema: z.ZodType<Prisma.RunUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      results: z
        .lazy(() => ResultUncheckedUpdateManyWithoutRunNestedInputSchema)
        .optional(),
    })
    .strict();

export const RunCreateManyInputSchema: z.ZodType<Prisma.RunCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    jobId: z.number().int(),
    status: z.string(),
    startedAt: z.coerce.date(),
    endedAt: z.coerce.date().optional().nullable(),
  })
  .strict();

export const RunUpdateManyMutationInputSchema: z.ZodType<Prisma.RunUpdateManyMutationInput> =
  z
    .object({
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RunUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const ResultCreateInputSchema: z.ZodType<Prisma.ResultCreateInput> = z
  .object({
    url: z.string(),
    screenshotUrl: z.string(),
    diffUrl: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    run: z.lazy(() => RunCreateNestedOneWithoutResultsInputSchema),
  })
  .strict();

export const ResultUncheckedCreateInputSchema: z.ZodType<Prisma.ResultUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      runId: z.number().int(),
      url: z.string(),
      screenshotUrl: z.string(),
      diffUrl: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ResultUpdateInputSchema: z.ZodType<Prisma.ResultUpdateInput> = z
  .object({
    url: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    screenshotUrl: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    diffUrl: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    run: z
      .lazy(() => RunUpdateOneRequiredWithoutResultsNestedInputSchema)
      .optional(),
  })
  .strict();

export const ResultUncheckedUpdateInputSchema: z.ZodType<Prisma.ResultUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      runId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultCreateManyInputSchema: z.ZodType<Prisma.ResultCreateManyInput> =
  z
    .object({
      id: z.number().int().optional(),
      runId: z.number().int(),
      url: z.string(),
      screenshotUrl: z.string(),
      diffUrl: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ResultUpdateManyMutationInputSchema: z.ZodType<Prisma.ResultUpdateManyMutationInput> =
  z
    .object({
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ResultUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      runId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UrlCreateInputSchema: z.ZodType<Prisma.UrlCreateInput> = z
  .object({
    url: z.string(),
    waitBeforeScreenshot: z.number().int().optional().nullable(),
    actionBeforeScreenshot: z.string().optional().nullable(),
    differenceThreshold: z.number().optional().nullable(),
    baselineScreenshotUrl: z.string().optional().nullable(),
    jobUrls: z
      .lazy(() => JobUrlCreateNestedManyWithoutUrlInputSchema)
      .optional(),
  })
  .strict();

export const UrlUncheckedCreateInputSchema: z.ZodType<Prisma.UrlUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      url: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      baselineScreenshotUrl: z.string().optional().nullable(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedCreateNestedManyWithoutUrlInputSchema)
        .optional(),
    })
    .strict();

export const UrlUpdateInputSchema: z.ZodType<Prisma.UrlUpdateInput> = z
  .object({
    url: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    waitBeforeScreenshot: z
      .union([
        z.number().int(),
        z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    actionBeforeScreenshot: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    differenceThreshold: z
      .union([
        z.number(),
        z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    baselineScreenshotUrl: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    jobUrls: z
      .lazy(() => JobUrlUpdateManyWithoutUrlNestedInputSchema)
      .optional(),
  })
  .strict();

export const UrlUncheckedUpdateInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedUpdateManyWithoutUrlNestedInputSchema)
        .optional(),
    })
    .strict();

export const UrlCreateManyInputSchema: z.ZodType<Prisma.UrlCreateManyInput> = z
  .object({
    id: z.number().int().optional(),
    url: z.string(),
    waitBeforeScreenshot: z.number().int().optional().nullable(),
    actionBeforeScreenshot: z.string().optional().nullable(),
    differenceThreshold: z.number().optional().nullable(),
    baselineScreenshotUrl: z.string().optional().nullable(),
  })
  .strict();

export const UrlUpdateManyMutationInputSchema: z.ZodType<Prisma.UrlUpdateManyMutationInput> =
  z
    .object({
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UrlUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JobUrlCreateInputSchema: z.ZodType<Prisma.JobUrlCreateInput> = z
  .object({
    job: z.lazy(() => JobCreateNestedOneWithoutJobUrlsInputSchema),
    url: z.lazy(() => UrlCreateNestedOneWithoutJobUrlsInputSchema),
  })
  .strict();

export const JobUrlUncheckedCreateInputSchema: z.ZodType<Prisma.JobUrlUncheckedCreateInput> =
  z
    .object({
      jobId: z.number().int(),
      urlId: z.number().int(),
    })
    .strict();

export const JobUrlUpdateInputSchema: z.ZodType<Prisma.JobUrlUpdateInput> = z
  .object({
    job: z
      .lazy(() => JobUpdateOneRequiredWithoutJobUrlsNestedInputSchema)
      .optional(),
    url: z
      .lazy(() => UrlUpdateOneRequiredWithoutJobUrlsNestedInputSchema)
      .optional(),
  })
  .strict();

export const JobUrlUncheckedUpdateInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateInput> =
  z
    .object({
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      urlId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobUrlCreateManyInputSchema: z.ZodType<Prisma.JobUrlCreateManyInput> =
  z
    .object({
      jobId: z.number().int(),
      urlId: z.number().int(),
    })
    .strict();

export const JobUrlUpdateManyMutationInputSchema: z.ZodType<Prisma.JobUrlUpdateManyMutationInput> =
  z.object({}).strict();

export const JobUrlUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateManyInput> =
  z
    .object({
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      urlId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.union([z.string().array(), z.string()]).optional(),
    notIn: z.union([z.string().array(), z.string()]).optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
    notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.union([z.string().array(), z.string()]).optional().nullable(),
      notIn: z.union([z.string().array(), z.string()]).optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const StringNullableListFilterSchema: z.ZodType<Prisma.StringNullableListFilter> =
  z
    .object({
      equals: z.string().array().optional().nullable(),
      has: z.string().optional().nullable(),
      hasEvery: z.string().array().optional(),
      hasSome: z.string().array().optional(),
      isEmpty: z.boolean().optional(),
    })
    .strict();

export const PostCountOrderByAggregateInputSchema: z.ZodType<Prisma.PostCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      tags: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      importantFieldWithoutDefault: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMaxOrderByAggregateInputSchema: z.ZodType<Prisma.PostMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      importantFieldWithoutDefault: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostMinOrderByAggregateInputSchema: z.ZodType<Prisma.PostMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      title: z.lazy(() => SortOrderSchema).optional(),
      content: z.lazy(() => SortOrderSchema).optional(),
      description: z.lazy(() => SortOrderSchema).optional(),
      published: z.lazy(() => SortOrderSchema).optional(),
      image: z.lazy(() => SortOrderSchema).optional(),
      importantFieldWithoutDefault: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.union([z.string().array(), z.string()]).optional(),
      notIn: z.union([z.string().array(), z.string()]).optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.union([z.string().array(), z.string()]).optional().nullable(),
      notIn: z.union([z.string().array(), z.string()]).optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      mode: z.lazy(() => QueryModeSchema).optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.union([z.number().array(), z.number()]).optional(),
    notIn: z.union([z.number().array(), z.number()]).optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z
  .object({
    equals: z.number().optional().nullable(),
    in: z.union([z.number().array(), z.number()]).optional().nullable(),
    notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })
  .strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const RunListRelationFilterSchema: z.ZodType<Prisma.RunListRelationFilter> =
  z
    .object({
      every: z.lazy(() => RunWhereInputSchema).optional(),
      some: z.lazy(() => RunWhereInputSchema).optional(),
      none: z.lazy(() => RunWhereInputSchema).optional(),
    })
    .strict();

export const JobUrlListRelationFilterSchema: z.ZodType<Prisma.JobUrlListRelationFilter> =
  z
    .object({
      every: z.lazy(() => JobUrlWhereInputSchema).optional(),
      some: z.lazy(() => JobUrlWhereInputSchema).optional(),
      none: z.lazy(() => JobUrlWhereInputSchema).optional(),
    })
    .strict();

export const RunOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RunOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobUrlOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobUrlOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      schedule: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      schedule: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      schedule: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.union([z.number().array(), z.number()]).optional(),
      notIn: z.union([z.number().array(), z.number()]).optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    })
    .strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      notIn: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JobRelationFilterSchema: z.ZodType<Prisma.JobRelationFilter> = z
  .object({
    is: z.lazy(() => JobWhereInputSchema).optional(),
    isNot: z.lazy(() => JobWhereInputSchema).optional(),
  })
  .strict();

export const ResultListRelationFilterSchema: z.ZodType<Prisma.ResultListRelationFilter> =
  z
    .object({
      every: z.lazy(() => ResultWhereInputSchema).optional(),
      some: z.lazy(() => ResultWhereInputSchema).optional(),
      none: z.lazy(() => ResultWhereInputSchema).optional(),
    })
    .strict();

export const ResultOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ResultOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RunCountOrderByAggregateInputSchema: z.ZodType<Prisma.RunCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RunAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RunAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RunMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RunMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RunMinOrderByAggregateInputSchema: z.ZodType<Prisma.RunMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
      status: z.lazy(() => SortOrderSchema).optional(),
      startedAt: z.lazy(() => SortOrderSchema).optional(),
      endedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const RunSumOrderByAggregateInputSchema: z.ZodType<Prisma.RunSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      jobId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      notIn: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const RunRelationFilterSchema: z.ZodType<Prisma.RunRelationFilter> = z
  .object({
    is: z.lazy(() => RunWhereInputSchema).optional(),
    isNot: z.lazy(() => RunWhereInputSchema).optional(),
  })
  .strict();

export const ResultCountOrderByAggregateInputSchema: z.ZodType<Prisma.ResultCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      diffUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ResultAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ResultAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ResultMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ResultMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      diffUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ResultMinOrderByAggregateInputSchema: z.ZodType<Prisma.ResultMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
      diffUrl: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const ResultSumOrderByAggregateInputSchema: z.ZodType<Prisma.ResultSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      runId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlCountOrderByAggregateInputSchema: z.ZodType<Prisma.UrlCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      baselineScreenshotUrl: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UrlAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UrlMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      baselineScreenshotUrl: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlMinOrderByAggregateInputSchema: z.ZodType<Prisma.UrlMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      url: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
      baselineScreenshotUrl: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlSumOrderByAggregateInputSchema: z.ZodType<Prisma.UrlSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
      differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const UrlRelationFilterSchema: z.ZodType<Prisma.UrlRelationFilter> = z
  .object({
    is: z.lazy(() => UrlWhereInputSchema).optional(),
    isNot: z.lazy(() => UrlWhereInputSchema).optional(),
  })
  .strict();

export const JobUrlJobIdUrlIdCompoundUniqueInputSchema: z.ZodType<Prisma.JobUrlJobIdUrlIdCompoundUniqueInput> =
  z
    .object({
      jobId: z.number(),
      urlId: z.number(),
    })
    .strict();

export const JobUrlCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobUrlCountOrderByAggregateInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobUrlAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobUrlAvgOrderByAggregateInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobUrlMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobUrlMaxOrderByAggregateInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobUrlMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobUrlMinOrderByAggregateInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const JobUrlSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobUrlSumOrderByAggregateInput> =
  z
    .object({
      jobId: z.lazy(() => SortOrderSchema).optional(),
      urlId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const PostCreatetagsInputSchema: z.ZodType<Prisma.PostCreatetagsInput> =
  z
    .object({
      set: z.string().array(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional().nullable(),
    })
    .strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z
    .object({
      set: z.boolean().optional(),
    })
    .strict();

export const PostUpdatetagsInputSchema: z.ZodType<Prisma.PostUpdatetagsInput> =
  z
    .object({
      set: z.string().array().optional(),
      push: z.union([z.string(), z.string().array()]).optional(),
    })
    .strict();

export const RunCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.RunCreateNestedManyWithoutJobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutJobInputSchema),
          z.lazy(() => RunCreateWithoutJobInputSchema).array(),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.JobUrlCreateNestedManyWithoutJobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateWithoutJobInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyJobInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RunUncheckedCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedCreateNestedManyWithoutJobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutJobInputSchema),
          z.lazy(() => RunCreateWithoutJobInputSchema).array(),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUncheckedCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUncheckedCreateNestedManyWithoutJobInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateWithoutJobInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyJobInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional().nullable(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const RunUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.RunUpdateManyWithoutJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutJobInputSchema),
          z.lazy(() => RunCreateWithoutJobInputSchema).array(),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema),
          z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema),
          z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema),
          z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RunScalarWhereInputSchema),
          z.lazy(() => RunScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.JobUrlUpdateManyWithoutJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateWithoutJobInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JobUrlUpsertWithWhereUniqueWithoutJobInputSchema),
          z
            .lazy(() => JobUrlUpsertWithWhereUniqueWithoutJobInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyJobInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JobUrlUpdateWithWhereUniqueWithoutJobInputSchema),
          z
            .lazy(() => JobUrlUpdateWithWhereUniqueWithoutJobInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutJobInputSchema),
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutJobInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const RunUncheckedUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyWithoutJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutJobInputSchema),
          z.lazy(() => RunCreateWithoutJobInputSchema).array(),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema),
          z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema).array(),
        ])
        .optional(),
      createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
      set: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => RunWhereUniqueInputSchema),
          z.lazy(() => RunWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema),
          z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema).array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema),
          z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => RunScalarWhereInputSchema),
          z.lazy(() => RunScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUncheckedUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateManyWithoutJobNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateWithoutJobInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutJobInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JobUrlUpsertWithWhereUniqueWithoutJobInputSchema),
          z
            .lazy(() => JobUrlUpsertWithWhereUniqueWithoutJobInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyJobInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JobUrlUpdateWithWhereUniqueWithoutJobInputSchema),
          z
            .lazy(() => JobUrlUpdateWithWhereUniqueWithoutJobInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutJobInputSchema),
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutJobInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobCreateNestedOneWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateNestedOneWithoutRunsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobCreateWithoutRunsInputSchema),
          z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => JobCreateOrConnectWithoutRunsInputSchema)
        .optional(),
      connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
    })
    .strict();

export const ResultCreateNestedManyWithoutRunInputSchema: z.ZodType<Prisma.ResultCreateNestedManyWithoutRunInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ResultCreateWithoutRunInputSchema),
          z.lazy(() => ResultCreateWithoutRunInputSchema).array(),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema),
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ResultCreateManyRunInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ResultUncheckedCreateNestedManyWithoutRunInputSchema: z.ZodType<Prisma.ResultUncheckedCreateNestedManyWithoutRunInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ResultCreateWithoutRunInputSchema),
          z.lazy(() => ResultCreateWithoutRunInputSchema).array(),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema),
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ResultCreateManyRunInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional().nullable(),
    })
    .strict();

export const JobUpdateOneRequiredWithoutRunsNestedInputSchema: z.ZodType<Prisma.JobUpdateOneRequiredWithoutRunsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobCreateWithoutRunsInputSchema),
          z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => JobCreateOrConnectWithoutRunsInputSchema)
        .optional(),
      upsert: z.lazy(() => JobUpsertWithoutRunsInputSchema).optional(),
      connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => JobUpdateWithoutRunsInputSchema),
          z.lazy(() => JobUncheckedUpdateWithoutRunsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultUpdateManyWithoutRunNestedInputSchema: z.ZodType<Prisma.ResultUpdateManyWithoutRunNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ResultCreateWithoutRunInputSchema),
          z.lazy(() => ResultCreateWithoutRunInputSchema).array(),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema),
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ResultUpsertWithWhereUniqueWithoutRunInputSchema),
          z
            .lazy(() => ResultUpsertWithWhereUniqueWithoutRunInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ResultCreateManyRunInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ResultUpdateWithWhereUniqueWithoutRunInputSchema),
          z
            .lazy(() => ResultUpdateWithWhereUniqueWithoutRunInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ResultUpdateManyWithWhereWithoutRunInputSchema),
          z.lazy(() => ResultUpdateManyWithWhereWithoutRunInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ResultScalarWhereInputSchema),
          z.lazy(() => ResultScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const ResultUncheckedUpdateManyWithoutRunNestedInputSchema: z.ZodType<Prisma.ResultUncheckedUpdateManyWithoutRunNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => ResultCreateWithoutRunInputSchema),
          z.lazy(() => ResultCreateWithoutRunInputSchema).array(),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
          z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema),
          z.lazy(() => ResultCreateOrConnectWithoutRunInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => ResultUpsertWithWhereUniqueWithoutRunInputSchema),
          z
            .lazy(() => ResultUpsertWithWhereUniqueWithoutRunInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => ResultCreateManyRunInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => ResultWhereUniqueInputSchema),
          z.lazy(() => ResultWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => ResultUpdateWithWhereUniqueWithoutRunInputSchema),
          z
            .lazy(() => ResultUpdateWithWhereUniqueWithoutRunInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => ResultUpdateManyWithWhereWithoutRunInputSchema),
          z.lazy(() => ResultUpdateManyWithWhereWithoutRunInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => ResultScalarWhereInputSchema),
          z.lazy(() => ResultScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const RunCreateNestedOneWithoutResultsInputSchema: z.ZodType<Prisma.RunCreateNestedOneWithoutResultsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutResultsInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutResultsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RunCreateOrConnectWithoutResultsInputSchema)
        .optional(),
      connect: z.lazy(() => RunWhereUniqueInputSchema).optional(),
    })
    .strict();

export const RunUpdateOneRequiredWithoutResultsNestedInputSchema: z.ZodType<Prisma.RunUpdateOneRequiredWithoutResultsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => RunCreateWithoutResultsInputSchema),
          z.lazy(() => RunUncheckedCreateWithoutResultsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => RunCreateOrConnectWithoutResultsInputSchema)
        .optional(),
      upsert: z.lazy(() => RunUpsertWithoutResultsInputSchema).optional(),
      connect: z.lazy(() => RunWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => RunUpdateWithoutResultsInputSchema),
          z.lazy(() => RunUncheckedUpdateWithoutResultsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobUrlCreateNestedManyWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlCreateNestedManyWithoutUrlInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyUrlInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUncheckedCreateNestedManyWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUncheckedCreateNestedManyWithoutUrlInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema).array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyUrlInputEnvelopeSchema)
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUpdateManyWithoutUrlNestedInputSchema: z.ZodType<Prisma.JobUrlUpdateManyWithoutUrlNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JobUrlUpsertWithWhereUniqueWithoutUrlInputSchema),
          z
            .lazy(() => JobUrlUpsertWithWhereUniqueWithoutUrlInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyUrlInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JobUrlUpdateWithWhereUniqueWithoutUrlInputSchema),
          z
            .lazy(() => JobUrlUpdateWithWhereUniqueWithoutUrlInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutUrlInputSchema),
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutUrlInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUncheckedUpdateManyWithoutUrlNestedInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateManyWithoutUrlNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateWithoutUrlInputSchema).array(),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
          z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema),
          z.lazy(() => JobUrlCreateOrConnectWithoutUrlInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => JobUrlUpsertWithWhereUniqueWithoutUrlInputSchema),
          z
            .lazy(() => JobUrlUpsertWithWhereUniqueWithoutUrlInputSchema)
            .array(),
        ])
        .optional(),
      createMany: z
        .lazy(() => JobUrlCreateManyUrlInputEnvelopeSchema)
        .optional(),
      set: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => JobUrlWhereUniqueInputSchema),
          z.lazy(() => JobUrlWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => JobUrlUpdateWithWhereUniqueWithoutUrlInputSchema),
          z
            .lazy(() => JobUrlUpdateWithWhereUniqueWithoutUrlInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutUrlInputSchema),
          z.lazy(() => JobUrlUpdateManyWithWhereWithoutUrlInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const JobCreateNestedOneWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobCreateNestedOneWithoutJobUrlsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobCreateWithoutJobUrlsInputSchema),
          z.lazy(() => JobUncheckedCreateWithoutJobUrlsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => JobCreateOrConnectWithoutJobUrlsInputSchema)
        .optional(),
      connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
    })
    .strict();

export const UrlCreateNestedOneWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlCreateNestedOneWithoutJobUrlsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UrlCreateWithoutJobUrlsInputSchema),
          z.lazy(() => UrlUncheckedCreateWithoutJobUrlsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UrlCreateOrConnectWithoutJobUrlsInputSchema)
        .optional(),
      connect: z.lazy(() => UrlWhereUniqueInputSchema).optional(),
    })
    .strict();

export const JobUpdateOneRequiredWithoutJobUrlsNestedInputSchema: z.ZodType<Prisma.JobUpdateOneRequiredWithoutJobUrlsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => JobCreateWithoutJobUrlsInputSchema),
          z.lazy(() => JobUncheckedCreateWithoutJobUrlsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => JobCreateOrConnectWithoutJobUrlsInputSchema)
        .optional(),
      upsert: z.lazy(() => JobUpsertWithoutJobUrlsInputSchema).optional(),
      connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => JobUpdateWithoutJobUrlsInputSchema),
          z.lazy(() => JobUncheckedUpdateWithoutJobUrlsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const UrlUpdateOneRequiredWithoutJobUrlsNestedInputSchema: z.ZodType<Prisma.UrlUpdateOneRequiredWithoutJobUrlsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => UrlCreateWithoutJobUrlsInputSchema),
          z.lazy(() => UrlUncheckedCreateWithoutJobUrlsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => UrlCreateOrConnectWithoutJobUrlsInputSchema)
        .optional(),
      upsert: z.lazy(() => UrlUpsertWithoutJobUrlsInputSchema).optional(),
      connect: z.lazy(() => UrlWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => UrlUpdateWithoutJobUrlsInputSchema),
          z.lazy(() => UrlUncheckedUpdateWithoutJobUrlsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.union([z.string().array(), z.string()]).optional(),
    notIn: z.union([z.string().array(), z.string()]).optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.union([z.string().array(), z.string()]).optional().nullable(),
      notIn: z.union([z.string().array(), z.string()]).optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z
  .object({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.union([z.string().array(), z.string()]).optional(),
      notIn: z.union([z.string().array(), z.string()]).optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.union([z.number().array(), z.number()]).optional(),
    notIn: z.union([z.number().array(), z.number()]).optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      notIn: z.union([z.coerce.date().array(), z.coerce.date()]).optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional().nullable(),
      in: z.union([z.string().array(), z.string()]).optional().nullable(),
      notIn: z.union([z.string().array(), z.string()]).optional().nullable(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    })
    .strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z
    .object({
      equals: z.boolean().optional(),
      not: z
        .union([
          z.boolean(),
          z.lazy(() => NestedBoolWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedBoolFilterSchema).optional(),
      _max: z.lazy(() => NestedBoolFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedFloatNullableFilterSchema)])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.union([z.number().array(), z.number()]).optional(),
      notIn: z.union([z.number().array(), z.number()]).optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.union([z.number().array(), z.number()]).optional(),
    notIn: z.union([z.number().array(), z.number()]).optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedIntNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    })
    .strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional().nullable(),
      in: z.union([z.number().array(), z.number()]).optional().nullable(),
      notIn: z.union([z.number().array(), z.number()]).optional().nullable(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
    })
    .strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      notIn: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableFilterSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional().nullable(),
      in: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      notIn: z
        .union([z.coerce.date().array(), z.coerce.date()])
        .optional()
        .nullable(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
        ])
        .optional()
        .nullable(),
      _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    })
    .strict();

export const RunCreateWithoutJobInputSchema: z.ZodType<Prisma.RunCreateWithoutJobInput> =
  z
    .object({
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
      results: z
        .lazy(() => ResultCreateNestedManyWithoutRunInputSchema)
        .optional(),
    })
    .strict();

export const RunUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedCreateWithoutJobInput> =
  z
    .object({
      id: z.number().int().optional(),
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
      results: z
        .lazy(() => ResultUncheckedCreateNestedManyWithoutRunInputSchema)
        .optional(),
    })
    .strict();

export const RunCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.RunCreateOrConnectWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => RunWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RunCreateWithoutJobInputSchema),
        z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const RunCreateManyJobInputEnvelopeSchema: z.ZodType<Prisma.RunCreateManyJobInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => RunCreateManyJobInputSchema),
        z.lazy(() => RunCreateManyJobInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JobUrlCreateWithoutJobInputSchema: z.ZodType<Prisma.JobUrlCreateWithoutJobInput> =
  z
    .object({
      url: z.lazy(() => UrlCreateNestedOneWithoutJobUrlsInputSchema),
    })
    .strict();

export const JobUrlUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUncheckedCreateWithoutJobInput> =
  z
    .object({
      urlId: z.number().int(),
    })
    .strict();

export const JobUrlCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.JobUrlCreateOrConnectWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => JobUrlCreateWithoutJobInputSchema),
        z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const JobUrlCreateManyJobInputEnvelopeSchema: z.ZodType<Prisma.JobUrlCreateManyJobInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => JobUrlCreateManyJobInputSchema),
        z.lazy(() => JobUrlCreateManyJobInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const RunUpsertWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.RunUpsertWithWhereUniqueWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => RunWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => RunUpdateWithoutJobInputSchema),
        z.lazy(() => RunUncheckedUpdateWithoutJobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RunCreateWithoutJobInputSchema),
        z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const RunUpdateWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateWithWhereUniqueWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => RunWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => RunUpdateWithoutJobInputSchema),
        z.lazy(() => RunUncheckedUpdateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const RunUpdateManyWithWhereWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateManyWithWhereWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => RunScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => RunUpdateManyMutationInputSchema),
        z.lazy(() => RunUncheckedUpdateManyWithoutRunsInputSchema),
      ]),
    })
    .strict();

export const RunScalarWhereInputSchema: z.ZodType<Prisma.RunScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => RunScalarWhereInputSchema),
          z.lazy(() => RunScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => RunScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => RunScalarWhereInputSchema),
          z.lazy(() => RunScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      jobId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      status: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      startedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      endedAt: z
        .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
        .optional()
        .nullable(),
    })
    .strict();

export const JobUrlUpsertWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUpsertWithWhereUniqueWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => JobUrlUpdateWithoutJobInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateWithoutJobInputSchema),
      ]),
      create: z.union([
        z.lazy(() => JobUrlCreateWithoutJobInputSchema),
        z.lazy(() => JobUrlUncheckedCreateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const JobUrlUpdateWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUpdateWithWhereUniqueWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => JobUrlUpdateWithoutJobInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateWithoutJobInputSchema),
      ]),
    })
    .strict();

export const JobUrlUpdateManyWithWhereWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUpdateManyWithWhereWithoutJobInput> =
  z
    .object({
      where: z.lazy(() => JobUrlScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => JobUrlUpdateManyMutationInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateManyWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const JobUrlScalarWhereInputSchema: z.ZodType<Prisma.JobUrlScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => JobUrlScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => JobUrlScalarWhereInputSchema),
          z.lazy(() => JobUrlScalarWhereInputSchema).array(),
        ])
        .optional(),
      jobId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      urlId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const JobCreateWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateWithoutRunsInput> =
  z
    .object({
      name: z.string(),
      schedule: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      jobUrls: z
        .lazy(() => JobUrlCreateNestedManyWithoutJobInputSchema)
        .optional(),
    })
    .strict();

export const JobUncheckedCreateWithoutRunsInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutRunsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      schedule: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedCreateNestedManyWithoutJobInputSchema)
        .optional(),
    })
    .strict();

export const JobCreateOrConnectWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutRunsInput> =
  z
    .object({
      where: z.lazy(() => JobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => JobCreateWithoutRunsInputSchema),
        z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema),
      ]),
    })
    .strict();

export const ResultCreateWithoutRunInputSchema: z.ZodType<Prisma.ResultCreateWithoutRunInput> =
  z
    .object({
      url: z.string(),
      screenshotUrl: z.string(),
      diffUrl: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ResultUncheckedCreateWithoutRunInputSchema: z.ZodType<Prisma.ResultUncheckedCreateWithoutRunInput> =
  z
    .object({
      id: z.number().int().optional(),
      url: z.string(),
      screenshotUrl: z.string(),
      diffUrl: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ResultCreateOrConnectWithoutRunInputSchema: z.ZodType<Prisma.ResultCreateOrConnectWithoutRunInput> =
  z
    .object({
      where: z.lazy(() => ResultWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => ResultCreateWithoutRunInputSchema),
        z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
      ]),
    })
    .strict();

export const ResultCreateManyRunInputEnvelopeSchema: z.ZodType<Prisma.ResultCreateManyRunInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => ResultCreateManyRunInputSchema),
        z.lazy(() => ResultCreateManyRunInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JobUpsertWithoutRunsInputSchema: z.ZodType<Prisma.JobUpsertWithoutRunsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => JobUpdateWithoutRunsInputSchema),
        z.lazy(() => JobUncheckedUpdateWithoutRunsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => JobCreateWithoutRunsInputSchema),
        z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema),
      ]),
    })
    .strict();

export const JobUpdateWithoutRunsInputSchema: z.ZodType<Prisma.JobUpdateWithoutRunsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobUrls: z
        .lazy(() => JobUrlUpdateManyWithoutJobNestedInputSchema)
        .optional(),
    })
    .strict();

export const JobUncheckedUpdateWithoutRunsInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutRunsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobUrls: z
        .lazy(() => JobUrlUncheckedUpdateManyWithoutJobNestedInputSchema)
        .optional(),
    })
    .strict();

export const ResultUpsertWithWhereUniqueWithoutRunInputSchema: z.ZodType<Prisma.ResultUpsertWithWhereUniqueWithoutRunInput> =
  z
    .object({
      where: z.lazy(() => ResultWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => ResultUpdateWithoutRunInputSchema),
        z.lazy(() => ResultUncheckedUpdateWithoutRunInputSchema),
      ]),
      create: z.union([
        z.lazy(() => ResultCreateWithoutRunInputSchema),
        z.lazy(() => ResultUncheckedCreateWithoutRunInputSchema),
      ]),
    })
    .strict();

export const ResultUpdateWithWhereUniqueWithoutRunInputSchema: z.ZodType<Prisma.ResultUpdateWithWhereUniqueWithoutRunInput> =
  z
    .object({
      where: z.lazy(() => ResultWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => ResultUpdateWithoutRunInputSchema),
        z.lazy(() => ResultUncheckedUpdateWithoutRunInputSchema),
      ]),
    })
    .strict();

export const ResultUpdateManyWithWhereWithoutRunInputSchema: z.ZodType<Prisma.ResultUpdateManyWithWhereWithoutRunInput> =
  z
    .object({
      where: z.lazy(() => ResultScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => ResultUpdateManyMutationInputSchema),
        z.lazy(() => ResultUncheckedUpdateManyWithoutResultsInputSchema),
      ]),
    })
    .strict();

export const ResultScalarWhereInputSchema: z.ZodType<Prisma.ResultScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => ResultScalarWhereInputSchema),
          z.lazy(() => ResultScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => ResultScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => ResultScalarWhereInputSchema),
          z.lazy(() => ResultScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      runId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      url: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      screenshotUrl: z
        .union([z.lazy(() => StringFilterSchema), z.string()])
        .optional(),
      diffUrl: z
        .union([z.lazy(() => StringNullableFilterSchema), z.string()])
        .optional()
        .nullable(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const RunCreateWithoutResultsInputSchema: z.ZodType<Prisma.RunCreateWithoutResultsInput> =
  z
    .object({
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
      job: z.lazy(() => JobCreateNestedOneWithoutRunsInputSchema),
    })
    .strict();

export const RunUncheckedCreateWithoutResultsInputSchema: z.ZodType<Prisma.RunUncheckedCreateWithoutResultsInput> =
  z
    .object({
      id: z.number().int().optional(),
      jobId: z.number().int(),
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
    })
    .strict();

export const RunCreateOrConnectWithoutResultsInputSchema: z.ZodType<Prisma.RunCreateOrConnectWithoutResultsInput> =
  z
    .object({
      where: z.lazy(() => RunWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => RunCreateWithoutResultsInputSchema),
        z.lazy(() => RunUncheckedCreateWithoutResultsInputSchema),
      ]),
    })
    .strict();

export const RunUpsertWithoutResultsInputSchema: z.ZodType<Prisma.RunUpsertWithoutResultsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => RunUpdateWithoutResultsInputSchema),
        z.lazy(() => RunUncheckedUpdateWithoutResultsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => RunCreateWithoutResultsInputSchema),
        z.lazy(() => RunUncheckedCreateWithoutResultsInputSchema),
      ]),
    })
    .strict();

export const RunUpdateWithoutResultsInputSchema: z.ZodType<Prisma.RunUpdateWithoutResultsInput> =
  z
    .object({
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      job: z
        .lazy(() => JobUpdateOneRequiredWithoutRunsNestedInputSchema)
        .optional(),
    })
    .strict();

export const RunUncheckedUpdateWithoutResultsInputSchema: z.ZodType<Prisma.RunUncheckedUpdateWithoutResultsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JobUrlCreateWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlCreateWithoutUrlInput> =
  z
    .object({
      job: z.lazy(() => JobCreateNestedOneWithoutJobUrlsInputSchema),
    })
    .strict();

export const JobUrlUncheckedCreateWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUncheckedCreateWithoutUrlInput> =
  z
    .object({
      jobId: z.number().int(),
    })
    .strict();

export const JobUrlCreateOrConnectWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlCreateOrConnectWithoutUrlInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
        z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
      ]),
    })
    .strict();

export const JobUrlCreateManyUrlInputEnvelopeSchema: z.ZodType<Prisma.JobUrlCreateManyUrlInputEnvelope> =
  z
    .object({
      data: z.union([
        z.lazy(() => JobUrlCreateManyUrlInputSchema),
        z.lazy(() => JobUrlCreateManyUrlInputSchema).array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JobUrlUpsertWithWhereUniqueWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUpsertWithWhereUniqueWithoutUrlInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => JobUrlUpdateWithoutUrlInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateWithoutUrlInputSchema),
      ]),
      create: z.union([
        z.lazy(() => JobUrlCreateWithoutUrlInputSchema),
        z.lazy(() => JobUrlUncheckedCreateWithoutUrlInputSchema),
      ]),
    })
    .strict();

export const JobUrlUpdateWithWhereUniqueWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUpdateWithWhereUniqueWithoutUrlInput> =
  z
    .object({
      where: z.lazy(() => JobUrlWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => JobUrlUpdateWithoutUrlInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateWithoutUrlInputSchema),
      ]),
    })
    .strict();

export const JobUrlUpdateManyWithWhereWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUpdateManyWithWhereWithoutUrlInput> =
  z
    .object({
      where: z.lazy(() => JobUrlScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => JobUrlUpdateManyMutationInputSchema),
        z.lazy(() => JobUrlUncheckedUpdateManyWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const JobCreateWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobCreateWithoutJobUrlsInput> =
  z
    .object({
      name: z.string(),
      schedule: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      runs: z.lazy(() => RunCreateNestedManyWithoutJobInputSchema).optional(),
    })
    .strict();

export const JobUncheckedCreateWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutJobUrlsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      schedule: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
      runs: z
        .lazy(() => RunUncheckedCreateNestedManyWithoutJobInputSchema)
        .optional(),
    })
    .strict();

export const JobCreateOrConnectWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutJobUrlsInput> =
  z
    .object({
      where: z.lazy(() => JobWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => JobCreateWithoutJobUrlsInputSchema),
        z.lazy(() => JobUncheckedCreateWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const UrlCreateWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlCreateWithoutJobUrlsInput> =
  z
    .object({
      url: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      baselineScreenshotUrl: z.string().optional().nullable(),
    })
    .strict();

export const UrlUncheckedCreateWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlUncheckedCreateWithoutJobUrlsInput> =
  z
    .object({
      id: z.number().int().optional(),
      url: z.string(),
      waitBeforeScreenshot: z.number().int().optional().nullable(),
      actionBeforeScreenshot: z.string().optional().nullable(),
      differenceThreshold: z.number().optional().nullable(),
      baselineScreenshotUrl: z.string().optional().nullable(),
    })
    .strict();

export const UrlCreateOrConnectWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlCreateOrConnectWithoutJobUrlsInput> =
  z
    .object({
      where: z.lazy(() => UrlWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => UrlCreateWithoutJobUrlsInputSchema),
        z.lazy(() => UrlUncheckedCreateWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const JobUpsertWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobUpsertWithoutJobUrlsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => JobUpdateWithoutJobUrlsInputSchema),
        z.lazy(() => JobUncheckedUpdateWithoutJobUrlsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => JobCreateWithoutJobUrlsInputSchema),
        z.lazy(() => JobUncheckedCreateWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const JobUpdateWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobUpdateWithoutJobUrlsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      runs: z.lazy(() => RunUpdateManyWithoutJobNestedInputSchema).optional(),
    })
    .strict();

export const JobUncheckedUpdateWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutJobUrlsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      schedule: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      runs: z
        .lazy(() => RunUncheckedUpdateManyWithoutJobNestedInputSchema)
        .optional(),
    })
    .strict();

export const UrlUpsertWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlUpsertWithoutJobUrlsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => UrlUpdateWithoutJobUrlsInputSchema),
        z.lazy(() => UrlUncheckedUpdateWithoutJobUrlsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => UrlCreateWithoutJobUrlsInputSchema),
        z.lazy(() => UrlUncheckedCreateWithoutJobUrlsInputSchema),
      ]),
    })
    .strict();

export const UrlUpdateWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlUpdateWithoutJobUrlsInput> =
  z
    .object({
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const UrlUncheckedUpdateWithoutJobUrlsInputSchema: z.ZodType<Prisma.UrlUncheckedUpdateWithoutJobUrlsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      waitBeforeScreenshot: z
        .union([
          z.number().int(),
          z.lazy(() => NullableIntFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      actionBeforeScreenshot: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      differenceThreshold: z
        .union([
          z.number(),
          z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      baselineScreenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const RunCreateManyJobInputSchema: z.ZodType<Prisma.RunCreateManyJobInput> =
  z
    .object({
      id: z.number().int().optional(),
      status: z.string(),
      startedAt: z.coerce.date(),
      endedAt: z.coerce.date().optional().nullable(),
    })
    .strict();

export const JobUrlCreateManyJobInputSchema: z.ZodType<Prisma.JobUrlCreateManyJobInput> =
  z
    .object({
      urlId: z.number().int(),
    })
    .strict();

export const RunUpdateWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateWithoutJobInput> =
  z
    .object({
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      results: z
        .lazy(() => ResultUpdateManyWithoutRunNestedInputSchema)
        .optional(),
    })
    .strict();

export const RunUncheckedUpdateWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedUpdateWithoutJobInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      results: z
        .lazy(() => ResultUncheckedUpdateManyWithoutRunNestedInputSchema)
        .optional(),
    })
    .strict();

export const RunUncheckedUpdateManyWithoutRunsInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyWithoutRunsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      status: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
    })
    .strict();

export const JobUrlUpdateWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUpdateWithoutJobInput> =
  z
    .object({
      url: z
        .lazy(() => UrlUpdateOneRequiredWithoutJobUrlsNestedInputSchema)
        .optional(),
    })
    .strict();

export const JobUrlUncheckedUpdateWithoutJobInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateWithoutJobInput> =
  z
    .object({
      urlId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobUrlUncheckedUpdateManyWithoutJobUrlsInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateManyWithoutJobUrlsInput> =
  z
    .object({
      urlId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultCreateManyRunInputSchema: z.ZodType<Prisma.ResultCreateManyRunInput> =
  z
    .object({
      id: z.number().int().optional(),
      url: z.string(),
      screenshotUrl: z.string(),
      diffUrl: z.string().optional().nullable(),
      createdAt: z.coerce.date().optional(),
      updatedAt: z.coerce.date().optional(),
    })
    .strict();

export const ResultUpdateWithoutRunInputSchema: z.ZodType<Prisma.ResultUpdateWithoutRunInput> =
  z
    .object({
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultUncheckedUpdateWithoutRunInputSchema: z.ZodType<Prisma.ResultUncheckedUpdateWithoutRunInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const ResultUncheckedUpdateManyWithoutResultsInputSchema: z.ZodType<Prisma.ResultUncheckedUpdateManyWithoutResultsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      url: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      screenshotUrl: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      diffUrl: z
        .union([
          z.string(),
          z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
        ])
        .optional()
        .nullable(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const JobUrlCreateManyUrlInputSchema: z.ZodType<Prisma.JobUrlCreateManyUrlInput> =
  z
    .object({
      jobId: z.number().int(),
    })
    .strict();

export const JobUrlUpdateWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUpdateWithoutUrlInput> =
  z
    .object({
      job: z
        .lazy(() => JobUpdateOneRequiredWithoutJobUrlsNestedInputSchema)
        .optional(),
    })
    .strict();

export const JobUrlUncheckedUpdateWithoutUrlInputSchema: z.ZodType<Prisma.JobUrlUncheckedUpdateWithoutUrlInput> =
  z
    .object({
      jobId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const PostFindFirstArgsSchema: z.ZodType<Prisma.PostFindFirstArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: PostScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const PostFindFirstOrThrowArgsSchema: z.ZodType<Prisma.PostFindFirstOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      where: PostWhereInputSchema.optional(),
      orderBy: z
        .union([
          PostOrderByWithRelationInputSchema.array(),
          PostOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: PostWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: PostScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const PostFindManyArgsSchema: z.ZodType<Prisma.PostFindManyArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: PostScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const PostAggregateArgsSchema: z.ZodType<Prisma.PostAggregateArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithRelationInputSchema.array(),
        PostOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: PostWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostGroupByArgsSchema: z.ZodType<Prisma.PostGroupByArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
    orderBy: z
      .union([
        PostOrderByWithAggregationInputSchema.array(),
        PostOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: PostScalarFieldEnumSchema.array(),
    having: PostScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const PostFindUniqueArgsSchema: z.ZodType<Prisma.PostFindUniqueArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.PostFindUniqueOrThrowArgs> =
  z
    .object({
      select: PostSelectSchema.optional(),
      where: PostWhereUniqueInputSchema,
    })
    .strict();

export const JobFindFirstArgsSchema: z.ZodType<Prisma.JobFindFirstArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    where: JobWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobOrderByWithRelationInputSchema.array(),
        JobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: JobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: JobScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const JobFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobFindFirstOrThrowArgs> =
  z
    .object({
      select: JobSelectSchema.optional(),
      include: JobIncludeSchema.optional(),
      where: JobWhereInputSchema.optional(),
      orderBy: z
        .union([
          JobOrderByWithRelationInputSchema.array(),
          JobOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: JobWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: JobScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const JobFindManyArgsSchema: z.ZodType<Prisma.JobFindManyArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    where: JobWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobOrderByWithRelationInputSchema.array(),
        JobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: JobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: JobScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const JobAggregateArgsSchema: z.ZodType<Prisma.JobAggregateArgs> = z
  .object({
    where: JobWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobOrderByWithRelationInputSchema.array(),
        JobOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: JobWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const JobGroupByArgsSchema: z.ZodType<Prisma.JobGroupByArgs> = z
  .object({
    where: JobWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobOrderByWithAggregationInputSchema.array(),
        JobOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: JobScalarFieldEnumSchema.array(),
    having: JobScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const JobFindUniqueArgsSchema: z.ZodType<Prisma.JobFindUniqueArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    where: JobWhereUniqueInputSchema,
  })
  .strict();

export const JobFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobFindUniqueOrThrowArgs> =
  z
    .object({
      select: JobSelectSchema.optional(),
      include: JobIncludeSchema.optional(),
      where: JobWhereUniqueInputSchema,
    })
    .strict();

export const RunFindFirstArgsSchema: z.ZodType<Prisma.RunFindFirstArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    where: RunWhereInputSchema.optional(),
    orderBy: z
      .union([
        RunOrderByWithRelationInputSchema.array(),
        RunOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RunWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: RunScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const RunFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RunFindFirstOrThrowArgs> =
  z
    .object({
      select: RunSelectSchema.optional(),
      include: RunIncludeSchema.optional(),
      where: RunWhereInputSchema.optional(),
      orderBy: z
        .union([
          RunOrderByWithRelationInputSchema.array(),
          RunOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: RunWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: RunScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const RunFindManyArgsSchema: z.ZodType<Prisma.RunFindManyArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    where: RunWhereInputSchema.optional(),
    orderBy: z
      .union([
        RunOrderByWithRelationInputSchema.array(),
        RunOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RunWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: RunScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const RunAggregateArgsSchema: z.ZodType<Prisma.RunAggregateArgs> = z
  .object({
    where: RunWhereInputSchema.optional(),
    orderBy: z
      .union([
        RunOrderByWithRelationInputSchema.array(),
        RunOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: RunWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RunGroupByArgsSchema: z.ZodType<Prisma.RunGroupByArgs> = z
  .object({
    where: RunWhereInputSchema.optional(),
    orderBy: z
      .union([
        RunOrderByWithAggregationInputSchema.array(),
        RunOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: RunScalarFieldEnumSchema.array(),
    having: RunScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const RunFindUniqueArgsSchema: z.ZodType<Prisma.RunFindUniqueArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    where: RunWhereUniqueInputSchema,
  })
  .strict();

export const RunFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RunFindUniqueOrThrowArgs> =
  z
    .object({
      select: RunSelectSchema.optional(),
      include: RunIncludeSchema.optional(),
      where: RunWhereUniqueInputSchema,
    })
    .strict();

export const ResultFindFirstArgsSchema: z.ZodType<Prisma.ResultFindFirstArgs> =
  z
    .object({
      select: ResultSelectSchema.optional(),
      include: ResultIncludeSchema.optional(),
      where: ResultWhereInputSchema.optional(),
      orderBy: z
        .union([
          ResultOrderByWithRelationInputSchema.array(),
          ResultOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ResultWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: ResultScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const ResultFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ResultFindFirstOrThrowArgs> =
  z
    .object({
      select: ResultSelectSchema.optional(),
      include: ResultIncludeSchema.optional(),
      where: ResultWhereInputSchema.optional(),
      orderBy: z
        .union([
          ResultOrderByWithRelationInputSchema.array(),
          ResultOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ResultWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: ResultScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const ResultFindManyArgsSchema: z.ZodType<Prisma.ResultFindManyArgs> = z
  .object({
    select: ResultSelectSchema.optional(),
    include: ResultIncludeSchema.optional(),
    where: ResultWhereInputSchema.optional(),
    orderBy: z
      .union([
        ResultOrderByWithRelationInputSchema.array(),
        ResultOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ResultWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: ResultScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const ResultAggregateArgsSchema: z.ZodType<Prisma.ResultAggregateArgs> =
  z
    .object({
      where: ResultWhereInputSchema.optional(),
      orderBy: z
        .union([
          ResultOrderByWithRelationInputSchema.array(),
          ResultOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ResultWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const ResultGroupByArgsSchema: z.ZodType<Prisma.ResultGroupByArgs> = z
  .object({
    where: ResultWhereInputSchema.optional(),
    orderBy: z
      .union([
        ResultOrderByWithAggregationInputSchema.array(),
        ResultOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ResultScalarFieldEnumSchema.array(),
    having: ResultScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const ResultFindUniqueArgsSchema: z.ZodType<Prisma.ResultFindUniqueArgs> =
  z
    .object({
      select: ResultSelectSchema.optional(),
      include: ResultIncludeSchema.optional(),
      where: ResultWhereUniqueInputSchema,
    })
    .strict();

export const ResultFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ResultFindUniqueOrThrowArgs> =
  z
    .object({
      select: ResultSelectSchema.optional(),
      include: ResultIncludeSchema.optional(),
      where: ResultWhereUniqueInputSchema,
    })
    .strict();

export const UrlFindFirstArgsSchema: z.ZodType<Prisma.UrlFindFirstArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    where: UrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        UrlOrderByWithRelationInputSchema.array(),
        UrlOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UrlWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UrlScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const UrlFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UrlFindFirstOrThrowArgs> =
  z
    .object({
      select: UrlSelectSchema.optional(),
      include: UrlIncludeSchema.optional(),
      where: UrlWhereInputSchema.optional(),
      orderBy: z
        .union([
          UrlOrderByWithRelationInputSchema.array(),
          UrlOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UrlWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: UrlScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const UrlFindManyArgsSchema: z.ZodType<Prisma.UrlFindManyArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    where: UrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        UrlOrderByWithRelationInputSchema.array(),
        UrlOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UrlWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: UrlScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const UrlAggregateArgsSchema: z.ZodType<Prisma.UrlAggregateArgs> = z
  .object({
    where: UrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        UrlOrderByWithRelationInputSchema.array(),
        UrlOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UrlWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UrlGroupByArgsSchema: z.ZodType<Prisma.UrlGroupByArgs> = z
  .object({
    where: UrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        UrlOrderByWithAggregationInputSchema.array(),
        UrlOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UrlScalarFieldEnumSchema.array(),
    having: UrlScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const UrlFindUniqueArgsSchema: z.ZodType<Prisma.UrlFindUniqueArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    where: UrlWhereUniqueInputSchema,
  })
  .strict();

export const UrlFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UrlFindUniqueOrThrowArgs> =
  z
    .object({
      select: UrlSelectSchema.optional(),
      include: UrlIncludeSchema.optional(),
      where: UrlWhereUniqueInputSchema,
    })
    .strict();

export const JobUrlFindFirstArgsSchema: z.ZodType<Prisma.JobUrlFindFirstArgs> =
  z
    .object({
      select: JobUrlSelectSchema.optional(),
      include: JobUrlIncludeSchema.optional(),
      where: JobUrlWhereInputSchema.optional(),
      orderBy: z
        .union([
          JobUrlOrderByWithRelationInputSchema.array(),
          JobUrlOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: JobUrlWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: JobUrlScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const JobUrlFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobUrlFindFirstOrThrowArgs> =
  z
    .object({
      select: JobUrlSelectSchema.optional(),
      include: JobUrlIncludeSchema.optional(),
      where: JobUrlWhereInputSchema.optional(),
      orderBy: z
        .union([
          JobUrlOrderByWithRelationInputSchema.array(),
          JobUrlOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: JobUrlWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: JobUrlScalarFieldEnumSchema.array().optional(),
    })
    .strict();

export const JobUrlFindManyArgsSchema: z.ZodType<Prisma.JobUrlFindManyArgs> = z
  .object({
    select: JobUrlSelectSchema.optional(),
    include: JobUrlIncludeSchema.optional(),
    where: JobUrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobUrlOrderByWithRelationInputSchema.array(),
        JobUrlOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: JobUrlWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: JobUrlScalarFieldEnumSchema.array().optional(),
  })
  .strict();

export const JobUrlAggregateArgsSchema: z.ZodType<Prisma.JobUrlAggregateArgs> =
  z
    .object({
      where: JobUrlWhereInputSchema.optional(),
      orderBy: z
        .union([
          JobUrlOrderByWithRelationInputSchema.array(),
          JobUrlOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: JobUrlWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const JobUrlGroupByArgsSchema: z.ZodType<Prisma.JobUrlGroupByArgs> = z
  .object({
    where: JobUrlWhereInputSchema.optional(),
    orderBy: z
      .union([
        JobUrlOrderByWithAggregationInputSchema.array(),
        JobUrlOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: JobUrlScalarFieldEnumSchema.array(),
    having: JobUrlScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const JobUrlFindUniqueArgsSchema: z.ZodType<Prisma.JobUrlFindUniqueArgs> =
  z
    .object({
      select: JobUrlSelectSchema.optional(),
      include: JobUrlIncludeSchema.optional(),
      where: JobUrlWhereUniqueInputSchema,
    })
    .strict();

export const JobUrlFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobUrlFindUniqueOrThrowArgs> =
  z
    .object({
      select: JobUrlSelectSchema.optional(),
      include: JobUrlIncludeSchema.optional(),
      where: JobUrlWhereUniqueInputSchema,
    })
    .strict();

export const PostCreateArgsSchema: z.ZodType<Prisma.PostCreateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    data: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
  })
  .strict();

export const PostUpsertArgsSchema: z.ZodType<Prisma.PostUpsertArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
    create: z.union([PostCreateInputSchema, PostUncheckedCreateInputSchema]),
    update: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
  })
  .strict();

export const PostCreateManyArgsSchema: z.ZodType<Prisma.PostCreateManyArgs> = z
  .object({
    data: z.union([
      PostCreateManyInputSchema,
      PostCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const PostDeleteArgsSchema: z.ZodType<Prisma.PostDeleteArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateArgsSchema: z.ZodType<Prisma.PostUpdateArgs> = z
  .object({
    select: PostSelectSchema.optional(),
    data: z.union([PostUpdateInputSchema, PostUncheckedUpdateInputSchema]),
    where: PostWhereUniqueInputSchema,
  })
  .strict();

export const PostUpdateManyArgsSchema: z.ZodType<Prisma.PostUpdateManyArgs> = z
  .object({
    data: z.union([
      PostUpdateManyMutationInputSchema,
      PostUncheckedUpdateManyInputSchema,
    ]),
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const PostDeleteManyArgsSchema: z.ZodType<Prisma.PostDeleteManyArgs> = z
  .object({
    where: PostWhereInputSchema.optional(),
  })
  .strict();

export const JobCreateArgsSchema: z.ZodType<Prisma.JobCreateArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    data: z.union([JobCreateInputSchema, JobUncheckedCreateInputSchema]),
  })
  .strict();

export const JobUpsertArgsSchema: z.ZodType<Prisma.JobUpsertArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    where: JobWhereUniqueInputSchema,
    create: z.union([JobCreateInputSchema, JobUncheckedCreateInputSchema]),
    update: z.union([JobUpdateInputSchema, JobUncheckedUpdateInputSchema]),
  })
  .strict();

export const JobCreateManyArgsSchema: z.ZodType<Prisma.JobCreateManyArgs> = z
  .object({
    data: z.union([JobCreateManyInputSchema, JobCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const JobDeleteArgsSchema: z.ZodType<Prisma.JobDeleteArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    where: JobWhereUniqueInputSchema,
  })
  .strict();

export const JobUpdateArgsSchema: z.ZodType<Prisma.JobUpdateArgs> = z
  .object({
    select: JobSelectSchema.optional(),
    include: JobIncludeSchema.optional(),
    data: z.union([JobUpdateInputSchema, JobUncheckedUpdateInputSchema]),
    where: JobWhereUniqueInputSchema,
  })
  .strict();

export const JobUpdateManyArgsSchema: z.ZodType<Prisma.JobUpdateManyArgs> = z
  .object({
    data: z.union([
      JobUpdateManyMutationInputSchema,
      JobUncheckedUpdateManyInputSchema,
    ]),
    where: JobWhereInputSchema.optional(),
  })
  .strict();

export const JobDeleteManyArgsSchema: z.ZodType<Prisma.JobDeleteManyArgs> = z
  .object({
    where: JobWhereInputSchema.optional(),
  })
  .strict();

export const RunCreateArgsSchema: z.ZodType<Prisma.RunCreateArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    data: z.union([RunCreateInputSchema, RunUncheckedCreateInputSchema]),
  })
  .strict();

export const RunUpsertArgsSchema: z.ZodType<Prisma.RunUpsertArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    where: RunWhereUniqueInputSchema,
    create: z.union([RunCreateInputSchema, RunUncheckedCreateInputSchema]),
    update: z.union([RunUpdateInputSchema, RunUncheckedUpdateInputSchema]),
  })
  .strict();

export const RunCreateManyArgsSchema: z.ZodType<Prisma.RunCreateManyArgs> = z
  .object({
    data: z.union([RunCreateManyInputSchema, RunCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const RunDeleteArgsSchema: z.ZodType<Prisma.RunDeleteArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    where: RunWhereUniqueInputSchema,
  })
  .strict();

export const RunUpdateArgsSchema: z.ZodType<Prisma.RunUpdateArgs> = z
  .object({
    select: RunSelectSchema.optional(),
    include: RunIncludeSchema.optional(),
    data: z.union([RunUpdateInputSchema, RunUncheckedUpdateInputSchema]),
    where: RunWhereUniqueInputSchema,
  })
  .strict();

export const RunUpdateManyArgsSchema: z.ZodType<Prisma.RunUpdateManyArgs> = z
  .object({
    data: z.union([
      RunUpdateManyMutationInputSchema,
      RunUncheckedUpdateManyInputSchema,
    ]),
    where: RunWhereInputSchema.optional(),
  })
  .strict();

export const RunDeleteManyArgsSchema: z.ZodType<Prisma.RunDeleteManyArgs> = z
  .object({
    where: RunWhereInputSchema.optional(),
  })
  .strict();

export const ResultCreateArgsSchema: z.ZodType<Prisma.ResultCreateArgs> = z
  .object({
    select: ResultSelectSchema.optional(),
    include: ResultIncludeSchema.optional(),
    data: z.union([ResultCreateInputSchema, ResultUncheckedCreateInputSchema]),
  })
  .strict();

export const ResultUpsertArgsSchema: z.ZodType<Prisma.ResultUpsertArgs> = z
  .object({
    select: ResultSelectSchema.optional(),
    include: ResultIncludeSchema.optional(),
    where: ResultWhereUniqueInputSchema,
    create: z.union([
      ResultCreateInputSchema,
      ResultUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ResultUpdateInputSchema,
      ResultUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const ResultCreateManyArgsSchema: z.ZodType<Prisma.ResultCreateManyArgs> =
  z
    .object({
      data: z.union([
        ResultCreateManyInputSchema,
        ResultCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const ResultDeleteArgsSchema: z.ZodType<Prisma.ResultDeleteArgs> = z
  .object({
    select: ResultSelectSchema.optional(),
    include: ResultIncludeSchema.optional(),
    where: ResultWhereUniqueInputSchema,
  })
  .strict();

export const ResultUpdateArgsSchema: z.ZodType<Prisma.ResultUpdateArgs> = z
  .object({
    select: ResultSelectSchema.optional(),
    include: ResultIncludeSchema.optional(),
    data: z.union([ResultUpdateInputSchema, ResultUncheckedUpdateInputSchema]),
    where: ResultWhereUniqueInputSchema,
  })
  .strict();

export const ResultUpdateManyArgsSchema: z.ZodType<Prisma.ResultUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ResultUpdateManyMutationInputSchema,
        ResultUncheckedUpdateManyInputSchema,
      ]),
      where: ResultWhereInputSchema.optional(),
    })
    .strict();

export const ResultDeleteManyArgsSchema: z.ZodType<Prisma.ResultDeleteManyArgs> =
  z
    .object({
      where: ResultWhereInputSchema.optional(),
    })
    .strict();

export const UrlCreateArgsSchema: z.ZodType<Prisma.UrlCreateArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    data: z.union([UrlCreateInputSchema, UrlUncheckedCreateInputSchema]),
  })
  .strict();

export const UrlUpsertArgsSchema: z.ZodType<Prisma.UrlUpsertArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    where: UrlWhereUniqueInputSchema,
    create: z.union([UrlCreateInputSchema, UrlUncheckedCreateInputSchema]),
    update: z.union([UrlUpdateInputSchema, UrlUncheckedUpdateInputSchema]),
  })
  .strict();

export const UrlCreateManyArgsSchema: z.ZodType<Prisma.UrlCreateManyArgs> = z
  .object({
    data: z.union([UrlCreateManyInputSchema, UrlCreateManyInputSchema.array()]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict();

export const UrlDeleteArgsSchema: z.ZodType<Prisma.UrlDeleteArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    where: UrlWhereUniqueInputSchema,
  })
  .strict();

export const UrlUpdateArgsSchema: z.ZodType<Prisma.UrlUpdateArgs> = z
  .object({
    select: UrlSelectSchema.optional(),
    include: UrlIncludeSchema.optional(),
    data: z.union([UrlUpdateInputSchema, UrlUncheckedUpdateInputSchema]),
    where: UrlWhereUniqueInputSchema,
  })
  .strict();

export const UrlUpdateManyArgsSchema: z.ZodType<Prisma.UrlUpdateManyArgs> = z
  .object({
    data: z.union([
      UrlUpdateManyMutationInputSchema,
      UrlUncheckedUpdateManyInputSchema,
    ]),
    where: UrlWhereInputSchema.optional(),
  })
  .strict();

export const UrlDeleteManyArgsSchema: z.ZodType<Prisma.UrlDeleteManyArgs> = z
  .object({
    where: UrlWhereInputSchema.optional(),
  })
  .strict();

export const JobUrlCreateArgsSchema: z.ZodType<Prisma.JobUrlCreateArgs> = z
  .object({
    select: JobUrlSelectSchema.optional(),
    include: JobUrlIncludeSchema.optional(),
    data: z.union([JobUrlCreateInputSchema, JobUrlUncheckedCreateInputSchema]),
  })
  .strict();

export const JobUrlUpsertArgsSchema: z.ZodType<Prisma.JobUrlUpsertArgs> = z
  .object({
    select: JobUrlSelectSchema.optional(),
    include: JobUrlIncludeSchema.optional(),
    where: JobUrlWhereUniqueInputSchema,
    create: z.union([
      JobUrlCreateInputSchema,
      JobUrlUncheckedCreateInputSchema,
    ]),
    update: z.union([
      JobUrlUpdateInputSchema,
      JobUrlUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const JobUrlCreateManyArgsSchema: z.ZodType<Prisma.JobUrlCreateManyArgs> =
  z
    .object({
      data: z.union([
        JobUrlCreateManyInputSchema,
        JobUrlCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict();

export const JobUrlDeleteArgsSchema: z.ZodType<Prisma.JobUrlDeleteArgs> = z
  .object({
    select: JobUrlSelectSchema.optional(),
    include: JobUrlIncludeSchema.optional(),
    where: JobUrlWhereUniqueInputSchema,
  })
  .strict();

export const JobUrlUpdateArgsSchema: z.ZodType<Prisma.JobUrlUpdateArgs> = z
  .object({
    select: JobUrlSelectSchema.optional(),
    include: JobUrlIncludeSchema.optional(),
    data: z.union([JobUrlUpdateInputSchema, JobUrlUncheckedUpdateInputSchema]),
    where: JobUrlWhereUniqueInputSchema,
  })
  .strict();

export const JobUrlUpdateManyArgsSchema: z.ZodType<Prisma.JobUrlUpdateManyArgs> =
  z
    .object({
      data: z.union([
        JobUrlUpdateManyMutationInputSchema,
        JobUrlUncheckedUpdateManyInputSchema,
      ]),
      where: JobUrlWhereInputSchema.optional(),
    })
    .strict();

export const JobUrlDeleteManyArgsSchema: z.ZodType<Prisma.JobUrlDeleteManyArgs> =
  z
    .object({
      where: JobUrlWhereInputSchema.optional(),
    })
    .strict();
