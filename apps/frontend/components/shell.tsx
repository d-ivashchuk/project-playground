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
  Space,
  Flex,
  ActionIcon,
} from '@mantine/core';
import { matches } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import { Notifications } from '@mantine/notifications';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import {
  FaClock,
  FaCheckSquare,
  FaHammer,
  FaFolder,
  FaArrowAltCircleLeft,
  FaArrowAltCircleRight,
} from 'react-icons/fa';

export default function Page({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const { user, isLoaded } = useUser();
  const [opened, setOpened] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const matches = useMediaQuery('(max-width: 767px)');

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
        navbarOffsetBreakpoint={user ? (collapsed ? '70px' : '200px') : 0}
        asideOffsetBreakpoint="760px"
        navbar={
          user ? (
            <Navbar
              p="xs"
              hiddenBreakpoint="sm"
              hidden={!opened}
              style={{
                transition: 'width 0.2s ease',
              }}
              width={{ sm: collapsed ? '70px' : '200px' }}
            >
              <Flex
                style={{ height: '100%' }}
                direction="column"
                px={0}
                justify="space-between"
              >
                <Box>
                  <NavbarItem
                    href="jobs"
                    icon={<FaClock />}
                    label="Jobs"
                    color="green"
                    collapsed={collapsed}
                  />
                  <NavbarItem
                    href="runs"
                    icon={<FaCheckSquare />}
                    label="Runs"
                    color="violet"
                    collapsed={collapsed}
                  />
                  <NavbarItem
                    href="projects"
                    icon={<FaFolder />}
                    label="Projects"
                    color="yellow"
                    collapsed={collapsed}
                  />
                  <NavbarItem
                    href="settings"
                    icon={<FaHammer />}
                    label="Settings"
                    color="blue"
                    collapsed={collapsed}
                  />
                </Box>
                <Box
                  style={{
                    padding: '0.5rem',
                  }}
                >
                  <ActionIcon
                    onClick={() => setCollapsed((c) => !c)}
                    variant="filled"
                    color="gray"
                  >
                    {collapsed ? (
                      <FaArrowAltCircleRight size="1rem" />
                    ) : (
                      <FaArrowAltCircleLeft size="1rem" />
                    )}
                  </ActionIcon>
                </Box>
              </Flex>
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
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              {matches ? (
                <>
                  <Burger
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    size="sm"
                    color={theme.colors.gray[6]}
                    mr="xl"
                  />
                  <Box>
                    <Image src="/logo.png" width="50" height="50" alt="logo" />
                  </Box>
                </>
              ) : (
                <Group w="100%" position="apart">
                  <Group>
                    <Image src="/logo.png" width="50" height="50" alt="logo" />
                    <Text weight="500" size="xl" pos="relative" left="-15px">
                      Nightscan
                    </Text>
                  </Group>
                  <UserButton />
                </Group>
              )}
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
  collapsed,
}: {
  icon: ReactNode;
  label: string;
  color: string;
  href: string;
  collapsed: boolean;
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
          {collapsed ? (
            <ThemeIcon color={color} variant="light">
              {icon}
            </ThemeIcon>
          ) : (
            <Group>
              <ThemeIcon color={color} variant="light">
                {icon}
              </ThemeIcon>

              <Text size="sm">{label}</Text>
            </Group>
          )}
        </UnstyledButton>
      </Link>
    </Box>
  );
};
