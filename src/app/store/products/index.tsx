'use client';

import { Tabs } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import InitialScale from '@/animations/InitialScale';
import { useDisclosure } from '@mantine/hooks';
import ActionsBar from '../../components/ActionsBar';
import ProductsTable from '../../components/ProductsTable';
import ProductModal from '../../components/ProductModal';

export default function Products() {
  const [opened, { open, close }] = useDisclosure(false);
  return (
    <Tabs.Panel value="products">
      <ActionsBar
        buttons={[
          {
            text: 'Novo produto',
            color: 'green',
            leftSection: <IconPlus />,
            onClick: () => open(),
          },
        ]}
      />
      <InitialScale>
        <ProductsTable />
      </InitialScale>
      <ProductModal opened={opened} close={close} product={undefined} />
    </Tabs.Panel>
  );
}
