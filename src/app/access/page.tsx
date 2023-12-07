'use client';

import {
  Button,
  Center,
  Container,
  Group,
  LoadingOverlay,
  Paper,
  Select,
  Stack,
  Text,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import {
  useGetUsers,
  useUserHasDebts,
  useUsers,
} from '@/store/hooks/userHooks';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';
import Header from '../components/Header';

export default function AcessPage() {
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] = useState<
    { label: string; value: string }[]
  >([]);
  const getUsers = useGetUsers();
  const userHasDebts = useUserHasDebts();
  const users = useUsers();

  const form = useForm({
    initialValues: {
      id: '',
    },
    validate: (values) => ({
      id: values.id ? undefined : 'Campo obrigatório!',
    }),
  });

  const { getInputProps, onSubmit, reset } = form;

  useEffect(() => {
    setLoading(true);
    getUsers()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por usuários',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getUsers]);

  useEffect(() => {
    if (users) {
      setUserOptions(
        users.map((u) => ({ label: u.fullname, value: u.id?.toString() ?? '' }))
      );
    }
  }, [users]);

  const handleSubmit = (v: { id: string }) => {
    userHasDebts(Number(v.id))
      .then((hasDebts) => {
        if (hasDebts) {
          notifications.show({
            title: 'Usuário não autorizado.',
            message: 'Parece que existem débitos em seu nome.',
            color: 'red',
          });
        } else {
          notifications.show({
            title: 'Usuário autorizado.',
            message: 'Você está autorizado a entrar.',
            color: 'green',
          });
        }
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por débito',
          color: 'red',
        })
      );
  };

  return (
    <Container fluid p={0} h="100vh">
      <Header hideButtons />
      <Center h="90vh">
        <Paper shadow="xl" p="xl" w="400px">
          <LoadingOverlay visible={loading} zIndex={1000} />
          <form onSubmit={onSubmit((v) => handleSubmit(v))}>
            <Stack>
              <Text c="font-weak">Cancela</Text>
              <Group grow>
                <Select
                  description="Usuário"
                  data={userOptions}
                  {...getInputProps('id')}
                />
              </Group>
              <Group grow>
                <Button type="submit" color="green">
                  Entrar
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>
      </Center>
    </Container>
  );
}
