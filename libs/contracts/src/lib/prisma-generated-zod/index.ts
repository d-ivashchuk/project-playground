import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const JobScalarFieldEnumSchema = z.enum(['id','userId','name','schedule','waitBeforeScreenshot','actionBeforeScreenshot','differenceThreshold','createdAt','updatedAt','url','isPaused','baselineImageUrl','projectId']);

export const ProjectScalarFieldEnumSchema = z.enum(['id','name','createdAt','updatedAt']);

export const QueryModeSchema = z.enum(['default','insensitive']);

export const RunScalarFieldEnumSchema = z.enum(['id','jobId','status','startedAt','endedAt','screenshotUrl','diffUrl','diffPercentage','diffPixels']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// PROJECT SCHEMA
/////////////////////////////////////////

export const ProjectSchema = z.object({
  id: z.string().cuid(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Project = z.infer<typeof ProjectSchema>

/////////////////////////////////////////
// JOB SCHEMA
/////////////////////////////////////////

export const JobSchema = z.object({
  id: z.string().cuid(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().nullable(),
  actionBeforeScreenshot: z.string().nullable(),
  differenceThreshold: z.number().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  url: z.string(),
  isPaused: z.boolean(),
  baselineImageUrl: z.string().nullable(),
  projectId: z.string().nullable(),
})

export type Job = z.infer<typeof JobSchema>

/////////////////////////////////////////
// RUN SCHEMA
/////////////////////////////////////////

export const RunSchema = z.object({
  id: z.string().cuid(),
  jobId: z.string(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().nullable(),
  diffPercentage: z.number().nullable(),
  diffPixels: z.number().int().nullable(),
})

export type Run = z.infer<typeof RunSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// PROJECT
//------------------------------------------------------

export const ProjectIncludeSchema: z.ZodType<Prisma.ProjectInclude> = z.object({
  jobs: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const ProjectArgsSchema: z.ZodType<Prisma.ProjectArgs> = z.object({
  select: z.lazy(() => ProjectSelectSchema).optional(),
  include: z.lazy(() => ProjectIncludeSchema).optional(),
}).strict();

export const ProjectCountOutputTypeArgsSchema: z.ZodType<Prisma.ProjectCountOutputTypeArgs> = z.object({
  select: z.lazy(() => ProjectCountOutputTypeSelectSchema).nullish(),
}).strict();

export const ProjectCountOutputTypeSelectSchema: z.ZodType<Prisma.ProjectCountOutputTypeSelect> = z.object({
  jobs: z.boolean().optional(),
}).strict();

export const ProjectSelectSchema: z.ZodType<Prisma.ProjectSelect> = z.object({
  id: z.boolean().optional(),
  name: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  jobs: z.union([z.boolean(),z.lazy(() => JobFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => ProjectCountOutputTypeArgsSchema)]).optional(),
}).strict()

// JOB
//------------------------------------------------------

export const JobIncludeSchema: z.ZodType<Prisma.JobInclude> = z.object({
  runs: z.union([z.boolean(),z.lazy(() => RunFindManyArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const JobArgsSchema: z.ZodType<Prisma.JobArgs> = z.object({
  select: z.lazy(() => JobSelectSchema).optional(),
  include: z.lazy(() => JobIncludeSchema).optional(),
}).strict();

export const JobCountOutputTypeArgsSchema: z.ZodType<Prisma.JobCountOutputTypeArgs> = z.object({
  select: z.lazy(() => JobCountOutputTypeSelectSchema).nullish(),
}).strict();

export const JobCountOutputTypeSelectSchema: z.ZodType<Prisma.JobCountOutputTypeSelect> = z.object({
  runs: z.boolean().optional(),
}).strict();

export const JobSelectSchema: z.ZodType<Prisma.JobSelect> = z.object({
  id: z.boolean().optional(),
  userId: z.boolean().optional(),
  name: z.boolean().optional(),
  schedule: z.boolean().optional(),
  waitBeforeScreenshot: z.boolean().optional(),
  actionBeforeScreenshot: z.boolean().optional(),
  differenceThreshold: z.boolean().optional(),
  createdAt: z.boolean().optional(),
  updatedAt: z.boolean().optional(),
  url: z.boolean().optional(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.boolean().optional(),
  projectId: z.boolean().optional(),
  runs: z.union([z.boolean(),z.lazy(() => RunFindManyArgsSchema)]).optional(),
  project: z.union([z.boolean(),z.lazy(() => ProjectArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => JobCountOutputTypeArgsSchema)]).optional(),
}).strict()

// RUN
//------------------------------------------------------

export const RunIncludeSchema: z.ZodType<Prisma.RunInclude> = z.object({
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
}).strict()

export const RunArgsSchema: z.ZodType<Prisma.RunArgs> = z.object({
  select: z.lazy(() => RunSelectSchema).optional(),
  include: z.lazy(() => RunIncludeSchema).optional(),
}).strict();

export const RunSelectSchema: z.ZodType<Prisma.RunSelect> = z.object({
  id: z.boolean().optional(),
  jobId: z.boolean().optional(),
  status: z.boolean().optional(),
  startedAt: z.boolean().optional(),
  endedAt: z.boolean().optional(),
  screenshotUrl: z.boolean().optional(),
  diffUrl: z.boolean().optional(),
  diffPercentage: z.boolean().optional(),
  diffPixels: z.boolean().optional(),
  job: z.union([z.boolean(),z.lazy(() => JobArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const ProjectWhereInputSchema: z.ZodType<Prisma.ProjectWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectWhereInputSchema),z.lazy(() => ProjectWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  jobs: z.lazy(() => JobListRelationFilterSchema).optional()
}).strict();

export const ProjectOrderByWithRelationInputSchema: z.ZodType<Prisma.ProjectOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  jobs: z.lazy(() => JobOrderByRelationAggregateInputSchema).optional()
}).strict();

export const ProjectWhereUniqueInputSchema: z.ZodType<Prisma.ProjectWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const ProjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.ProjectOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => ProjectCountOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ProjectMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ProjectMinOrderByAggregateInputSchema).optional()
}).strict();

export const ProjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ProjectScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema),z.lazy(() => ProjectScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
}).strict();

export const JobWhereInputSchema: z.ZodType<Prisma.JobWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobWhereInputSchema),z.lazy(() => JobWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schedule: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  waitBeforeScreenshot: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  differenceThreshold: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPaused: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  baselineImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  runs: z.lazy(() => RunListRelationFilterSchema).optional(),
  project: z.union([ z.lazy(() => ProjectRelationFilterSchema),z.lazy(() => ProjectWhereInputSchema) ]).optional().nullable(),
}).strict();

export const JobOrderByWithRelationInputSchema: z.ZodType<Prisma.JobOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional(),
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  isPaused: z.lazy(() => SortOrderSchema).optional(),
  baselineImageUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  runs: z.lazy(() => RunOrderByRelationAggregateInputSchema).optional(),
  project: z.lazy(() => ProjectOrderByWithRelationInputSchema).optional()
}).strict();

export const JobWhereUniqueInputSchema: z.ZodType<Prisma.JobWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const JobOrderByWithAggregationInputSchema: z.ZodType<Prisma.JobOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional(),
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  isPaused: z.lazy(() => SortOrderSchema).optional(),
  baselineImageUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => JobCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => JobAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => JobMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => JobMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => JobSumOrderByAggregateInputSchema).optional()
}).strict();

export const JobScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.JobScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => JobScalarWhereWithAggregatesInputSchema),z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobScalarWhereWithAggregatesInputSchema),z.lazy(() => JobScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  schedule: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  waitBeforeScreenshot: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  differenceThreshold: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  isPaused: z.union([ z.lazy(() => BoolWithAggregatesFilterSchema),z.boolean() ]).optional(),
  baselineImageUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RunWhereInputSchema: z.ZodType<Prisma.RunWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RunWhereInputSchema),z.lazy(() => RunWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RunWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RunWhereInputSchema),z.lazy(() => RunWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  screenshotUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diffUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  diffPercentage: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  diffPixels: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  job: z.union([ z.lazy(() => JobRelationFilterSchema),z.lazy(() => JobWhereInputSchema) ]).optional(),
}).strict();

