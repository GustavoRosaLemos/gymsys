import { HOW_FIND_ACADEMY, WHY_GO_TO_GYM } from '@/constant';
import {
  useClearQuestion,
  useGetQuestion,
  usePostQuestion,
  usePutQuestion,
  useQuestion,
} from '@/store/hooks/questionHooks';
import { Question } from '@/type/question';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  MultiSelect,
  SegmentedControl,
  Select,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface QuestionModalProps {
  // eslint-disable-next-line react/require-default-props
  userId: string;
  opened: boolean;
  close: () => void;
}

function QuestionModal({ opened, close, userId }: QuestionModalProps) {
  const [loading, setLoading] = useState(false);
  const postQuestion = usePostQuestion();
  const putQuestion = usePutQuestion();
  const getQuestion = useGetQuestion();
  const question = useQuestion();
  const form = useForm({
    initialValues: {
      id: '',
      hasHealthPlan: false,
      healPlan: null,
      praticeSports: false,
      whyGoToGym: [],
      whyGoToGymAnother: '',
      howToFindAcademy: '',
      howToFindAcademyAnother: '',
      userOfAnotherGym: false,
    },
  });

  const { onSubmit, getInputProps, values, setFieldValue } = form;

  const handleClose = () => {
    close();
  };

  const handleSubmit = (q: Question) => {
    if (question) {
      setLoading(true);
      putQuestion(q)
        .then(() => {
          notifications.show({
            message: 'Pergunta alterada com sucesso!',
            color: 'green',
          });
          handleClose();
          getQuestion(userId);
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao alterar pergunta',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      postQuestion(q)
        .then(() => {
          notifications.show({
            message: 'Pergunta criada com sucesso!',
            color: 'green',
          });
          handleClose();
          getQuestion(userId);
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao criar pergunta',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    }
  };

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getQuestion(userId).finally(() => setLoading(false));
    }
  }, [getQuestion, userId]);

  useEffect(() => {
    if (question) {
      Object.entries(question).forEach((u) => setFieldValue(u[0], u[1]));
    }
    setFieldValue('id', userId);
  }, [question, setFieldValue, userId]);

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Modal
        opened={opened}
        onClose={handleClose}
        withCloseButton={false}
        size="lg"
        title="Questionário pessoal"
      >
        <form onSubmit={onSubmit((v) => handleSubmit(v))}>
          <Stack>
            <Group grow>
              <Stack gap="4">
                <Text c="font-weak" size="xs">
                  Possui plano de saúde?
                </Text>
                <SegmentedControl
                  {...getInputProps('hasHealthPlan')}
                  data={[
                    { label: 'Sim', value: 'yes' },
                    { label: 'Não', value: '' },
                  ]}
                />
              </Stack>
            </Group>
            {values.hasHealthPlan && (
              <Group grow>
                <TextInput
                  description="Plano de saúde"
                  {...getInputProps('healPlan')}
                />
              </Group>
            )}
            <Group grow>
              <Stack gap="4">
                <Text c="font-weak" size="xs">
                  Prática esportes?
                </Text>
                <SegmentedControl
                  {...getInputProps('praticeSports')}
                  data={[
                    { label: 'Sim', value: 'yes' },
                    { label: 'Não', value: '' },
                  ]}
                />
              </Stack>
            </Group>
            <Group grow>
              <MultiSelect
                description="Porque vai a academia?"
                data={WHY_GO_TO_GYM}
                {...getInputProps('whyGoToGym')}
              />
            </Group>
            {values.whyGoToGym &&
              values.whyGoToGym.find((v) => v === 'ANOTHER') && (
                <Group grow>
                  <TextInput
                    description="Outro motivo para ir a academia"
                    {...getInputProps('whyGoToGymAnother')}
                  />
                </Group>
              )}
            <Group grow>
              <Select
                description="Como achou a academia?"
                data={HOW_FIND_ACADEMY}
                {...getInputProps('howToFindAcademy')}
              />
            </Group>
            {values.howToFindAcademy === 'ANOTHER' && (
              <Group grow>
                <TextInput
                  description="Como achou a academia?"
                  {...getInputProps('howToFindAcademyAnother')}
                />
              </Group>
            )}
            <Group grow>
              <Stack gap="4">
                <Text c="font-weak" size="xs">
                  Frequenta outra academia?
                </Text>
                <SegmentedControl
                  {...getInputProps('userOfAnotherGym')}
                  data={[
                    { label: 'Sim', value: 'yes' },
                    { label: 'Não', value: '' },
                  ]}
                />
              </Stack>
            </Group>
            <Group justify="end">
              <Button color="red" onClick={handleClose}>
                Cancelar
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

export default QuestionModal;
