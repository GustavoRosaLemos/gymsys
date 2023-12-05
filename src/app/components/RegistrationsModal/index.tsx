import {
  useGetUserRegistrations,
  useRemoveUserRegistration,
  useUserRegistrations,
} from '@/store/hooks/userHooks';
import {
  ActionIcon,
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { requestGetActivity } from '@/service/activity';
import { Activity } from '@/type/activity';
import { LOCATIONS } from '@/constant';
import { getDateTimeLabel } from '@/utils';
import { IconTrash } from '@tabler/icons-react';
import { getActivities } from '@/store/activity/activityAction';
import Table from '../Table';

interface RegistrationsModalProps {
  userId: string;
  opened: boolean;
  close: () => void;
}

function RegistrationsModal({
  userId,
  opened,
  close,
}: RegistrationsModalProps) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const getUserRegistrations = useGetUserRegistrations();
  const removeUserRegistration = useRemoveUserRegistration();
  const userRegistrations = useUserRegistrations();

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    setLoading(true);
    setActivities([]);
    getUserRegistrations(userId)
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por atividades.',
          color: ' red',
        })
      )
      .finally(() => setLoading(false));
  }, [getUserRegistrations, userId]);

  useEffect(() => {
    userRegistrations?.forEach((registration) => {
      requestGetActivity(registration.activityId).then((activity) => {
        setActivities((prevActivities) => [...prevActivities, activity]);
      });
    });
  }, [userRegistrations]);

  const handleRemoveRegistration = (activityId: string) => {
    setLoading(true);
    if (!userRegistrations) {
      notifications.show({
        message: 'Falha ao buscar pelo registro,',
        color: 'red',
      });
      return;
    }
    const registrationId = userRegistrations.find(
      (a) => a.activityId === activityId
    )?.id;
    if (registrationId) {
      removeUserRegistration(registrationId)
        .then(() => {
          notifications.show({
            message: 'Registro excluido com sucesso!',
            color: 'green',
          });
          setActivities([]);
          getUserRegistrations(userId);
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
      title="Atividades"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Stack>
        <Table
          cols={[
            'Nome',
            'Professor',
            'Localização',
            'Inicio',
            'Termino',
            'Ações',
          ]}
          rows={activities.map((activity) => [
            activity.name,
            activity.teacher,
            LOCATIONS.find((l) => l.value === activity.location)?.label,
            getDateTimeLabel(activity.start),
            getDateTimeLabel(activity.end),
            <Group>
              <ActionIcon
                color="red"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleRemoveRegistration(activity.id ?? '')}
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

export default RegistrationsModal;
