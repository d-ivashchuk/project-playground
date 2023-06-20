import { useDisclosure } from '@mantine/hooks';
import {
  Button,
  Flex,
  Group,
  Modal,
  Select,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
  Space,
  ActionIcon,
  ColorPicker,
  MultiSelect,
} from '@mantine/core';
import { z } from 'zod';
import { FaEdit, FaPlusCircle } from 'react-icons/fa';
import { useUser } from '@clerk/nextjs';
import { useQueryClient } from '@tanstack/react-query';
import { useForm, zodResolver } from '@mantine/form';
import { client } from '../client';
import { Job, Project } from '@prisma/client';

type FormValues = {
  name: string;
  colorCode: string;
  jobs: string[];
};

export const AddOrEditProjectModal = ({
  projectToEdit = null,
}: {
  projectToEdit?: (Project & { jobs: Job[] }) | null;
}) => {
  const queryClient = useQueryClient();
  const [opened, { open, close }] = useDisclosure(false);
  const { user } = useUser();

  const theme = useMantineTheme();

  const jobsQuery = client.apiJobs.fetchAllJobsByUserId.useQuery(
    ['jobs', user?.id],
    {
      params: {
        //@ts-expect-error - user.id is not undefined
        userId: user.id,
      },
    },
    {
      enabled: !!user?.id,
    }
  );
  const createProjectMutation = client.apiJobs.createProject.useMutation();
  const updateProjectMutation = client.apiJobs.updateProject.useMutation(); // added update mutation

  const formSchema = z.object({
    name: z.string().optional(),
    colorCode: z.string(),
    jobs: z.array(z.string()).optional(),
  });

  const form = useForm({
    initialValues: {
      name: projectToEdit ? projectToEdit.name : 'New Project',
      colorCode: projectToEdit ? projectToEdit.colorCode : '#BADA55',
      jobs: projectToEdit ? projectToEdit.jobs?.map((job) => job.id) : [],
    },
    validate: zodResolver(formSchema),
  });

  const handleSubmit = async (values: FormValues) => {
    if (user) {
      const data = {
        body: {
          name: values.name,
          colorCode: values.colorCode,
          userId: user?.id,
          jobs: {
            connect: values.jobs.map((jobId) => ({ id: jobId })),
          },
        },
      };

      if (projectToEdit) {
        console.log('xxx');
        // Update existing job
        await updateProjectMutation.mutateAsync({
          params: {
            id: projectToEdit.id, // assume `projectToEdit` has an `id` field
          },
          ...data,
        });
        console.log('yyy');
      } else {
        // Create new job
        await createProjectMutation.mutateAsync(data);
      }
      queryClient.invalidateQueries(['projects', user?.id]);
      close();
    }
  };

  return (
    <>
      <Modal
        size="100%"
        withinPortal
        opened={opened}
        onClose={close}
        title={projectToEdit ? 'Edit project' : 'Create new project'}
        overlayProps={{
          color:
            theme.colorScheme === 'dark'
              ? theme.colors.dark[9]
              : theme.colors.gray[2],
          opacity: 0.55,
          blur: 3,
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Stack>
            <TextInput
              withAsterisk
              size="md"
              data-autofocus
              label="Project name"
              placeholder="Provide a name for the project"
              mt="md"
              {...form.getInputProps('name')}
            />
            <MultiSelect
              data={
                jobsQuery.data?.body.map((job) => ({
                  value: job.id,
                  label: job.name,
                })) ?? []
              }
              searchable
              nothingFound="Nothing found"
              label="Pick jobs for the project"
              placeholder="Pick all the jobs you would like to group under this project"
              {...form.getInputProps('jobs')}
            />
            <Stack>
              <Text weight="500">Color code</Text>
              <ColorPicker
                format="hex"
                swatches={[
                  '#25262b',
                  '#868e96',
                  '#fa5252',
                  '#e64980',
                  '#be4bdb',
                  '#7950f2',
                  '#4c6ef5',
                  '#228be6',
                  '#15aabf',
                  '#12b886',
                  '#40c057',
                  '#82c91e',
                  '#fab005',
                  '#fd7e14',
                ]}
                {...form.getInputProps('colorCode')}
              />
            </Stack>

            <Space h="md" />
          </Stack>

          <Flex justify="end">
            <Button
              fullWidth
              leftIcon={<FaPlusCircle />}
              variant="gradient"
              size="md"
              gradient={{ from: 'yellow', to: 'red', deg: 105 }}
              onClick={() => {
                const validation = form.validate();
                if (!validation.hasErrors) {
                  handleSubmit(form.values as FormValues);
                }
              }}
            >
              {projectToEdit ? 'Update project' : 'Add new project'}
            </Button>
          </Flex>
        </form>
      </Modal>
      {projectToEdit ? (
        <ActionIcon>
          <FaEdit
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              open();
            }}
            size="1.125rem"
          />
        </ActionIcon>
      ) : (
        <Button
          leftIcon={<FaPlusCircle />}
          variant="gradient"
          gradient={{ from: 'yellow', to: 'red', deg: 105 }}
          onClick={open}
        >
          Add new Project
        </Button>
      )}
    </>
  );
};
