'use client';
import {
  Skeleton,
  Title,
  Text,
  Group,
  Stack,
  Box,
  Divider,
  Space,
  Badge,
  Card,
  Flex,
  Tooltip,
} from '@mantine/core';
import { client } from '../../../client';
import { useParams } from 'next/navigation';
import ProjectActions from '../../../components/project-actions';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { cronJobScheduleOptions } from '../../../components/add-or-edit-job-modal';
import JobActions from '../../../components/job-actions';
import { generateRunIcon } from '../../../components/utils';

export default function Page() {
  const params = useParams();

  const projectId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  if (!projectId) return <Skeleton />;

  const { data, isLoading } = client.apiJobs.fetchProjectById.useQuery(
    ['project', projectId],
    {
      params: {
        id: projectId,
      },
    },
    {
      enabled: !!projectId,
    }
  );

  if (isLoading)
    return (
      <Stack>
        <Group>
          <Skeleton h="xl" w="150px" />
          <Skeleton h="25px" w="25px" />
        </Group>
        <Skeleton h="xl" w="150px" />
      </Stack>
    );

  return data?.body ? (
    <div>
      <Box mb="lg">
        <Stack spacing={4}>
          <Group>
            <Title>{data?.body.name}</Title>
            <ProjectActions project={data.body} />
          </Group>

          <Space h="xs" />
          <Divider />
          <Space h="xs" />
          {data?.body.jobs.length ? (
            <Stack spacing="md">
              {data.body.jobs.map((job) => {
                return (
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
                );
              })}
            </Stack>
          ) : (
            <Text>No jobs found</Text>
          )}
        </Stack>
      </Box>
    </div>
  ) : null;
}
