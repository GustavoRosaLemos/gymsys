'use client';

import { useEffect, useState } from 'react';
import { useUsers, useGetUsers, useDeleteUser } from '@/store/hooks/userHooks';
import { ActionIcon, Badge, Group, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { USER_STATUS, USER_TYPE } from '@/constant';
import {
  IconActivity,
  IconAdjustments,
  IconListCheck,
  IconQuestionMark,
  IconTrash,
} from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { User } from '@/type/user';
import { getDateLabel } from '@/utils';
import Table from '../Table';
import UserModal from '../UserModal';
import QuestionModal from '../QuestionModal';
import RegistrationsModal from '../RegistrationsModal';

export default function UserTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [openedRegistrations, registrationsOptions] = useDisclosure(false);
  const [openedQuestion, questionOptions] = useDisclosure(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [loading, setLoading] = useState(true);
  const deleteUser = useDeleteUser();
  const getUsers = useGetUsers();
  const users = useUsers();

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

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    open();
  };

  const handleToggleQuestion = (user: User) => {
    setSelectedUser(user);
    questionOptions.open();
  };

  const handleToggleRegistrations = (user: User) => {
    setSelectedUser(user);
    registrationsOptions.open();
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
            getDateLabel(user.birth),
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
              <ActionIcon
                color="blue"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleToggleQuestion(user)}
              >
                <IconQuestionMark
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
              <ActionIcon
                color="blue"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleToggleRegistrations(user)}
              >
                <IconListCheck
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>,
          ])}
        />
      )}
      <UserModal opened={opened} close={close} user={selectedUser} />
      <QuestionModal
        opened={openedQuestion}
        close={questionOptions.close}
        userId={selectedUser?.id ?? ''}
      />
      <RegistrationsModal
        opened={openedRegistrations}
        close={registrationsOptions.close}
        userId={selectedUser?.id ?? ''}
      />
    </>
  );
}
