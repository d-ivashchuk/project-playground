'use client';

import { useUser } from '@clerk/nextjs';
import {
  Badge,
  Box,
  Card,
  Flex,
  Group,
  Skeleton,
  Stack,
  Text,
  Title,
  Tooltip,
} from '@mantine/core';
import { client } from '../client';

import {
  AddOrEditJobModal,
  cronJobScheduleOptions,
} from './add-or-edit-job-modal';

import Link from 'next/link';
import JobActions from './job-actions';
import { generateRunIcon } from './utils';
import { formatDistanceToNow } from 'date-fns';

export default function Page() {
  const { user } = useUser();

  const jobsQuery = client.apiJobs.fetchAllJobsByUserId.useQuery(
    ['jobs', user?.id],
    {
      params: {
        //@ts-expect-error - clerk user id is a string
        userId: user.id,
      },
    },
    {
      enabled: !!user?.id,
    }
  );

  return (
    <Box>
      <Group spacing="sm" mb="md">
        <Title mb={8}>Jobs</Title>
        <AddOrEditJobModal />
      </Group>
      {jobsQuery.isLoading ? (
        <Stack spacing="md">
          <Skeleton w="full" h="xl" />
          <Skeleton w="full" h="xl" />
          <Skeleton w="full" h="xl" />
        </Stack>
      ) : (
        <Stack>
          {jobsQuery.data?.body.map((job) => (
            <Link
              key={job.id}
              style={{ textDecoration: 'none' }}
              href={`/jobs/${job.id}`}
            >
              <Card shadow="xs" padding="lg" radius="md">
                <Stack>
                  <Group position="apart">
                    <Group spacing="xs">
                      <Text>{job.name}</Text>
                      <Text c="grape.4" fw={500}>
                        {
                          cronJobScheduleOptions.find(
                            (v) => v.value === job.schedule
                          )?.label
                        }
                      </Text>
                      {job.isPaused && <Badge>Paused</Badge>}
                    </Group>

                    <JobActions job={job} />
                  </Group>
                  <Flex justify="space-between">
                    <Text color="gray">{job.url}</Text>
                    <Group position="apart" spacing="xs">
                      {job.runs.map((run) => (
                        <div key={run.id}>
                          <Tooltip
                            label={formatDistanceToNow(
                              new Date(run.startedAt),
                              {
                                addSuffix: true,
                              }
                            )}
                          >
                            {generateRunIcon(run.status)}
                          </Tooltip>
                        </div>
                      ))}
                    </Group>
                  </Flex>
                </Stack>
              </Card>
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
