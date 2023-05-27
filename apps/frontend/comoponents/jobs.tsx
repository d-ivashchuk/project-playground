'use client';

import { useUser } from '@clerk/nextjs';
import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../client';
import {
  RiDeleteBin2Line,
  RiPauseCircleFill,
  RiPlayCircleFill,
} from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';
import {
  AddOrEditJobModal,
  cronJobScheduleOptions,
} from './add-or-edit-job-modal';
import { Job } from '@prisma/client';

export default function Page() {
  const { user, isLoaded } = useUser();
  const queryClient = useQueryClient();

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
  const deleteJobMutation = client.apiJobs.deleteJobById.useMutation();
  const updateJobMutation = client.apiJobs.updateJob.useMutation();

  const handleJobUpdate = ({ job }: { job: Job }) => {
    updateJobMutation.mutate(
      {
        params: {
          id: job.id,
        },
        body: {
          isPaused: !job.isPaused,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['jobs', user?.id]);
        },
      }
    );
  };

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
            <Card key={job.id} shadow="xs" padding="lg" radius="md">
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
                  <Group spacing="xs">
                    <AddOrEditJobModal jobToEdit={job} />

                    <ActionIcon>
                      {job.isPaused ? (
                        <RiPlayCircleFill
                          onClick={() => handleJobUpdate({ job })}
                          size="1.125rem"
                        />
                      ) : (
                        <RiPauseCircleFill
                          onClick={() => handleJobUpdate({ job })}
                          size="1.125rem"
                        />
                      )}
                    </ActionIcon>
                    <ActionIcon>
                      <RiDeleteBin2Line
                        onClick={() => {
                          deleteJobMutation.mutate(
                            {
                              params: {
                                id: job.id,
                              },
                            },
                            {
                              onSuccess: () => {
                                queryClient.invalidateQueries([
                                  'jobs',
                                  user?.id,
                                ]);
                              },
                            }
                          );
                        }}
                        size="1.125rem"
                      />
                    </ActionIcon>
                  </Group>
                </Group>
                <Text color="gray">{job.url}</Text>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}
    </Box>
  );
}
