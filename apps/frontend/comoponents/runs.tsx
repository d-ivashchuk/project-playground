'use client';

import { useUser } from '@clerk/nextjs';
import {
  Badge,
  Box,
  Card,
  Group,
  SimpleGrid,
  Skeleton,
  Text,
  Title,
} from '@mantine/core';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { client } from '../client';

import Link from 'next/link';
import { generateRunIcon } from './utils';

const Runs = () => {
  const { user } = useUser();

  if (!user) return <Skeleton />;

  const runsQuery = client.apiJobs.fetchAllRunsForUser.useQuery(
    ['runs', user?.id],
    {
      params: {
        userId: user.id,
      },
    },
    {
      enabled: !!user?.id,
    }
  );

  if (runsQuery.isLoading) return <Skeleton />;
  console.log({ runsQuery });

  return (
    <Box>
      <Title mb={8}>Runs</Title>

      <SimpleGrid>
        {runsQuery.data?.body?.map((run) => (
          <div key={run.id}>
            <Link style={{ textDecoration: 'none' }} href={`/runs/${run.id}`}>
              <Card shadow="xs" padding="xs" radius="md">
                <Group>
                  <div>{generateRunIcon(run.status)}</div>
                  <Text weight={600}>{run.job.name}</Text>
                  <div>{run.job.url}</div>
                  {run.endedAt && (
                    <Text c="dimmed">
                      {formatDistanceToNow(new Date(run.endedAt), {
                        addSuffix: true,
                      })}
                    </Text>
                  )}
                  {run.diffPercentage && (
                    <Badge color="red">{run.diffPercentage}%</Badge>
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

export default Runs;