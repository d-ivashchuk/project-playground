'use client';
import {
  Skeleton,
  Title,
  Text,
  Group,
  Stack,
  Box,
  SegmentedControl,
} from '@mantine/core';
import { client } from '../../../client';
import { useParams } from 'next/navigation';
import { generateRunIcon } from '../../../components/utils';
import { useState } from 'react';

export default function Page() {
  const params = useParams();
  const runId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const [value, setValue] = useState('difference');

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

      <Box mb="sm">
        <SegmentedControl
          value={value}
          onChange={setValue}
          data={[
            { value: 'difference', label: 'Difference' },
            { value: 'previous-run', label: 'Previous run' },
            { value: 'current-run', label: 'Current run' },
            // { value: 'side-by-side', label: 'Side by Side' },
          ]}
        />
      </Box>

      {value === 'difference' && (
        <div>
          {data?.body.diffUrl && (
            <Box>
              <img
                src={data.body.diffUrl as string}
                alt="difference image"
                style={{
                  maxWidth: '100%',
                  height: 'auto',
                }}
              />
            </Box>
          )}
        </div>
      )}
      {value === 'current-run' && (
        <Box>
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
      {value === 'previous-run' && (
        <Box>
          <img
            src={data.body.baselineUrl as string}
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
