/* eslint-disable react/require-default-props */
import {
  useGetActivities,
  usePostActivity,
  usePutActivity,
} from '@/store/hooks/activityHooks';
import { Activity } from '@/type/activity';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { LOCATIONS } from '@/constant';
import { DateTimePicker } from '@mantine/dates';

interface ActivityModalProps {
  editMode?: boolean;
  activity?: Activity;
  opened: boolean;
  close: () => void;
}
function ActivityModal({
  editMode,
  activity,
  opened,
  close,
}: ActivityModalProps) {
  const [loading, setLoading] = useState(false);
  const putActivity = usePutActivity();
  const postActivity = usePostActivity();
  const getActivities = useGetActivities();

  const form = useForm({
    initialValues: {
      id: undefined,
      name: '',
      location: '',
      start: '',
      end: '',
      teacher: '',
    },
    validate: (values) => ({
      name: values.name ? undefined : 'Campo obrigatório',
    }),
  });

  const { reset, setFieldValue, onSubmit, getInputProps, values } = form;

  const handleSubmit = (a: Activity) => {
    if (!activity) {
      setLoading(true);
      postActivity(a)
        .then(() => {
          notifications.show({
            message: 'Atividade criada com sucesso!',
            color: 'green',
          });
          reset();
          handleClose();
          getActivities();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao criar atividade',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      putActivity(a)
        .then(() => {
          notifications.show({
            message: 'Atividade alterada com sucesso!',
            color: 'green',
          });
          handleClose();
          getActivities();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao editar atividade',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    }
  };

  const handleClose = () => {
    close();
  };

  useEffect(() => {
    reset();
    if (activity) {
      Object.entries(activity).forEach((u) => setFieldValue(u[0], u[1]));
    }
  }, [editMode, activity, setFieldValue, reset]);

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        size="lg"
        title={editMode ? 'Alterar atividade' : 'Cadastrar atividade'}
      >
        <form onSubmit={onSubmit((v) => handleSubmit(v))}>
          <Stack>
            <Group grow>
              <TextInput
                description="Nome da atividade"
                {...getInputProps('name')}
              />
              <TextInput
                description="Professor"
                {...getInputProps('teacher')}
              />
            </Group>
            <Group grow>
              <Select
                description="Tipo de usuário"
                placeholder="Selecione"
                data={LOCATIONS}
                {...getInputProps('location')}
              />
            </Group>
            <Group grow>
              <DateTimePicker
                {...getInputProps('start')}
                value={values.start ? new Date(values.start) : undefined}
                onChange={(v) => {
                  setFieldValue('start', v?.toISOString() ?? '');
                }}
                valueFormat="DD/MM/YYYY HH:mm"
                description="Inicio"
              />
              <DateTimePicker
                {...getInputProps('end')}
                value={values.end ? new Date(values.end) : undefined}
                onChange={(v) => {
                  setFieldValue('end', v?.toISOString() ?? '');
                }}
                valueFormat="DD/MM/YYYY HH:mm"
                description="Termino"
              />
            </Group>
            <Group justify="end">
              <Button color="red" onClick={handleClose}>
                Voltar
              </Button>
              <Button color="green" type="submit">
                Salvar
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </>
  );
}

export default ActivityModal;
