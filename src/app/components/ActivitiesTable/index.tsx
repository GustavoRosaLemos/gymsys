'use client';

import {
  useActivities,
  useGetActivities,
  useRemoveActivity,
} from '@/store/hooks/activityHooks';
import { ActionIcon, Group, LoadingOverlay } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { IconAdjustments, IconTrash } from '@tabler/icons-react';
import { getDateTimeLabel } from '@/utils';
import { Activity } from '@/type/activity';
import { useDisclosure } from '@mantine/hooks';
import { LOCATIONS } from '@/constant';
import Table from '../Table';
import ActivityModal from '../ActivityModal';

function ActivitiesTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<
    Activity | undefined
  >();
  const getActivities = useGetActivities();
  const removeActivity = useRemoveActivity();
  const activities = useActivities();

  useEffect(() => {
    setLoading(true);
    getActivities()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por atividades.',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getActivities]);

  const handleRemoveActivity = (id: string) => {
    setLoading(true);
    removeActivity(id)
      .then(() => getActivities())
      .catch(() =>
        notifications.show({
          message: 'Falha excluir atividade.',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };

  const handleEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    open();
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {activities && (
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
                onClick={() => handleRemoveActivity(activity.id ?? '')}
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
                onClick={() => handleEditActivity(activity)}
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
      <ActivityModal
        opened={opened}
        close={close}
        activity={selectedActivity}
        editMode
      />
    </>
  );
}

export default ActivitiesTable;
