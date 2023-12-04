'use client';

import { Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/Header';
import ActionsBar from '../components/ActionsBar';
import UserTable from '../components/UserTable';
import UserModal from '../components/UserModal';

export default function Users() {
  const [opened, { open, close }] = useDisclosure(false);

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
        ]}
      />
      <UserTable />
      <UserModal opened={opened} close={close} />
    </Container>
  );
}
