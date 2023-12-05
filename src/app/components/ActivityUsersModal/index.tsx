import { requestGetUser } from '@/service/user';
import {
  useActivityRegistrations,
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
import Table from '../Table';

interface ActivityUsersModalProps {
  activityId: string;
  opened: boolean;
  close: () => void;
}

function ActivityUsersModal({
  activityId,
  opened,
  close,
}: ActivityUsersModalProps) {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const getActivityRegistrations = useGetActivityRegistrations();
  const activityRegistrations = useActivityRegistrations();
  const removeUserRegistration = useRemoveUserRegistration();

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    setLoading(true);
    setUsers([]);
    getActivityRegistrations(activityId)
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por atividades.',
          color: ' red',
        })
      )
      .finally(() => setLoading(false));
  }, [getActivityRegistrations, activityId]);

  useEffect(() => {
    activityRegistrations?.forEach((registration) => {
      requestGetUser(registration.userId).then((user) => {
        setUsers((prev) => [...prev, user]);
      });
    });
  }, [activityRegistrations]);

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
      (a) => a.activityId === activityId
    )?.id;
    if (registrationId) {
      removeUserRegistration(registrationId)
        .then(() => {
          notifications.show({
            message: 'Registro excluido com sucesso!',
            color: 'green',
          });
          setUsers([]);
          getActivityRegistrations(userId);
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
                onClick={() => handleRemoveRegistration(user.id ?? '')}
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
