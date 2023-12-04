'use client';

import { useEffect, useState } from 'react';
import { useUsers, useGetUsers, useDeleteUser } from '@/store/hooks/userHooks';
import { ActionIcon, Badge, Group, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { USER_STATUS, USER_TYPE } from '@/constant';
import { IconAdjustments, IconTrash } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { User } from '@/type/user';
import Table from '../Table';
import UserModal from '../UserModal';

export default function UserTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [userData, setUserData] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const deleteUser = useDeleteUser();
  const getUsers = useGetUsers();
  const users = useUsers();

  useEffect(() => {
    getUsers()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por usuários',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getUsers]);

  const handleRemoveUser = (id: string) => {
    setLoading(true);
    deleteUser(id)
      .then(() => {
        notifications.show({
          message: 'Usuário excluido com sucesso!',
          color: 'green',
        });
        getUsers();
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao excluir usuário.',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };

  const handleEditUser = (u: User) => {
    console.log('u', u);
    setUserData(u);
    open();
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {users && (
        <Table
          cols={[
            'Tipo',
            'Nome Completo',
            'email',
            'Contato',
            'Nascimento',
            'Sexo',
            'Numero',
            'Rua',
            'Cidade',
            'Estado',
            'CEP',
            'Status',
            'Ações',
          ]}
          rows={users.map((user) => [
            <Badge
              radius="sm"
              color={USER_TYPE.find((u) => u.value === user.type)?.color}
            >
              {USER_TYPE.find((u) => u.value === user.type)?.label}
            </Badge>,
            user.fullname,
            user.email,
            user.phone,
            user.birth,
            user.sex,
            user.number,
            user.street,
            user.city,
            user.state,
            user.cep,
            <Badge
              radius="sm"
              color={USER_STATUS.find((u) => u.value === user.status)?.color}
            >
              {USER_STATUS.find((u) => u.value === user.status)?.label}
            </Badge>,
            <Group>
              <ActionIcon
                color="red"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleRemoveUser(user.id ?? '')}
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                color="orange"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleEditUser(user)}
              >
                <IconAdjustments
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>,
          ])}
        />
      )}
      <UserModal user={userData} opened={opened} close={close} />
    </>
  );
}
