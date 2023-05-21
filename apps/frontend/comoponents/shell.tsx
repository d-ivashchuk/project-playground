'use client';

import { UserButton } from '@clerk/nextjs';

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
} from '@mantine/core';
import Link from 'next/link';
import { ReactNode, useState } from 'react';

import { FaClock, FaCheckSquare, FaHammer, FaFolder } from 'react-icons/fa';

export default function Page({ children }: { children: ReactNode }) {
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return (
    <>
      <AppShell
        styles={{
          main: {
            background:
              theme.colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
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
        }
        footer={
          <Footer height={60} p="md">
            Application footer
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

              <Group w="100%" position="apart">
                <Text>Lost Pixel Scout</Text>
                <UserButton />
              </Group>
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
      <Link
        style={{
          textDecoration: 'none',
          color: 'inherit',
        }}
        href={href}
      >
        <Group>
          <ThemeIcon color={color} variant="light">
            {icon}
          </ThemeIcon>

          <Text size="sm">{label}</Text>
        </Group>
      </Link>
    </UnstyledButton>
  );
};
