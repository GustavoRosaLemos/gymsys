'use client';

import { Container } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import InitialScale from '@/animations/InitialScale';
import { useDisclosure } from '@mantine/hooks';
import Header from '../components/Header';
import ActionsBar from '../components/ActionsBar';
import ActivitiesTable from '../components/ActivitiesTable';
import ActivityModal from '../components/ActivityModal';

export default function Activities() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Container fluid p={0}>
      <Header />
      <ActionsBar
        buttons={[
          {
            text: 'Nova Atividade',
            color: 'green',
            leftSection: <IconPlus />,
            onClick: () => open(),
          },
        ]}
      />
      <InitialScale>
        <ActivitiesTable />
      </InitialScale>
      <ActivityModal opened={opened} close={close} activity={undefined} />
    </Container>
  );
}
