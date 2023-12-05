import { ORDER_STATUS, ORDER_TYPES, PAYMENT_TYPES } from '@/constant';
import { useGetUserOrders, useUserOrders } from '@/store/hooks/orderHooks';
import {
  Button,
  Fieldset,
  Group,
  LoadingOverlay,
  Modal,
  NumberInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';

interface UserOrdersProps {
  // eslint-disable-next-line react/require-default-props
  userId?: number;
  opened: boolean;
  close: () => void;
}

function UserOrdersModal({ userId, opened, close }: UserOrdersProps) {
  const [loading, setLoading] = useState(false);
  const getUserOrders = useGetUserOrders();
  const userOrders = useUserOrders();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      getUserOrders(userId)
        .catch(() =>
          notifications.show({
            message: 'Falha ao buscar por pedidos.',
            color: 'red',
          })
        )
        .finally(() => setLoading(false));
    }
  }, [userId, getUserOrders]);

  const handleClose = () => {
    close();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      withCloseButton={false}
      size="xl"
      title="Pedidos do usuário"
    >
      <LoadingOverlay visible={loading} zIndex={1000} />
      <Stack>
        {userOrders?.map((uo) => (
          <Fieldset key={uo.id} legend={`Pedido ${uo.id?.toString()}`}>
            <Stack>
              <Group grow>
                <TextInput
                  description="Status"
                  disabled
                  value={ORDER_STATUS.find((s) => s.value === uo.status)?.label}
                />
                <TextInput
                  description="Tipo"
                  disabled
                  value={
                    ORDER_TYPES.find((s) => s.value === uo.orderType)?.label
                  }
                />
                <TextInput
                  description="Tipo de pagamento"
                  disabled
                  value={
                    PAYMENT_TYPES.find((s) => s.value === uo.paymentType)?.label
                  }
                />
              </Group>
              <Group grow>
                <NumberInput
                  disabled
                  hideControls
                  thousandSeparator="."
                  decimalSeparator=","
                  leftSection="R$"
                  description="Descontos"
                  decimalScale={2}
                  value={uo.discount}
                />
                <NumberInput
                  disabled
                  hideControls
                  thousandSeparator="."
                  decimalSeparator=","
                  leftSection="R$"
                  description="Taxas"
                  decimalScale={2}
                  value={uo.fees}
                />
                <NumberInput
                  disabled
                  hideControls
                  thousandSeparator="."
                  decimalSeparator=","
                  leftSection="R$"
                  description="Total"
                  decimalScale={2}
                  value={uo.total}
                />
              </Group>
              <Fieldset legend="Itens">
                <Stack>
                  {uo.items.map((i) => (
                    <Group grow>
                      <TextInput
                        disabled
                        description="Quantidade"
                        value={i.quantity}
                      />
                      <TextInput disabled description="Nome" value={i.name} />
                      <NumberInput
                        disabled
                        hideControls
                        thousandSeparator="."
                        decimalSeparator=","
                        leftSection="R$"
                        description="Preço unitário"
                        decimalScale={2}
                        value={i.price}
                      />
                    </Group>
                  ))}
                </Stack>
              </Fieldset>
            </Stack>
          </Fieldset>
        ))}
        <Group justify="end">
          <Button color="red" onClick={handleClose}>
            Voltar
          </Button>
        </Group>
      </Stack>
    </Modal>
  );
}

export default UserOrdersModal;
