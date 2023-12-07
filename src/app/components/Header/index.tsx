'use client';

import InitialScale from '@/animations/InitialScale';
import { Button, Flex, Group, Paper, Text } from '@mantine/core';
import {
  IconActivity,
  IconGymnastics,
  IconShoppingBag,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface HeaderProps {
  hideButtons?: boolean;
}

export default function Header({ hideButtons }: HeaderProps) {
  const router = useRouter();
  return (
    <Paper
      shadow="xl"
      p="sm"
      style={{ zIndex: '1', minHeight: '80px' }}
      h="10vh"
    >
      <Flex align="center" h="100%">
        <Group gap="xl" h="100%" w="100vw">
          <InitialScale>
            <Text
              fw="bold"
              size="40px"
              c="font-weak"
              style={{ cursor: 'pointer' }}
              onClick={() => router.push('/')}
            >
              GYM
              <IconGymnastics size={40} />
              YS
            </Text>
          </InitialScale>
          {!hideButtons && (
            <Group gap="xl">
              <InitialScale delay={0.1}>
                <Button
                  c="font-weak"
                  leftSection={<IconUser size={14} />}
                  variant="default"
                  size="md"
                  onClick={() => router.push('/users')}
                >
                  Usuários
                </Button>
              </InitialScale>
              <InitialScale delay={0.2}>
                <Button
                  c="font-weak"
                  leftSection={<IconActivity size={14} />}
                  variant="default"
                  size="md"
                  onClick={() => router.push('/activities')}
                >
                  Atividades
                </Button>
              </InitialScale>
              <InitialScale delay={0.3}>
                <Button
                  c="font-weak"
                  leftSection={<IconShoppingBag size={14} />}
                  variant="default"
                  size="md"
                  onClick={() => router.push('/store')}
                >
                  Loja
                </Button>
              </InitialScale>
            </Group>
          )}
        </Group>
      </Flex>
    </Paper>
  );
}