export const RunOrderByWithRelationInputSchema: z.ZodType<Prisma.RunOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  endedAt: z.lazy(() => SortOrderSchema).optional(),
  screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
  diffUrl: z.lazy(() => SortOrderSchema).optional(),
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional(),
  job: z.lazy(() => JobOrderByWithRelationInputSchema).optional()
}).strict();

export const RunWhereUniqueInputSchema: z.ZodType<Prisma.RunWhereUniqueInput> = z.object({
  id: z.string().cuid().optional()
}).strict();

export const RunOrderByWithAggregationInputSchema: z.ZodType<Prisma.RunOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  endedAt: z.lazy(() => SortOrderSchema).optional(),
  screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
  diffUrl: z.lazy(() => SortOrderSchema).optional(),
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional(),
  _count: z.lazy(() => RunCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => RunAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => RunMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => RunMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => RunSumOrderByAggregateInputSchema).optional()
}).strict();

export const RunScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.RunScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => RunScalarWhereWithAggregatesInputSchema),z.lazy(() => RunScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => RunScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RunScalarWhereWithAggregatesInputSchema),z.lazy(() => RunScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeWithAggregatesFilterSchema),z.coerce.date() ]).optional(),
  endedAt: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  screenshotUrl: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  diffUrl: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  diffPercentage: z.union([ z.lazy(() => FloatNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  diffPixels: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ProjectCreateInputSchema: z.ZodType<Prisma.ProjectCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobs: z.lazy(() => JobCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUncheckedCreateInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  jobs: z.lazy(() => JobUncheckedCreateNestedManyWithoutProjectInputSchema).optional()
}).strict();

export const ProjectUpdateInputSchema: z.ZodType<Prisma.ProjectUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobs: z.lazy(() => JobUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectUncheckedUpdateInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  jobs: z.lazy(() => JobUncheckedUpdateManyWithoutProjectNestedInputSchema).optional()
}).strict();

export const ProjectCreateManyInputSchema: z.ZodType<Prisma.ProjectCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProjectUpdateManyMutationInputSchema: z.ZodType<Prisma.ProjectUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobCreateInputSchema: z.ZodType<Prisma.JobCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  runs: z.lazy(() => RunCreateNestedManyWithoutJobInputSchema).optional(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutJobsInputSchema).optional()
}).strict();

