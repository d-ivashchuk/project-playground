'use client';
import {
  Skeleton,
  Title,
  Text,
  Group,
  Stack,
  Box,
  Header,
} from '@mantine/core';
import { client } from '../../../client';
import { useParams } from 'next/navigation';
import { generateRunIcon } from '../../../components/utils';

export default function Page() {
  const params = useParams();
  const runId = Array.isArray(params?.id) ? params?.id[0] : params?.id;

  if (!runId) return <Skeleton />;

  const { data, isLoading } = client.apiJobs.fetchRunById.useQuery(
    ['run', runId],
    {
      params: {
        id: runId,
      },
    },
    {
      enabled: !!runId,
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
  console.log({ data });

  return data?.body ? (
    <div>
      <Box mb="lg">
        <Group>
          <Title>{data?.body.job.name}</Title>
          {generateRunIcon(data?.body.status)}
        </Group>
        <Text size="lg" c="dimmed">
          {data?.body.job.url}
        </Text>
      </Box>

      {data?.body.diffUrl ? (
        <Box>
          <Text size="lg" weight={'bolder'} mb="md">
            Difference
          </Text>
          <img
            src={data.body.diffUrl as string}
            alt="difference image"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Box>
      ) : (
        <Box>
          <Text size="lg" weight={'bolder'} mb="md">
            Baseline
          </Text>
          <img
            src={data.body.screenshotUrl as string}
            alt="Baseline image"
            style={{
              maxWidth: '100%',
              height: 'auto',
            }}
          />
        </Box>
      )}
    </div>
  ) : null;
}
