import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Text,
  Stack,
  TextInput,
  useMantineTheme,
  Space,
} from '@mantine/core';
import { z } from 'zod';
import { FaPlusCircle } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { client } from '../client';

type FormValues = {
  urlToMonitor: string;
  cronJobSchedule: string;
  sensitivity: string;
  size: string;
  name: string;
};

export const AddNewJobModal = () => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useUser();

  const theme = useMantineTheme();
  const createJobMutation = client.apiJobs.createJob.useMutation();

  const formSchema = z.object({
    urlToMonitor: z.string().refine(
      (value) => {
        try {
          new URL(value.includes('://') ? value : 'http://' + value);
          return true;
        } catch {
          return false;
        }
      },
      {
        message: 'Invalid URL',
      }
    ),
    name: z.string().optional(),
    cronJobSchedule: z.string(),
    sensitivity: z.string(),
    size: z.string(),
  });

  const form = useForm({
    initialValues: {
      urlToMonitor: '',
      cronJobSchedule: '0 * * * *',
      sensitivity: '0.01',
      size: 'full',
      name: 'New Job',
    },
    validate: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    if (user) {
      console.log({
        body: {
          name: values.name,
          userId: user.id,
          schedule: values.cronJobSchedule,
          url: values.urlToMonitor.includes('://')
            ? values.urlToMonitor
            : 'https://' + values.urlToMonitor,
        },
      });
      createJobMutation.mutate(
        {
          body: {
            name: values.name,
            userId: user.id,
            schedule: values.cronJobSchedule,
            url: values.urlToMonitor.includes('://')
              ? values.urlToMonitor
              : 'https://' + values.urlToMonitor,
          },
        },
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['jobs', user?.id]);
          },
        }
      );
    }
  };

  return (
    <>
      <Modal
        size="100%"
        opened={opened}
        onClose={close}
        title="Create new job"
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const validation = form.validate();
            if (!validation.hasErrors) {
              handleSubmit(form.values as FormValues);
            }
          }}
        >
          <Stack>
            <TextInput
              withAsterisk
              size="md"
              data-autofocus
              label="Url to monitor"
              placeholder="Provide a url to monitor e.g. www.lost-pixel.com"
              mt="md"
              {...form.getInputProps('urlToMonitor')}
            />

            <Select
              withinPortal
              label="Select Cron Job Schedule"
              placeholder="Pick one"
              defaultValue="0 * * * *"
              size="md"
              {...form.getInputProps('cronJobSchedule')}
              data={[
                { value: '* * * * *', label: 'Every Minute' },
                { value: '*/5 * * * *', label: 'Every 5 Minutes' },
                { value: '*/30 * * * *', label: 'Every 30 Minutes' },
                { value: '0 * * * *', label: 'Every Hour' },
                { value: '0 */6 * * *', label: 'Every 6 Hours' },
                { value: '0 */12 * * *', label: 'Every 12 Hours' },
                { value: '0 0 * * *', label: 'Every Day' },
                { value: '0 0 * * 0', label: 'Every Week' },
                { value: '0 0 1 * *', label: 'Every Month' },
              ]}
            />

            <Group>
              <Select
                withinPortal
                label="Sensitivity"
                placeholder="What change in % should trigger a notification"
                defaultValue="0.01"
                size="md"
                {...form.getInputProps('sensitivity')}
                data={[
                  { value: '0.01', label: '1%' },
                  { value: '0.05', label: '5%' },
                  { value: '0.1', label: '10%' },
                  { value: '0.2', label: '20%' },
                  { value: '0.5', label: '50%' },
                ]}
              />

              <Select
                withinPortal
                label="Size"
                placeholder="What portion of the page shall be monitored"
                defaultValue="full"
                size="md"
                {...form.getInputProps('size')}
                data={[{ value: 'full', label: 'Whole page' }]}
              />
            </Group>
            <Space h="md" />
          </Stack>

          <Flex justify="end">
            <Button
              fullWidth
              leftIcon={<FaPlusCircle />}
              variant="gradient"
              size="md"
              gradient={{ from: 'teal', to: 'lime', deg: 105 }}
              type="submit"
            >
              Add new job
            </Button>
          </Flex>
        </form>
      </Modal>

      <Group position="center">
        <Button
          leftIcon={<FaPlusCircle />}
          variant="gradient"
          gradient={{ from: 'teal', to: 'lime', deg: 105 }}
          onClick={open}
        >
          Add new job
        </Button>
      </Group>
    </>
  );
};