export const JobUncheckedCreateInputSchema: z.ZodType<Prisma.JobUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  projectId: z.string().optional().nullable(),
  runs: z.lazy(() => RunUncheckedCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobUpdateInputSchema: z.ZodType<Prisma.JobUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  runs: z.lazy(() => RunUpdateManyWithoutJobNestedInputSchema).optional(),
  project: z.lazy(() => ProjectUpdateOneWithoutJobsNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateInputSchema: z.ZodType<Prisma.JobUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  runs: z.lazy(() => RunUncheckedUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobCreateManyInputSchema: z.ZodType<Prisma.JobCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  projectId: z.string().optional().nullable()
}).strict();

export const JobUpdateManyMutationInputSchema: z.ZodType<Prisma.JobUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobUncheckedUpdateManyInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunCreateInputSchema: z.ZodType<Prisma.RunCreateInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable(),
  job: z.lazy(() => JobCreateNestedOneWithoutRunsInputSchema)
}).strict();

export const RunUncheckedCreateInputSchema: z.ZodType<Prisma.RunUncheckedCreateInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable()
}).strict();

export const RunUpdateInputSchema: z.ZodType<Prisma.RunUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  job: z.lazy(() => JobUpdateOneRequiredWithoutRunsNestedInputSchema).optional()
}).strict();

export const RunUncheckedUpdateInputSchema: z.ZodType<Prisma.RunUncheckedUpdateInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunCreateManyInputSchema: z.ZodType<Prisma.RunCreateManyInput> = z.object({
  id: z.string().cuid().optional(),
  jobId: z.string(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable()
}).strict();

export const RunUpdateManyMutationInputSchema: z.ZodType<Prisma.RunUpdateManyMutationInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunUncheckedUpdateManyInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  jobId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const JobListRelationFilterSchema: z.ZodType<Prisma.JobListRelationFilter> = z.object({
  every: z.lazy(() => JobWhereInputSchema).optional(),
  some: z.lazy(() => JobWhereInputSchema).optional(),
  none: z.lazy(() => JobWhereInputSchema).optional()
}).strict();

export const JobOrderByRelationAggregateInputSchema: z.ZodType<Prisma.JobOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ProjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.ProjectMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const FloatNullableFilterSchema: z.ZodType<Prisma.FloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const RunListRelationFilterSchema: z.ZodType<Prisma.RunListRelationFilter> = z.object({
  every: z.lazy(() => RunWhereInputSchema).optional(),
  some: z.lazy(() => RunWhereInputSchema).optional(),
  none: z.lazy(() => RunWhereInputSchema).optional()
}).strict();

export const ProjectRelationFilterSchema: z.ZodType<Prisma.ProjectRelationFilter> = z.object({
  is: z.lazy(() => ProjectWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => ProjectWhereInputSchema).optional().nullable()
}).strict();

export const RunOrderByRelationAggregateInputSchema: z.ZodType<Prisma.RunOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobCountOrderByAggregateInputSchema: z.ZodType<Prisma.JobCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional(),
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  isPaused: z.lazy(() => SortOrderSchema).optional(),
  baselineImageUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobAvgOrderByAggregateInputSchema: z.ZodType<Prisma.JobAvgOrderByAggregateInput> = z.object({
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobMaxOrderByAggregateInputSchema: z.ZodType<Prisma.JobMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional(),
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  isPaused: z.lazy(() => SortOrderSchema).optional(),
  baselineImageUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobMinOrderByAggregateInputSchema: z.ZodType<Prisma.JobMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  userId: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  schedule: z.lazy(() => SortOrderSchema).optional(),
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  actionBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional(),
  createdAt: z.lazy(() => SortOrderSchema).optional(),
  updatedAt: z.lazy(() => SortOrderSchema).optional(),
  url: z.lazy(() => SortOrderSchema).optional(),
  isPaused: z.lazy(() => SortOrderSchema).optional(),
  baselineImageUrl: z.lazy(() => SortOrderSchema).optional(),
  projectId: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const JobSumOrderByAggregateInputSchema: z.ZodType<Prisma.JobSumOrderByAggregateInput> = z.object({
  waitBeforeScreenshot: z.lazy(() => SortOrderSchema).optional(),
  differenceThreshold: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  mode: z.lazy(() => QueryModeSchema).optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const FloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.FloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const JobRelationFilterSchema: z.ZodType<Prisma.JobRelationFilter> = z.object({
  is: z.lazy(() => JobWhereInputSchema).optional(),
  isNot: z.lazy(() => JobWhereInputSchema).optional()
}).strict();

export const RunCountOrderByAggregateInputSchema: z.ZodType<Prisma.RunCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  endedAt: z.lazy(() => SortOrderSchema).optional(),
  screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
  diffUrl: z.lazy(() => SortOrderSchema).optional(),
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RunAvgOrderByAggregateInputSchema: z.ZodType<Prisma.RunAvgOrderByAggregateInput> = z.object({
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RunMaxOrderByAggregateInputSchema: z.ZodType<Prisma.RunMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  endedAt: z.lazy(() => SortOrderSchema).optional(),
  screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
  diffUrl: z.lazy(() => SortOrderSchema).optional(),
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RunMinOrderByAggregateInputSchema: z.ZodType<Prisma.RunMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  jobId: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  startedAt: z.lazy(() => SortOrderSchema).optional(),
  endedAt: z.lazy(() => SortOrderSchema).optional(),
  screenshotUrl: z.lazy(() => SortOrderSchema).optional(),
  diffUrl: z.lazy(() => SortOrderSchema).optional(),
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const RunSumOrderByAggregateInputSchema: z.ZodType<Prisma.RunSumOrderByAggregateInput> = z.object({
  diffPercentage: z.lazy(() => SortOrderSchema).optional(),
  diffPixels: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const JobCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.JobCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobCreateWithoutProjectInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema),z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const JobUncheckedCreateNestedManyWithoutProjectInputSchema: z.ZodType<Prisma.JobUncheckedCreateNestedManyWithoutProjectInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobCreateWithoutProjectInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema),z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyProjectInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional()
}).strict();

export const JobUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.JobUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobCreateWithoutProjectInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema),z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => JobUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => JobUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => JobUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobUncheckedUpdateManyWithoutProjectNestedInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyWithoutProjectNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobCreateWithoutProjectInputSchema).array(),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema),z.lazy(() => JobCreateOrConnectWithoutProjectInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => JobUpsertWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => JobUpsertWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  createMany: z.lazy(() => JobCreateManyProjectInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => JobWhereUniqueInputSchema),z.lazy(() => JobWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithWhereUniqueWithoutProjectInputSchema),z.lazy(() => JobUpdateWithWhereUniqueWithoutProjectInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => JobUpdateManyWithWhereWithoutProjectInputSchema),z.lazy(() => JobUpdateManyWithWhereWithoutProjectInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const RunCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.RunCreateNestedManyWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunCreateWithoutJobInputSchema).array(),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ProjectCreateNestedOneWithoutJobsInputSchema: z.ZodType<Prisma.ProjectCreateNestedOneWithoutJobsInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutJobsInputSchema).optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional()
}).strict();

export const RunUncheckedCreateNestedManyWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedCreateNestedManyWithoutJobInput> = z.object({
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunCreateWithoutJobInputSchema).array(),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableFloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableFloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> = z.object({
  set: z.boolean().optional()
}).strict();

export const RunUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.RunUpdateManyWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunCreateWithoutJobInputSchema).array(),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema),z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema),z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema),z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RunScalarWhereInputSchema),z.lazy(() => RunScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const ProjectUpdateOneWithoutJobsNestedInputSchema: z.ZodType<Prisma.ProjectUpdateOneWithoutJobsNestedInput> = z.object({
  create: z.union([ z.lazy(() => ProjectCreateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutJobsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => ProjectCreateOrConnectWithoutJobsInputSchema).optional(),
  upsert: z.lazy(() => ProjectUpsertWithoutJobsInputSchema).optional(),
  disconnect: z.boolean().optional(),
  delete: z.boolean().optional(),
  connect: z.lazy(() => ProjectWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => ProjectUpdateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutJobsInputSchema) ]).optional(),
}).strict();

export const RunUncheckedUpdateManyWithoutJobNestedInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyWithoutJobNestedInput> = z.object({
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunCreateWithoutJobInputSchema).array(),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => RunCreateOrConnectWithoutJobInputSchema),z.lazy(() => RunCreateOrConnectWithoutJobInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema),z.lazy(() => RunUpsertWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  createMany: z.lazy(() => RunCreateManyJobInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => RunWhereUniqueInputSchema),z.lazy(() => RunWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema),z.lazy(() => RunUpdateWithWhereUniqueWithoutJobInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema),z.lazy(() => RunUpdateManyWithWhereWithoutJobInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => RunScalarWhereInputSchema),z.lazy(() => RunScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const JobCreateNestedOneWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateNestedOneWithoutRunsInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutRunsInputSchema),z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobCreateOrConnectWithoutRunsInputSchema).optional(),
  connect: z.lazy(() => JobWhereUniqueInputSchema).optional()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const JobUpdateOneRequiredWithoutRunsNestedInputSchema: z.ZodType<Prisma.JobUpdateOneRequiredWithoutRunsNestedInput> = z.object({
  create: z.union([ z.lazy(() => JobCreateWithoutRunsInputSchema),z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => JobCreateOrConnectWithoutRunsInputSchema).optional(),
  upsert: z.lazy(() => JobUpsertWithoutRunsInputSchema).optional(),
  connect: z.lazy(() => JobWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => JobUpdateWithoutRunsInputSchema),z.lazy(() => JobUncheckedUpdateWithoutRunsInputSchema) ]).optional(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.union([ z.string().array(),z.string() ]).optional(),
  notIn: z.union([ z.string().array(),z.string() ]).optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.union([ z.number().array(),z.number() ]).optional(),
  notIn: z.union([ z.number().array(),z.number() ]).optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolFilterSchema) ]).optional(),
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  notIn: z.union([ z.string().array(),z.string() ]).optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  notIn: z.union([ z.number().array(),z.number() ]).optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatNullableFilterSchema).optional()
}).strict();

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> = z.object({
  equals: z.boolean().optional(),
  not: z.union([ z.boolean(),z.lazy(() => NestedBoolWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedBoolFilterSchema).optional(),
  _max: z.lazy(() => NestedBoolFilterSchema).optional()
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  notIn: z.union([ z.coerce.date().array(),z.coerce.date() ]).optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const JobCreateWithoutProjectInputSchema: z.ZodType<Prisma.JobCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  runs: z.lazy(() => RunCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobUncheckedCreateWithoutProjectInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutProjectInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  runs: z.lazy(() => RunUncheckedCreateNestedManyWithoutJobInputSchema).optional()
}).strict();

export const JobCreateOrConnectWithoutProjectInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutProjectInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const JobCreateManyProjectInputEnvelopeSchema: z.ZodType<Prisma.JobCreateManyProjectInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => JobCreateManyProjectInputSchema),z.lazy(() => JobCreateManyProjectInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const JobUpsertWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.JobUpsertWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => JobUpdateWithoutProjectInputSchema),z.lazy(() => JobUncheckedUpdateWithoutProjectInputSchema) ]),
  create: z.union([ z.lazy(() => JobCreateWithoutProjectInputSchema),z.lazy(() => JobUncheckedCreateWithoutProjectInputSchema) ]),
}).strict();

