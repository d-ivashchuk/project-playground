'use client';

import { Box, Button, createStyles, Title, Input, Stack } from '@mantine/core';
import { client } from '../client';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
  },

  input: {
    height: 'auto',
    paddingTop: 18,
  },

  label: {
    position: 'absolute',
    pointerEvents: 'none',
    fontSize: theme.fontSizes.xs,
    paddingLeft: theme.spacing.sm,
    paddingTop: Number(theme.spacing.sm) / 2,
    zIndex: 1,
  },
}));

export function Test() {
  // You can add these classes as classNames to any Mantine input, it will work the same
  const { classes } = useStyles();
  const postsQuery = client.fetchAllPosts.useQuery(['posts']);
  const queryClient = useQueryClient();
  const createPostMutation = client.createPost.useMutation();

  const [title, setTitle] = useState('');

  return (
    <Box p={8}>
      {postsQuery.isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {postsQuery.data?.body.map((post) => (
            <Title key={post.id}>{post.title}</Title>
          ))}
        </div>
      )}
      <Stack>
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Post title"
        />
        <Button
          onClick={() => {
            createPostMutation.mutate(
              {
                body: {
                  title,
                  importantFieldWithoutDefault: 'xxx',
                },
              },
              {
                onSuccess(data, variables, context) {
                  setTitle('');
                  queryClient.invalidateQueries({ queryKey: ['posts'] });
                },
              }
            );
          }}
        >
          Add a post
        </Button>
      </Stack>
    </Box>
  );
}
