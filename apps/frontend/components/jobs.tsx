'use client';

import { useUser } from '@clerk/nextjs';
import {
  Badge,
  Box,
  Card,
  Flex,
  Group,
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

  if (!user) return null;

  const jobsQuery = client.apiJobs.fetchAllJobsByUserId.useQuery(
    ['jobs', user?.id],
    {
      params: {
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
        <div>Loading...</div>
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