export const JobUpdateWithWhereUniqueWithoutProjectInputSchema: z.ZodType<Prisma.JobUpdateWithWhereUniqueWithoutProjectInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => JobUpdateWithoutProjectInputSchema),z.lazy(() => JobUncheckedUpdateWithoutProjectInputSchema) ]),
}).strict();

export const JobUpdateManyWithWhereWithoutProjectInputSchema: z.ZodType<Prisma.JobUpdateManyWithWhereWithoutProjectInput> = z.object({
  where: z.lazy(() => JobScalarWhereInputSchema),
  data: z.union([ z.lazy(() => JobUpdateManyMutationInputSchema),z.lazy(() => JobUncheckedUpdateManyWithoutJobsInputSchema) ]),
}).strict();

export const JobScalarWhereInputSchema: z.ZodType<Prisma.JobScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => JobScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => JobScalarWhereInputSchema),z.lazy(() => JobScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  userId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  schedule: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  waitBeforeScreenshot: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  differenceThreshold: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  createdAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  updatedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  url: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  isPaused: z.union([ z.lazy(() => BoolFilterSchema),z.boolean() ]).optional(),
  baselineImageUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  projectId: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const RunCreateWithoutJobInputSchema: z.ZodType<Prisma.RunCreateWithoutJobInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable()
}).strict();

export const RunUncheckedCreateWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedCreateWithoutJobInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable()
}).strict();

export const RunCreateOrConnectWithoutJobInputSchema: z.ZodType<Prisma.RunCreateOrConnectWithoutJobInput> = z.object({
  where: z.lazy(() => RunWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const RunCreateManyJobInputEnvelopeSchema: z.ZodType<Prisma.RunCreateManyJobInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => RunCreateManyJobInputSchema),z.lazy(() => RunCreateManyJobInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const ProjectCreateWithoutJobsInputSchema: z.ZodType<Prisma.ProjectCreateWithoutJobsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProjectUncheckedCreateWithoutJobsInputSchema: z.ZodType<Prisma.ProjectUncheckedCreateWithoutJobsInput> = z.object({
  id: z.string().cuid().optional(),
  name: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional()
}).strict();

export const ProjectCreateOrConnectWithoutJobsInputSchema: z.ZodType<Prisma.ProjectCreateOrConnectWithoutJobsInput> = z.object({
  where: z.lazy(() => ProjectWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ProjectCreateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutJobsInputSchema) ]),
}).strict();

export const RunUpsertWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.RunUpsertWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => RunWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => RunUpdateWithoutJobInputSchema),z.lazy(() => RunUncheckedUpdateWithoutJobInputSchema) ]),
  create: z.union([ z.lazy(() => RunCreateWithoutJobInputSchema),z.lazy(() => RunUncheckedCreateWithoutJobInputSchema) ]),
}).strict();

export const RunUpdateWithWhereUniqueWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateWithWhereUniqueWithoutJobInput> = z.object({
  where: z.lazy(() => RunWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => RunUpdateWithoutJobInputSchema),z.lazy(() => RunUncheckedUpdateWithoutJobInputSchema) ]),
}).strict();

export const RunUpdateManyWithWhereWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateManyWithWhereWithoutJobInput> = z.object({
  where: z.lazy(() => RunScalarWhereInputSchema),
  data: z.union([ z.lazy(() => RunUpdateManyMutationInputSchema),z.lazy(() => RunUncheckedUpdateManyWithoutRunsInputSchema) ]),
}).strict();

export const RunScalarWhereInputSchema: z.ZodType<Prisma.RunScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => RunScalarWhereInputSchema),z.lazy(() => RunScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => RunScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => RunScalarWhereInputSchema),z.lazy(() => RunScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  jobId: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  status: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  startedAt: z.union([ z.lazy(() => DateTimeFilterSchema),z.coerce.date() ]).optional(),
  endedAt: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  screenshotUrl: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  diffUrl: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  diffPercentage: z.union([ z.lazy(() => FloatNullableFilterSchema),z.number() ]).optional().nullable(),
  diffPixels: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const ProjectUpsertWithoutJobsInputSchema: z.ZodType<Prisma.ProjectUpsertWithoutJobsInput> = z.object({
  update: z.union([ z.lazy(() => ProjectUpdateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedUpdateWithoutJobsInputSchema) ]),
  create: z.union([ z.lazy(() => ProjectCreateWithoutJobsInputSchema),z.lazy(() => ProjectUncheckedCreateWithoutJobsInputSchema) ]),
}).strict();

export const ProjectUpdateWithoutJobsInputSchema: z.ZodType<Prisma.ProjectUpdateWithoutJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const ProjectUncheckedUpdateWithoutJobsInputSchema: z.ZodType<Prisma.ProjectUncheckedUpdateWithoutJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
}).strict();

export const JobCreateWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateWithoutRunsInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  project: z.lazy(() => ProjectCreateNestedOneWithoutJobsInputSchema).optional()
}).strict();

export const JobUncheckedCreateWithoutRunsInputSchema: z.ZodType<Prisma.JobUncheckedCreateWithoutRunsInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable(),
  projectId: z.string().optional().nullable()
}).strict();

export const JobCreateOrConnectWithoutRunsInputSchema: z.ZodType<Prisma.JobCreateOrConnectWithoutRunsInput> = z.object({
  where: z.lazy(() => JobWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => JobCreateWithoutRunsInputSchema),z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema) ]),
}).strict();

export const JobUpsertWithoutRunsInputSchema: z.ZodType<Prisma.JobUpsertWithoutRunsInput> = z.object({
  update: z.union([ z.lazy(() => JobUpdateWithoutRunsInputSchema),z.lazy(() => JobUncheckedUpdateWithoutRunsInputSchema) ]),
  create: z.union([ z.lazy(() => JobCreateWithoutRunsInputSchema),z.lazy(() => JobUncheckedCreateWithoutRunsInputSchema) ]),
}).strict();

