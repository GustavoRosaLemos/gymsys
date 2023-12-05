import {
  useGetProducts,
  usePostProduct,
  usePutProduct,
} from '@/store/hooks/productHooks';
import { Product } from '@/type/product';
import {
  Button,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface ProductModalProps {
  // eslint-disable-next-line react/require-default-props
  product?: Product;
  opened: boolean;
  close: () => void;
}

function ProductModal({ product, opened, close }: ProductModalProps) {
  const [loading, setLoading] = useState(false);
  const postProduct = usePostProduct();
  const putProduct = usePutProduct();
  const getProducts = useGetProducts();

  const form = useForm({
    initialValues: {
      id: undefined,
      name: '',
      description: '',
      price: 0,
    },
    validate: (values) => ({
      name: values.name ? undefined : 'Campo obrigatório',
      description: values.description ? undefined : 'Campo obrigatório',
      price: values.price ? undefined : 'Campo obrigatório',
    }),
  });

  const { reset, setFieldValue, onSubmit, getInputProps } = form;

  const handleSubmit = (p: Product) => {
    if (!product) {
      setLoading(true);
      postProduct(p)
        .then(() => {
          notifications.show({
            message: 'Produto criado com sucesso!',
            color: 'green',
          });
          reset();
          handleClose();
          getProducts();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao criar produto',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    } else {
      setLoading(true);
      putProduct(p)
        .then(() => {
          notifications.show({
            message: 'Produto alterado com sucesso!',
            color: 'green',
          });
          handleClose();
          getProducts();
        })
        .catch(() =>
          notifications.show({
            message: 'Falha ao editar produto',
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
    if (product) {
      Object.entries(product).forEach((u) => setFieldValue(u[0], u[1]));
    }
  }, [product, setFieldValue, reset]);

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="lg"
      title={product ? 'Alterar produto' : 'Cadastrar produto'}
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <form onSubmit={onSubmit((v) => handleSubmit(v))}>
        <Stack>
          <Group grow>
            <TextInput description="Nome" {...getInputProps('name')} />
            <NumberInput
              hideControls
              thousandSeparator="."
              decimalSeparator=","
              leftSection="R$"
              description="Preço"
              decimalScale={2}
              {...getInputProps(`price`)}
            />
          </Group>
          <Group grow>
            <Textarea
              description="descrição"
              {...getInputProps('description')}
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

export default ProductModal;
