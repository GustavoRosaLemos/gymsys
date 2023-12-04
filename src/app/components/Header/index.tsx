'use client';

import { Button, Flex, Group, Paper, Text } from '@mantine/core';
import {
  IconActivity,
  IconGymnastics,
  IconShoppingBag,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <Paper shadow="xl" p="sm">
      <Flex align="center" h={80}>
        <Group gap="xl" h="100%">
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
          <Group>
            <Button
              c="font-weak"
              leftSection={<IconUser size={14} />}
              variant="default"
              size="md"
              onClick={() => router.push('/users')}
            >
              Usuários
            </Button>
            <Button
              c="font-weak"
              leftSection={<IconActivity size={14} />}
              variant="default"
              size="md"
            >
              Atividades
            </Button>
            <Button
              c="font-weak"
              leftSection={<IconShoppingBag size={14} />}
              variant="default"
              size="md"
            >
              Loja
            </Button>
          </Group>
        </Group>
      </Flex>
    </Paper>
  );
}