export const JobUpdateWithoutRunsInputSchema: z.ZodType<Prisma.JobUpdateWithoutRunsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  project: z.lazy(() => ProjectUpdateOneWithoutJobsNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateWithoutRunsInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutRunsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  projectId: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const JobCreateManyProjectInputSchema: z.ZodType<Prisma.JobCreateManyProjectInput> = z.object({
  id: z.string().cuid().optional(),
  userId: z.string(),
  name: z.string(),
  schedule: z.string(),
  waitBeforeScreenshot: z.number().int().optional().nullable(),
  actionBeforeScreenshot: z.string().optional().nullable(),
  differenceThreshold: z.number().optional().nullable(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  url: z.string(),
  isPaused: z.boolean().optional(),
  baselineImageUrl: z.string().optional().nullable()
}).strict();

export const JobUpdateWithoutProjectInputSchema: z.ZodType<Prisma.JobUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  runs: z.lazy(() => RunUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateWithoutProjectInputSchema: z.ZodType<Prisma.JobUncheckedUpdateWithoutProjectInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  runs: z.lazy(() => RunUncheckedUpdateManyWithoutJobNestedInputSchema).optional()
}).strict();

export const JobUncheckedUpdateManyWithoutJobsInputSchema: z.ZodType<Prisma.JobUncheckedUpdateManyWithoutJobsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  userId: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  schedule: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  waitBeforeScreenshot: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  actionBeforeScreenshot: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  differenceThreshold: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  createdAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  updatedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  url: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  isPaused: z.union([ z.boolean(),z.lazy(() => BoolFieldUpdateOperationsInputSchema) ]).optional(),
  baselineImageUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunCreateManyJobInputSchema: z.ZodType<Prisma.RunCreateManyJobInput> = z.object({
  id: z.string().cuid().optional(),
  status: z.string(),
  startedAt: z.coerce.date(),
  endedAt: z.coerce.date().optional().nullable(),
  screenshotUrl: z.string(),
  diffUrl: z.string().optional().nullable(),
  diffPercentage: z.number().optional().nullable(),
  diffPixels: z.number().int().optional().nullable()
}).strict();

export const RunUpdateWithoutJobInputSchema: z.ZodType<Prisma.RunUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunUncheckedUpdateWithoutJobInputSchema: z.ZodType<Prisma.RunUncheckedUpdateWithoutJobInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const RunUncheckedUpdateManyWithoutRunsInputSchema: z.ZodType<Prisma.RunUncheckedUpdateManyWithoutRunsInput> = z.object({
  id: z.union([ z.string().cuid(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  startedAt: z.union([ z.coerce.date(),z.lazy(() => DateTimeFieldUpdateOperationsInputSchema) ]).optional(),
  endedAt: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  screenshotUrl: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  diffUrl: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPercentage: z.union([ z.number(),z.lazy(() => NullableFloatFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  diffPixels: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const ProjectFindFirstArgsSchema: z.ZodType<Prisma.ProjectFindFirstArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindFirstOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProjectFindManyArgsSchema: z.ZodType<Prisma.ProjectFindManyArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: ProjectScalarFieldEnumSchema.array().optional(),
}).strict()

export const ProjectAggregateArgsSchema: z.ZodType<Prisma.ProjectAggregateArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithRelationInputSchema.array(),ProjectOrderByWithRelationInputSchema ]).optional(),
  cursor: ProjectWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectGroupByArgsSchema: z.ZodType<Prisma.ProjectGroupByArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
  orderBy: z.union([ ProjectOrderByWithAggregationInputSchema.array(),ProjectOrderByWithAggregationInputSchema ]).optional(),
  by: ProjectScalarFieldEnumSchema.array(),
  having: ProjectScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const ProjectFindUniqueArgsSchema: z.ZodType<Prisma.ProjectFindUniqueArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ProjectFindUniqueOrThrowArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const JobFindFirstArgsSchema: z.ZodType<Prisma.JobFindFirstArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobFindFirstOrThrowArgsSchema: z.ZodType<Prisma.JobFindFirstOrThrowArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobFindManyArgsSchema: z.ZodType<Prisma.JobFindManyArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: JobScalarFieldEnumSchema.array().optional(),
}).strict()

export const JobAggregateArgsSchema: z.ZodType<Prisma.JobAggregateArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithRelationInputSchema.array(),JobOrderByWithRelationInputSchema ]).optional(),
  cursor: JobWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobGroupByArgsSchema: z.ZodType<Prisma.JobGroupByArgs> = z.object({
  where: JobWhereInputSchema.optional(),
  orderBy: z.union([ JobOrderByWithAggregationInputSchema.array(),JobOrderByWithAggregationInputSchema ]).optional(),
  by: JobScalarFieldEnumSchema.array(),
  having: JobScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const JobFindUniqueArgsSchema: z.ZodType<Prisma.JobFindUniqueArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.JobFindUniqueOrThrowArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const RunFindFirstArgsSchema: z.ZodType<Prisma.RunFindFirstArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereInputSchema.optional(),
  orderBy: z.union([ RunOrderByWithRelationInputSchema.array(),RunOrderByWithRelationInputSchema ]).optional(),
  cursor: RunWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RunScalarFieldEnumSchema.array().optional(),
}).strict()

export const RunFindFirstOrThrowArgsSchema: z.ZodType<Prisma.RunFindFirstOrThrowArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereInputSchema.optional(),
  orderBy: z.union([ RunOrderByWithRelationInputSchema.array(),RunOrderByWithRelationInputSchema ]).optional(),
  cursor: RunWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RunScalarFieldEnumSchema.array().optional(),
}).strict()

export const RunFindManyArgsSchema: z.ZodType<Prisma.RunFindManyArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereInputSchema.optional(),
  orderBy: z.union([ RunOrderByWithRelationInputSchema.array(),RunOrderByWithRelationInputSchema ]).optional(),
  cursor: RunWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: RunScalarFieldEnumSchema.array().optional(),
}).strict()

export const RunAggregateArgsSchema: z.ZodType<Prisma.RunAggregateArgs> = z.object({
  where: RunWhereInputSchema.optional(),
  orderBy: z.union([ RunOrderByWithRelationInputSchema.array(),RunOrderByWithRelationInputSchema ]).optional(),
  cursor: RunWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RunGroupByArgsSchema: z.ZodType<Prisma.RunGroupByArgs> = z.object({
  where: RunWhereInputSchema.optional(),
  orderBy: z.union([ RunOrderByWithAggregationInputSchema.array(),RunOrderByWithAggregationInputSchema ]).optional(),
  by: RunScalarFieldEnumSchema.array(),
  having: RunScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict()

export const RunFindUniqueArgsSchema: z.ZodType<Prisma.RunFindUniqueArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereUniqueInputSchema,
}).strict()

export const RunFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.RunFindUniqueOrThrowArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereUniqueInputSchema,
}).strict()

