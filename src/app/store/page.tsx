'use client';

import { Container, Tabs, rem } from '@mantine/core';

import { IconBrandProducthunt } from '@tabler/icons-react';
import Header from '../components/Header';
import Products from './products';

export default function Store() {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Container fluid p={0}>
      <Header />
      <Tabs defaultValue="products">
        <Tabs.List>
          <Tabs.Tab
            value="products"
            leftSection={<IconBrandProducthunt style={iconStyle} />}
          >
            Produtos
          </Tabs.Tab>
          <Tabs.Tab
            value="sells"
            leftSection={<IconBrandProducthunt style={iconStyle} />}
          >
            Vendas
          </Tabs.Tab>
        </Tabs.List>
        <Products />
        <Tabs.Panel value="sells">Vendas</Tabs.Panel>
      </Tabs>
    </Container>
  );
}
