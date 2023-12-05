import { ORDER_TYPES, PAYMENT_TYPES } from '@/constant';
import { useGetOrders, usePostOrder } from '@/store/hooks/orderHooks';
import { useGetProducts, useProducts } from '@/store/hooks/productHooks';
import { useGetUsers, useUsers } from '@/store/hooks/userHooks';
import { Order } from '@/type/order';
import {
  ActionIcon,
  Button,
  Fieldset,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Select,
  Stack,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconPlus, IconTrash } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

interface OrderModalProps {
  opened: boolean;
  close: () => void;
}

function OrderModal({ opened, close }: OrderModalProps) {
  const [loading, setLoading] = useState(false);
  const [productOptions, setProductOptions] = useState<
    { value: string; label: string }[]
  >([]);

  const [userOptions, setUserOptions] = useState<
    { value: string; label: string }[]
  >([]);
  const [total, setTotal] = useState(0);
  const postOrder = usePostOrder();
  const getOrders = useGetOrders();
  const getProducts = useGetProducts();
  const getUsers = useGetUsers();
  const products = useProducts();
  const users = useUsers();

  useEffect(() => {
    setLoading(true);
    getProducts()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por produtos',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getProducts]);

  useEffect(() => {
    if (products) {
      setProductOptions(
        products.map((p) => ({
          value: p.name,
          label: p.name,
        }))
      );
    }
  }, [products]);

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
        users.map((u) => ({
          label: u.fullname,
          value: u.id?.toString() ?? '',
        }))
      );
    }
  }, [users]);

  const initialValues: Order = {
    id: undefined,
    status: 'PENDING',
    orderType: '',
    discount: 0,
    fees: 0,
    total: 0,
    items: [],
    paymentType: '',
  };

  const form = useForm({
    initialValues,
    validate: (values) => ({
      status: values.status ? undefined : 'Campo obrigatório',
      orderType: values.orderType ? undefined : 'Campo obrigatório',
      items: values.items ? undefined : 'Defina pelo menos um item',
      paymentType: values.paymentType ? undefined : 'Campo obrigatório',
    }),
    onValuesChange: (values) => {
      if (values.items.length > 0) {
        setTotal(
          values.items
            .map((i) => i.price * i.quantity)
            .reduce((a, b) => a + b) +
            values.fees -
            values.discount
        );
      } else {
        setTotal(0);
      }
    },
  });

  const {
    reset,
    onSubmit,
    getInputProps,
    values,
    insertListItem,
    setFieldValue,
    removeListItem,
  } = form;

  const handleSubmit = (o: Order) => {
    setLoading(true);
    postOrder({ ...o, total })
      .then(() => {
        notifications.show({
          message: 'Pedido criado com sucesso!',
          color: 'green',
        });
        reset();
        handleClose();
        getOrders();
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao criar pedido!',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };

  const handleClose = () => {
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="lg"
      title="Cadastrar pedido"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <form onSubmit={onSubmit((v) => handleSubmit(v))}>
        <Stack>
          <Group grow>
            <Select
              description="Tipo de pedido"
              data={ORDER_TYPES}
              {...getInputProps(`orderType`)}
            />
            <Select
              description="Tipo de pagamento"
              data={PAYMENT_TYPES}
              {...getInputProps(`paymentType`)}
            />
            <Select
              description="Usuário"
              data={userOptions}
              {...getInputProps(`userId`)}
            />
          </Group>
          <Group grow>
            <NumberInput
              hideControls
              thousandSeparator="."
              decimalSeparator=","
              leftSection="R$"
              description="Descontos"
              decimalScale={2}
              {...getInputProps(`discount`)}
            />
            <NumberInput
              hideControls
              thousandSeparator="."
              decimalSeparator=","
              leftSection="R$"
              description="Taxas"
              decimalScale={2}
              {...getInputProps(`fees`)}
            />
            <NumberInput
              disabled
              hideControls
              thousandSeparator="."
              decimalSeparator=","
              leftSection="R$"
              description="Total"
              decimalScale={2}
              value={total}
            />
          </Group>
          <Fieldset legend="Produtos">
            <Stack>
              {values.items.map((item, index) => (
                <Group grow>
                  <NumberInput
                    min={1}
                    description="Quantidade"
                    {...getInputProps(`items.${index}.quantity`)}
                  />
                  <Select
                    data={productOptions}
                    description="Nome"
                    {...getInputProps(`items.${index}.name`)}
                    onChange={(v) => {
                      if (products) {
                        const product = products.find((p) => p.name === v);
                        setFieldValue(`items.${index}.name`, v);
                        if (product) {
                          setFieldValue(`items.${index}.id`, product.id);
                          setFieldValue(`items.${index}.price`, product.price);
                          setFieldValue(
                            `items.${index}.description`,
                            product.description
                          );
                        }
                      }
                    }}
                  />
                  <NumberInput
                    disabled
                    hideControls
                    thousandSeparator="."
                    decimalSeparator=","
                    leftSection="R$"
                    description="Preço por unidade"
                    decimalScale={2}
                    {...getInputProps(`items.${index}.price`)}
                  />
                  <ActionIcon
                    mt={20}
                    w="34px"
                    h="34px"
                    color="red"
                    variant="filled"
                    aria-label="remove"
                    onClick={() => removeListItem('items', index)}
                  >
                    <IconTrash
                      style={{ width: '70%', height: '70%' }}
                      stroke={1.5}
                    />
                  </ActionIcon>
                </Group>
              ))}
              <Group justify="center">
                <Button
                  variant="outline"
                  leftSection={<IconPlus />}
                  onClick={() =>
                    insertListItem('items', {
                      id: undefined,
                      name: '',
                      description: '',
                      quantity: 1,
                      price: 0,
                    })
                  }
                >
                  Novo produto
                </Button>
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
  );
}

export default OrderModal;
