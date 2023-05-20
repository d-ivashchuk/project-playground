'use client';

import { useUser } from '@clerk/nextjs';
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { client } from '../client';
import { FaPlusCircle } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';
import { useQueryClient } from '@tanstack/react-query';

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
  const createJobMutation = client.apiJobs.createJob.useMutation();
  const deleteJobMutation = client.apiJobs.deleteJobById.useMutation();

  return (
    <Box>
      <Button
        leftIcon={<FaPlusCircle />}
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        onClick={() => {
          createJobMutation.mutate(
            {
              body: {
                name: 'New job',
                userId: user.id,
                schedule: '* * * * *', // every minute
                url: 'https://testimonial.to',
              },
            },
            {
              onSuccess: () => {
                queryClient.invalidateQueries(['jobs', user?.id]);
              },
            }
          );
        }}
      >
        Add new job
      </Button>
      <Title mb={8}>Jobs</Title>
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
