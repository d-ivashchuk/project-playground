import { Group, ActionIcon } from '@mantine/core';
import React from 'react';
import {
  RiPlayCircleFill,
  RiPauseCircleFill,
  RiDeleteBin2Line,
} from 'react-icons/ri';
import { AddOrEditJobModal } from './add-or-edit-job-modal';
import { NotificationsModal } from './notifications-modal';
import { EmailIntegration, Job, SlackIntegration } from '@prisma/client';
import { client } from '../client';
import { useUser } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';

const JobActions = ({
  job,
}: {
  job: Job & {
    emailIntegration: EmailIntegration;
    slackIntegration: SlackIntegration;
  };
}) => {
  const queryClient = useQueryClient();
  const { user } = useUser();

  const deleteJobMutation = client.apiJobs.deleteJobById.useMutation();
  const updateJobMutation = client.apiJobs.updateJob.useMutation();

  const handleJobUpdate = (event: React.MouseEvent, job: Job) => {
    event.stopPropagation();
    event.preventDefault();
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
          queryClient.invalidateQueries(['job', user?.id, job.id]);
        },
      }
    );
  };

  const handleJobDelete = (event: React.MouseEvent, job: Job) => {
    event.stopPropagation();
    deleteJobMutation.mutate(
      {
        params: {
          id: job.id,
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['jobs', user?.id]);
          queryClient.invalidateQueries(['job', user?.id, job.id]);
        },
      }
    );
  };

  return (
    <Group spacing="xs">
      <NotificationsModal job={job} />
      <AddOrEditJobModal jobToEdit={job} />

      <ActionIcon onClick={(event) => handleJobUpdate(event, job)}>
        {job.isPaused ? (
          <RiPlayCircleFill size="1.125rem" />
        ) : (
          <RiPauseCircleFill size="1.125rem" />
        )}
      </ActionIcon>
      <ActionIcon onClick={(event) => handleJobDelete(event, job)}>
        <RiDeleteBin2Line size="1.125rem" />
      </ActionIcon>
    </Group>
  );
};

export default JobActions;
