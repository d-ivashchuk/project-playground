'use client';
import {
  Skeleton,
  Title,
  Text,
  Group,
  Stack,
  Box,
  Badge,
  Divider,
  Space,
} from '@mantine/core';
import { client } from '../../../client';
import { useParams } from 'next/navigation';
import { cronJobScheduleOptions } from '../../../components/add-or-edit-job-modal';
import JobActions from '../../../components/job-actions';
import { useUser } from '@clerk/nextjs';
import JobRuns from './job-runs';

export default function Page() {
  const params = useParams();
  const { user } = useUser();

  const jobId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  if (!jobId) return <Skeleton />;

  const { data, isLoading } = client.apiJobs.fetchJobById.useQuery(
    ['job', user?.id, jobId],
    {
      params: {
        id: jobId,
      },
    },
    {
      enabled: !!jobId,
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
            <JobActions job={data.body} />
          </Group>
          <Group>
            <Text c="grape.4" fw={500}>
              {
                cronJobScheduleOptions.find(
                  (v) => v.value === data.body?.schedule
                )?.label
              }
            </Text>
            {data.body?.isPaused && <Badge>Paused</Badge>}
          </Group>
          <Group>
            <Text color="gray">{data.body?.url}</Text>
          </Group>
          <Space h="xs" />
          <Divider />
          <Space h="xs" />
          <JobRuns jobId={data.body.id} />
        </Stack>
      </Box>
    </div>
  ) : null;
}
