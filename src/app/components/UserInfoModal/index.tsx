import { USER_STATUS } from '@/constant';
import { useGetUser, useUser } from '@/store/hooks/userHooks';
import { getDateLabel } from '@/utils';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface UserInfoModalProps {
  // eslint-disable-next-line react/require-default-props
  userId?: number;
  opened: boolean;
  close: () => void;
}

function UserInfoModal({ userId, opened, close }: UserInfoModalProps) {
  const [loading, setLoading] = useState(false);
  const getUser = useGetUser();
  const user = useUser();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUser(userId)
        .catch(() =>
          notifications.show({
            message: 'Falha ao buscar por dados do usuário.',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    }
  }, [userId, getUser]);

  const handleClose = () => {
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="lg"
      title="Informações do usuário"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Stack>
        <Group grow>
          <TextInput disabled value={user?.fullname} />
          <TextInput disabled value={user?.email} />
          <TextInput disabled value={user?.phone} />
        </Group>
        <Group grow>
          <TextInput disabled value={user?.sex} />
          <TextInput disabled value={getDateLabel(user?.birth)} />
          <TextInput
            disabled
            value={USER_STATUS.find((u) => u.value === user?.status)?.label}
          />
        </Group>
        <Group justify="end">
          <Button color="red" onClick={handleClose}>
            Voltar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default UserInfoModal;
