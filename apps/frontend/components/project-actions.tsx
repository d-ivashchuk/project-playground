import { Group, ActionIcon } from '@mantine/core';
import React from 'react';
import { RiDeleteBin2Line } from 'react-icons/ri';

import { Job, Project } from '@prisma/client';
import { client } from '../client';
import { useUser } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { AddOrEditProjectModal } from './add-or-edit-project-modal';

const ProjectActions = ({
  project,
}: {
  project: Project & { jobs: Job[] };
}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteProjectMutation = client.apiJobs.deleteProjectById.useMutation();

  const handleProjectDelete = (event: React.MouseEvent, project: Project) => {
    event.stopPropagation();
    event.preventDefault();
    deleteProjectMutation.mutate(
      {
        params: {
          id: project.id,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['projects', user?.id]);
          queryClient.invalidateQueries(['project', user?.id, project.id]);
        },
      }
    );
  };

  return (
    <Group spacing="xs">
      <AddOrEditProjectModal projectToEdit={project} />

      <ActionIcon onClick={(event) => handleProjectDelete(event, project)}>
        <RiDeleteBin2Line size="1.125rem" />
      </ActionIcon>
    </Group>
  );
};

export default ProjectActions;
