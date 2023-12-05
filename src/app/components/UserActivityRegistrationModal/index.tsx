import {
  useGetUsers,
  usePostUserRegistration,
  useUsers,
} from '@/store/hooks/userHooks';
import { useForm } from '@mantine/form';
import { useEffect, useState } from 'react';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { UserRegistration } from '@/type/user';
import {
  useClearActivityUsers,
  useGetActivityRegistrations,
  useSelectedActivity,
} from '@/store/hooks/activityHooks';

interface UserActivityRegistrationModalProps {
  // eslint-disable-next-line react/require-default-props
  opened: boolean;
  close: () => void;
}

function UserActivityRegistrationModal({
  opened,
  close,
}: UserActivityRegistrationModalProps) {
  const [loading, setLoading] = useState(false);
  const [userOptions, setUserOptions] =
    useState<{ value: string; label: string }[]>();
  const getUsers = useGetUsers();
  const postUserRegistration = usePostUserRegistration();
  const getActivityRegistrations = useGetActivityRegistrations();
  const clearActivityUsers = useClearActivityUsers();
  const users = useUsers();
  const activity = useSelectedActivity();

  const form = useForm({
    initialValues: {
      id: undefined,
      activityId: '',
      userId: '',
    },
    validate: (values) => ({
      userId: values.userId ? undefined : 'Campo obrigatório',
    }),
  });

  const { reset, onSubmit, getInputProps, setFieldValue } = form;

  const handleClose = () => {
    reset();
    close();
  };

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

  useEffect(() => {
    if (activity) {
      setFieldValue('activityId', activity?.id ?? '');
    }
  }, [activity, setFieldValue]);

  const handleSubmit = (r: UserRegistration) => {
    setLoading(true);
    postUserRegistration(r)
      .then(() => {
        notifications.show({
          message: 'Usuário registrado com sucesso!',
          color: 'green',
        });
        clearActivityUsers();
        getActivityRegistrations(activity?.id ?? '');
        reset();
        handleClose();
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao criar atividade',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };
  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="lg"
      title="Registrar usuário na atividade"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <form onSubmit={onSubmit((v) => handleSubmit(v))}>
        <Stack>
          <Group grow>
            <Select
              description="Usuário"
              {...getInputProps('userId')}
              data={userOptions}
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
  );
}

export default UserActivityRegistrationModal;
