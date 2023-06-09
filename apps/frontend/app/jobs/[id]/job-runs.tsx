'use client';

import { useUser } from '@clerk/nextjs';
import {
  Badge,
  Box,
  Card,
  Divider,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { client } from '../../../client';

import Link from 'next/link';
import { generateRunIcon } from '../../../components/utils';

const JobRuns = ({ jobId }: { jobId: string }) => {
  const { user } = useUser();

  if (!user) return <Skeleton />;

  const runsQuery = client.apiJobs.fetchAllRunsByJobId.useQuery(
    ['job-runs', jobId],
    {
      params: {
        id: jobId,
      },
      query: {
        limit: '10',
      },
    },
    {
      enabled: !!user?.id,
    }
  );

  if (runsQuery.isLoading) return <Skeleton />;

  return (
    <Box>
      <SimpleGrid>
        {runsQuery.data?.body?.map((run) => (
          <div key={run.id}>
            <Link style={{ textDecoration: 'none' }} href={`/runs/${run.id}`}>
              <Card shadow="xs" padding="xs" radius="md">
                <Stack spacing="xs">
                  <Group>
                    <div>{generateRunIcon(run.status)}</div>
                    <Text weight={600}>{run.job.name}</Text>
                    {run.diffPercentage && (
                      <Badge color="red">
                        {Number(run.diffPercentage).toFixed(2)}%
                      </Badge>
                    )}
                  </Group>
                </Stack>
                <Group>
                  {run.endedAt && (
                    <Text c="dimmed">
                      {formatDistanceToNow(new Date(run.endedAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  )}
                </Group>
              </Card>
            </Link>
          </div>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default JobRuns;
