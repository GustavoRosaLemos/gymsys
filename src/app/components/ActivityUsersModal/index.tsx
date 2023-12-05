'use client';

import { requestGetUser } from '@/service/user';
import {
  useActivityRegistrations,
  useActivityUsers,
  useAddActivityUser,
  useClearActivityUsers,
  useGetActivityRegistrations,
} from '@/store/hooks/activityHooks';
import { useRemoveUserRegistration } from '@/store/hooks/userHooks';
import { User } from '@/type/user';
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { Activity } from '@/type/activity';
import Table from '../Table';

interface ActivityUsersModalProps {
  // eslint-disable-next-line react/require-default-props
  activity?: Activity;
  opened: boolean;
  close: () => void;
}

function ActivityUsersModal({
  activity,
  opened,
  close,
}: ActivityUsersModalProps) {
  const [loading, setLoading] = useState(false);
  const clearActivityUsers = useClearActivityUsers();
  const addActivityUser = useAddActivityUser();
  const getActivityRegistrations = useGetActivityRegistrations();
  const removeUserRegistration = useRemoveUserRegistration();
  const activityRegistrations = useActivityRegistrations();
  const users = useActivityUsers();

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    setLoading(true);
    getActivityRegistrations(activity?.id ?? '')
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por atividades.',
          color: ' red',
        })
      )
      .finally(() => setLoading(false));
  }, [getActivityRegistrations, activity]);

  useEffect(() => {
    clearActivityUsers();
    activityRegistrations?.forEach((registration) => {
      requestGetUser(registration.userId).then((user) => {
        addActivityUser(user);
      });
    });
  }, [activityRegistrations, addActivityUser, clearActivityUsers]);

  const handleRemoveRegistration = (userId: string) => {
    setLoading(true);
    if (!activityRegistrations) {
      notifications.show({
        message: 'Falha ao buscar pelo registro,',
        color: 'red',
      });
      return;
    }
    const registrationId = activityRegistrations.find(
      (a) => a.userId === userId
    )?.id;
    if (registrationId) {
      removeUserRegistration(registrationId)
        .then(() => {
          notifications.show({
            message: 'Registro excluido com sucesso!',
            color: 'green',
          });
          clearActivityUsers();
          getActivityRegistrations(activity?.id ?? '');
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao excluir registro.',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="xl"
      title="Usuarios cadastrados na atividade"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Stack>
        <Table
          cols={['Nome', 'Email', 'Contato', 'Ações']}
          rows={users.map((user) => [
            user.fullname,
            user.email,
            user.phone,
            <Group>
              <ActionIcon
                color="red"
                variant="filled"
                aria-label="Settings"
                onClick={() =>
                  handleRemoveRegistration(user.id?.toString() ?? '')
                }
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>,
          ])}
        />
        <Group justify="end">
          <Button color="red" onClick={() => handleClose()}>
            Fechar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default ActivityUsersModal;
