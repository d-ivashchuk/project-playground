'use client';

import { useUser } from '@clerk/nextjs';
import {
  ActionIcon,
  Box,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../client';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';
import { AddNewJobModal } from './add-new-job-modal';

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

  return (
    <Box>
      <Group spacing="sm" mb="md">
        <Title mb={8}>Jobs</Title>
        <AddNewJobModal />
      </Group>
      {jobsQuery.isLoading ? (
        <div>Loading...</div>
      ) : (
        <Stack>
          {jobsQuery.data?.body.map((job) => (
            <Card key={job.id} shadow="xs" padding="lg" radius="md">
              <Stack>
                <Group position="apart">
                  <Text>
                    {job.name} - {job.schedule}
                  </Text>
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
                              queryClient.invalidateQueries(['jobs', user?.id]);
                            },
                          }
                        );
                      }}
                      size="1.125rem"
                    />
                  </ActionIcon>
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
