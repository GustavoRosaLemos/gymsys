'use client';

import { Container } from '@mantine/core';
import { IconPlus, IconReport } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import InitialScale from '@/animations/InitialScale';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import ActionsBar from '../components/ActionsBar';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

export default function Users() {
  const [opened, { open, close }] = useDisclosure(false);
  const router = useRouter();

  return (
    <Container fluid p={0}>
      <Header />
      <ActionsBar
        buttons={[
          {
            text: 'Novo Usuário',
            color: 'green',
            leftSection: <IconPlus />,
            onClick: open,
          },
          {
            text: 'Gerar relatório de inadimplentes',
            color: 'blue',
            leftSection: <IconReport />,
            onClick: () => router.push('/defaulters'),
          },
        ]}
      />
      <InitialScale delay={0.1}>
        <UserTable />
      </InitialScale>
      <UserModal opened={opened} close={close} user={undefined} />
    </Container>
  );
}
