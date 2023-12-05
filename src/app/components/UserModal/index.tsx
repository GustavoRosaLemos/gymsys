import { User } from '@/type/user';
import { DateInput } from '@mantine/dates';
import {
  Button,
  Fieldset,
  Group,
  LoadingOverlay,
  Modal,
  Select,
  Stack,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { USER_SEX, USER_TYPE } from '@/constant';
import { useGetUsers, usePostUser, usePutUser } from '@/store/hooks/userHooks';
import { useEffect, useState } from 'react';
import { notifications } from '@mantine/notifications';

interface UserModalProps {
  // eslint-disable-next-line react/require-default-props
  user?: User;
  opened: boolean;
  close: () => void;
}

function UserModal({ user, opened, close }: UserModalProps) {
  const [loading, setLoading] = useState(false);
  const putUser = usePutUser();
  const postUser = usePostUser();
  const getUsers = useGetUsers();

  const form = useForm({
    initialValues: {
      id: undefined,
      type: '',
      fullname: '',
      birth: '',
      sex: '',
      status: 'ACTIVE',
      phone: '',
      email: '',
      city: '',
      state: '',
      cep: '',
      street: '',
      number: '',
    },
    validate: (values) => ({
      type: values.type ? undefined : 'Campo obrigatório.',
      fullname: values.fullname ? undefined : 'Campo obrigatório.',
    }),
  });
  const { getInputProps, onSubmit, reset, values, setFieldValue } = form;

  const handleSubmit = (v: User) => {
    if (!user) {
      setLoading(true);
      postUser(v)
        .then(() => {
          notifications.show({
            message: 'Usuário criado com sucesso!',
            color: 'green',
          });
          reset();
          handleClose();
          getUsers();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao criar usuário',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      putUser(v)
        .then(() => {
          notifications.show({
            message: 'Usuário alterado com sucesso!',
            color: 'green',
          });
          handleClose();
          getUsers();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao editar usuário',
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
    if (user) {
      Object.entries(user).forEach((u) => setFieldValue(u[0], u[1]));
    }
  }, [user, setFieldValue, reset]);

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        size="lg"
        title={user ? 'Alterar usuário' : 'Cadastrar usuário'}
      >
        <form onSubmit={onSubmit((v) => handleSubmit(v))}>
          <Stack>
            <Fieldset legend="Informações Pessoais">
              <Stack>
                <Group grow>
                  <TextInput
                    description="Nome Completo"
                    {...getInputProps('fullname')}
                  />
                  <TextInput description="Email" {...getInputProps('email')} />
                </Group>
                <Group grow>
                  <Select
                    description="Tipo de usuário"
                    placeholder="Selecione"
                    data={USER_TYPE}
                    {...getInputProps('type')}
                  />
                  <Select
                    description="Sexo"
                    placeholder="Selecione"
                    data={USER_SEX}
                    {...getInputProps('sex')}
                  />
                </Group>
                <Group grow>
                  <DateInput
                    {...getInputProps('birth')}
                    value={values.birth ? new Date(values.birth) : undefined}
                    onChange={(v) => {
                      setFieldValue(
                        'birth',
                        `${v?.getFullYear()}-${v?.getMonth()}-${v?.getDay()}` ??
                          ''
                      );
                    }}
                    valueFormat="DD/MM/YYYY"
                    description="Data de nascimento"
                  />
                  <TextInput
                    description="Contato"
                    {...getInputProps('phone')}
                  />
                </Group>
              </Stack>
            </Fieldset>
            <Fieldset legend="Endereço">
              <Stack>
                <Group grow>
                  <TextInput
                    description="Numero"
                    {...getInputProps('number')}
                  />
                  <TextInput description="Rua" {...getInputProps('street')} />
                </Group>
                <Group grow>
                  <TextInput description="Cidade" {...getInputProps('city')} />
                  <TextInput description="Estado" {...getInputProps('state')} />
                </Group>
                <Group grow>
                  <TextInput description="CEP" {...getInputProps('cep')} />
                </Group>
              </Stack>
            </Fieldset>
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

export default UserModal;
