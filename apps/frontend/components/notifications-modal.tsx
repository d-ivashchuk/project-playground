'use client';

import { useDisclosure } from '@mantine/hooks';
import {
  Modal,
  ActionIcon,
  Center,
  Box,
  Group,
  Alert,
  TextInput,
  Title,
  Divider,
  Stack,
  Button,
  ThemeIcon,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';

import { FaBell, FaInfoCircle } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';

import { EmailIntegration, Job, SlackIntegration } from '@prisma/client';

// import { FaSlack, FaDiscord } from 'react-icons/fa';
import { AiFillMail } from 'react-icons/ai';
import { client } from '../client';
import { useForm, zodResolver } from '@mantine/form';
import { undefined, z } from 'zod';

const emailIntegrationSchema = z.object({
  email: z.string(),
});

export const NotificationsModal = ({
  job,
}: {
  job: Job & {
    emailIntegration: EmailIntegration;
    slackIntegration: SlackIntegration;
  };
}) => {
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useUser();

  const emailForm = useForm({
    initialValues: {
      email:
        job.emailIntegrationId && job.emailIntegration?.email
          ? job.emailIntegration?.email
          : undefined,
    },
    validate: zodResolver(emailIntegrationSchema),
  });

  const queryClient = useQueryClient();

  // const createSlackIntegration =
  //   client.apiIntegrations.createSlackIntegration.useMutation();
  const createEmailIntegration =
    client.apiIntegrations.createEmailIntegration.useMutation();

  const updateEmailIntegration =
    client.apiIntegrations.updateEmailIntegration.useMutation();

  console.log({
    x: emailForm.values.email,
    y: job.emailIntegration?.email,
  });

  console.log({
    job,
  });

  return (
    <>
      <Modal
        size="100%"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        opened={opened}
        onClose={close}
        title="Notifications"
        overlayProps={{
          color: 'gray.2',
          opacity: 0.55,
          blur: 3,
        }}
      >
        <Alert mb="sm" icon={<FaInfoCircle size="1rem" />} color="blue">
          Select one or several notification channels to receive alerts when
          there is a change detected.
        </Alert>
        <Group spacing="sm">
          {/* <Box>
            <Center>
              <ActionIcon
                size="xl"
                variant={job.slackIntegrationId ? 'filled' : 'outline'}
                radius="xs"
                color={job.slackIntegrationId ? 'cyan' : 'gray'}
                onClick={() => {
                  if (!job.slackIntegrationId) {
                    createSlackIntegration.mutate(
                      {
                        body: {
                          Job: {
                            connect: {
                              id: job.id,
                            },
                          },
                        },
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries(['jobs', user?.id]);
                        },
                      }
                    );
                  }
                }}
              >
                <FaSlack size="2.125rem" />
              </ActionIcon>
            </Center>
          </Box> */}
          <Box>
            <Center>
              <ActionIcon
                size="xl"
                variant={job.emailIntegrationId ? 'filled' : 'outline'}
                radius="xs"
                color={job.emailIntegrationId ? 'blue' : 'gray'}
                onClick={() => {
                  if (!job.emailIntegrationId) {
                    createEmailIntegration.mutate(
                      {
                        body: {
                          Job: {
                            connect: {
                              id: job.id,
                            },
                          },
                        },
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries(['jobs', user?.id]);
                        },
                      }
                    );
                  }
                }}
              >
                <AiFillMail size="2.125rem" />
              </ActionIcon>
            </Center>
          </Box>
        </Group>
        <Divider my="sm" />
        {job.emailIntegrationId && (
          <Stack spacing={0}>
            <Group spacing="xs">
              <Title size="lg">Email Integration</Title>
              <Button
                disabled={
                  emailForm.values.email === job.emailIntegration?.email
                }
                size="xs"
                onClick={() => {
                  if (job.emailIntegrationId) {
                    updateEmailIntegration.mutate(
                      {
                        params: {
                          id: job.emailIntegrationId,
                        },
                        body: {
                          email: emailForm.values.email as string,
                        },
                      },
                      {
                        onSuccess: () => {
                          queryClient.invalidateQueries(['jobs', user?.id]);
                          notifications.show({
                            color: 'green',
                            title: 'Success',
                            message: 'Successfully updated email integration',
                          });
                        },
                      }
                    );
                  }
                }}
              >
                Save
              </Button>
            </Group>
            <TextInput
              withAsterisk
              size="md"
              data-autofocus
              label="Email"
              placeholder="Email to receive alerts to"
              mt="md"
              {...emailForm.getInputProps('email')}
            />
          </Stack>
        )}
      </Modal>

      <ActionIcon>
        <ThemeIcon
          variant={
            job.emailIntegration?.email || job.slackIntegration?.channel
              ? 'gradient'
              : ''
          }
          gradient={{ from: 'orange', to: 'red' }}
        >
          <FaBell
            color=""
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              open();
            }}
            size="1.125rem"
          />
        </ThemeIcon>
      </ActionIcon>
    </>
  );
};
