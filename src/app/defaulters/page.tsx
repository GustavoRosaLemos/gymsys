'use client';

import {
  Button,
  Container,
  Group,
  LoadingOverlay,
  Stack,
  Text,
} from '@mantine/core';
import { useEffect, useState } from 'react';
import { requestGetDefaulters } from '@/service/user';
import { notifications } from '@mantine/notifications';
import { User } from '@/type/user';
import { requestUserDebitOrders } from '@/service/order';
import { Order } from '@/type/order';
import { getPriceLabel } from '@/utils';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Table from '../components/Table';

export default function DefaultersPage() {
  const [defaulters, setDefaults] = useState<User[]>([]);
  const [defaultersInfo, setDefaultersInfo] = useState<
    {
      fullname: string;
      email: string;
      phone: string;
      debit: number;
    }[]
  >([]);
  const [totalDebit, setTotalDebit] = useState(0);
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  useEffect(() => {
    setLoading(true);
    setDefaults([]);
    requestGetDefaulters()
      .then((v) => {
        setDefaults(v);
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por inadimplentes',
          color: 'red',
        })
      );
  }, []);

  useEffect(() => {
    setDefaultersInfo([]);
    const requests = defaulters.map((d) => {
      if (d.id) {
        return requestUserDebitOrders(Number(d.id)).then((orders: Order[]) => {
          const userOrders = orders.map((o) => o.total);
          if (userOrders && userOrders.length > 0) {
            return {
              fullname: d.fullname,
              email: d.email,
              phone: d.phone,
              debit: orders.map((o) => o.total).reduce((a, b) => a + b),
            };
          }
          return null;
        });
      }
      return null;
    });

    Promise.all(requests)
      .then((results) => {
        const filteredResults = results.filter(
          (
            result
          ): result is {
            fullname: string;
            debit: number;
            phone: string;
            email: string;
          } => result !== null
        );
        const filteredDebits = filteredResults.map((f) => f.debit);
        setTotalDebit(
          filteredDebits && filteredDebits.length > 0
            ? filteredDebits.reduce((a, b) => a + b)
            : 0
        );
        setDefaultersInfo(filteredResults);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user debit orders:', error);
        notifications.show({
          message: 'Falha ao buscar por inadimplentes.',
          color: 'red',
        });
        setLoading(false);
      });
  }, [defaulters]);

  return (
    <Container fluid p={0}>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Header hideButtons />
      <Container fluid p={20}>
        <Stack>
          <Text fw="bold" size="20px" c="font-weak">
            Relatório de inadimplentes
          </Text>
          <Table
            cols={['Nome', 'Email', 'Contato', 'Total devido']}
            rows={defaultersInfo.map((d) => [
              d.fullname,
              d.email,
              d.phone,
              getPriceLabel(d.debit),
            ])}
          />
          <Group justify="center">
            <Text fw="bold" size="20px" c="font-weak">
              Total mensalidades atrasadas: {getPriceLabel(totalDebit)}
            </Text>
          </Group>
          <Group>
            <Button color="red" onClick={() => route.back()}>
              Voltar
            </Button>
          </Group>
        </Stack>
      </Container>
    </Container>
  );
}