export const ProjectCreateArgsSchema: z.ZodType<Prisma.ProjectCreateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
}).strict()

export const ProjectUpsertArgsSchema: z.ZodType<Prisma.ProjectUpsertArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
  create: z.union([ ProjectCreateInputSchema,ProjectUncheckedCreateInputSchema ]),
  update: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
}).strict()

export const ProjectCreateManyArgsSchema: z.ZodType<Prisma.ProjectCreateManyArgs> = z.object({
  data: z.union([ ProjectCreateManyInputSchema,ProjectCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const ProjectDeleteArgsSchema: z.ZodType<Prisma.ProjectDeleteArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateArgsSchema: z.ZodType<Prisma.ProjectUpdateArgs> = z.object({
  select: ProjectSelectSchema.optional(),
  include: ProjectIncludeSchema.optional(),
  data: z.union([ ProjectUpdateInputSchema,ProjectUncheckedUpdateInputSchema ]),
  where: ProjectWhereUniqueInputSchema,
}).strict()

export const ProjectUpdateManyArgsSchema: z.ZodType<Prisma.ProjectUpdateManyArgs> = z.object({
  data: z.union([ ProjectUpdateManyMutationInputSchema,ProjectUncheckedUpdateManyInputSchema ]),
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const ProjectDeleteManyArgsSchema: z.ZodType<Prisma.ProjectDeleteManyArgs> = z.object({
  where: ProjectWhereInputSchema.optional(),
}).strict()

export const JobCreateArgsSchema: z.ZodType<Prisma.JobCreateArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  data: z.union([ JobCreateInputSchema,JobUncheckedCreateInputSchema ]),
}).strict()

export const JobUpsertArgsSchema: z.ZodType<Prisma.JobUpsertArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
  create: z.union([ JobCreateInputSchema,JobUncheckedCreateInputSchema ]),
  update: z.union([ JobUpdateInputSchema,JobUncheckedUpdateInputSchema ]),
}).strict()

export const JobCreateManyArgsSchema: z.ZodType<Prisma.JobCreateManyArgs> = z.object({
  data: z.union([ JobCreateManyInputSchema,JobCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const JobDeleteArgsSchema: z.ZodType<Prisma.JobDeleteArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobUpdateArgsSchema: z.ZodType<Prisma.JobUpdateArgs> = z.object({
  select: JobSelectSchema.optional(),
  include: JobIncludeSchema.optional(),
  data: z.union([ JobUpdateInputSchema,JobUncheckedUpdateInputSchema ]),
  where: JobWhereUniqueInputSchema,
}).strict()

export const JobUpdateManyArgsSchema: z.ZodType<Prisma.JobUpdateManyArgs> = z.object({
  data: z.union([ JobUpdateManyMutationInputSchema,JobUncheckedUpdateManyInputSchema ]),
  where: JobWhereInputSchema.optional(),
}).strict()

export const JobDeleteManyArgsSchema: z.ZodType<Prisma.JobDeleteManyArgs> = z.object({
  where: JobWhereInputSchema.optional(),
}).strict()

export const RunCreateArgsSchema: z.ZodType<Prisma.RunCreateArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  data: z.union([ RunCreateInputSchema,RunUncheckedCreateInputSchema ]),
}).strict()

export const RunUpsertArgsSchema: z.ZodType<Prisma.RunUpsertArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereUniqueInputSchema,
  create: z.union([ RunCreateInputSchema,RunUncheckedCreateInputSchema ]),
  update: z.union([ RunUpdateInputSchema,RunUncheckedUpdateInputSchema ]),
}).strict()

export const RunCreateManyArgsSchema: z.ZodType<Prisma.RunCreateManyArgs> = z.object({
  data: z.union([ RunCreateManyInputSchema,RunCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict()

export const RunDeleteArgsSchema: z.ZodType<Prisma.RunDeleteArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  where: RunWhereUniqueInputSchema,
}).strict()

export const RunUpdateArgsSchema: z.ZodType<Prisma.RunUpdateArgs> = z.object({
  select: RunSelectSchema.optional(),
  include: RunIncludeSchema.optional(),
  data: z.union([ RunUpdateInputSchema,RunUncheckedUpdateInputSchema ]),
  where: RunWhereUniqueInputSchema,
}).strict()

export const RunUpdateManyArgsSchema: z.ZodType<Prisma.RunUpdateManyArgs> = z.object({
  data: z.union([ RunUpdateManyMutationInputSchema,RunUncheckedUpdateManyInputSchema ]),
  where: RunWhereInputSchema.optional(),
}).strict()

export const RunDeleteManyArgsSchema: z.ZodType<Prisma.RunDeleteManyArgs> = z.object({
  where: RunWhereInputSchema.optional(),
}).strict()