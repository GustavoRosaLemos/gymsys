'use client';

import InitialScale from '@/animations/InitialScale';
import ActionsBar from '@/app/components/ActionsBar';
import OrderModal from '@/app/components/OrderModal';
import OrderTable from '@/app/components/OrderTable';
import { Tabs } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';

export default function Orders() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Tabs.Panel value="orders">
      <ActionsBar
        buttons={[
          {
            text: 'Novo pedido',
            color: 'green',
            leftSection: <IconPlus />,
            onClick: () => open(),
          },
        ]}
      />
      <InitialScale>
        <OrderTable />
      </InitialScale>
      <OrderModal opened={opened} close={close} />
    </Tabs.Panel>
  );
}
