'use client';

import { useUser } from '@clerk/nextjs';
import { Box, Card, Group, Skeleton, Stack, Text, Title } from '@mantine/core';
import { client } from '../client';

import Link from 'next/link';
import { AddOrEditProjectModal } from './add-or-edit-project-modal';
import ProjectActions from './project-actions';

export default function Projects() {
  const { user } = useUser();

  if (!user) return null;

  const projectsQuery = client.apiJobs.fetchAllProjectsByUserId.useQuery(
    ['projects', user?.id],
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
        <Title mb={8}>Projects</Title>
        <AddOrEditProjectModal />
      </Group>
      {projectsQuery.isLoading ? (
        <Stack spacing="md">
          <Skeleton w="full" h="xl" />
          <Skeleton w="full" h="xl" />
          <Skeleton w="full" h="xl" />
        </Stack>
      ) : (
        <Stack>
          {projectsQuery.data?.body.map((project) => (
            <Link
              key={project.id}
              style={{ textDecoration: 'none' }}
              href={`/projects/${project.id}`}
            >
              <Card
                style={{
                  borderBottom: `4px solid ${project.colorCode}`,
                }}
                shadow="xs"
                padding="lg"
                radius="md"
              >
                <Stack>
                  <Group position="apart">
                    <Stack spacing={2}>
                      <Group spacing="xs">
                        <Text size="lg">{project.name}</Text>
                      </Group>
                      <Text color="gray">{project.jobs.length} jobs</Text>
                    </Stack>

                    <ProjectActions project={project} />
                  </Group>
                </Stack>
              </Card>
            </Link>
          ))}
        </Stack>
      )}
    </Box>
  );
}
