'use client';

import { Container, Tabs, rem } from '@mantine/core';

import { IconReportMoney, IconShoppingBag } from '@tabler/icons-react';
import Header from '../components/Header';
import Products from './products';
import Orders from './orders';

export default function Store() {
  const iconStyle = { width: rem(12), height: rem(12) };
  return (
    <Container fluid p={0}>
      <Header />
      <Tabs defaultValue="products">
        <Tabs.List>
          <Tabs.Tab
            value="products"
            leftSection={<IconShoppingBag style={iconStyle} />}
          >
            Produtos
          </Tabs.Tab>
          <Tabs.Tab
            value="orders"
            leftSection={<IconReportMoney style={iconStyle} />}
          >
            Pedidos
          </Tabs.Tab>
        </Tabs.List>
        <Products />
        <Orders />
      </Tabs>
    </Container>
  );
}
