'use client';

import { UserButton, useUser } from '@clerk/nextjs';

import {
  AppShell,
  Navbar,
  Header,
  Burger,
  Footer,
  MediaQuery,
  useMantineTheme,
  Text,
  Group,
  ThemeIcon,
  UnstyledButton,
  Box,
  Center,
  Title,
  LoadingOverlay,
  Stack,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import { FaClock, FaCheckSquare, FaHammer, FaFolder } from 'react-icons/fa';

export default function Page({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const { user, isLoaded } = useUser();
  const [opened, setOpened] = useState(false);

  if (!isLoaded)
    return (
      <Center mt="lg">
        <Stack>
          <Center>
            <Image src="/logo.png" width="200" height="200" alt="logo" />
          </Center>

          <Title align="center">Nightscan</Title>
        </Stack>
        <LoadingOverlay visible />
      </Center>
    );

  return (
    <>
      <Notifications position="top-right" zIndex={2077} />

      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint={user ? 'sm' : 0}
        asideOffsetBreakpoint="sm"
        navbar={
          user ? (
            <Navbar
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!opened}
              width={{ sm: 200, lg: 300 }}
            >
              <Group spacing={1} px={20}>
                <NavbarItem
                  href="jobs"
                  icon={<FaClock />}
                  label="Jobs"
                  color="green"
                />
                <NavbarItem
                  href="runs"
                  icon={<FaCheckSquare />}
                  label="Runs"
                  color="violet"
                />
                <NavbarItem
                  href="projects"
                  icon={<FaFolder />}
                  label="Projects"
                  color="yellow"
                />
                <NavbarItem
                  href="settings"
                  icon={<FaHammer />}
                  label="Settings"
                  color="blue"
                />
              </Group>
            </Navbar>
          ) : undefined
        }
        footer={
          <Footer height={60} p="md">
            All rights reserved © 2023 Lost Pixel
          </Footer>
        }
        header={
          <Header height={{ base: 50, md: 70 }} p="md">
            <div
              style={{ display: 'flex', alignItems: 'center', height: '100%' }}
            >
              <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>

              <MediaQuery smallerThan="sm" styles={{ display: 'none' }}>
                <Group w="100%" position="apart">
                  <Group>
                    <Image src="/logo.png" width="70" height="70" alt="logo" />
                    <Text weight="500" size="xl">
                      Nightscan
                    </Text>
                  </Group>
                  <UserButton />
                </Group>
              </MediaQuery>
            </div>
          </Header>
        }
      >
        {children}
      </AppShell>
    </>
  );
}

const NavbarItem = ({
  icon,
  label,
  color,
  href,
}: {
  icon: ReactNode;
  label: string;
  color: string;
  href: string;
}) => {
  return (
    <Box w="100%">
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
        href={href}
      >
        <UnstyledButton
          sx={(theme) => ({
            display: 'block',
            width: '100%',
            padding: theme.spacing.xs,
            borderRadius: theme.radius.sm,
            color:
              theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,

            '&:hover': {
              backgroundColor:
                theme.colorScheme === 'dark'
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            },
          })}
        >
          <Group>
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>

            <Text size="sm">{label}</Text>
          </Group>
        </UnstyledButton>
      </Link>
    </Box>
  );
};
