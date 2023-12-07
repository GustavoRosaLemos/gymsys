import {
  useGetOrders,
  useMarkOrderAsDebt,
  useMarkOrderAsDebtDone,
  useOrders,
  useRemoveOrder,
} from '@/store/hooks/orderHooks';
import { notifications } from '@mantine/notifications';
import { useEffect, useState } from 'react';
import { ActionIcon, Badge, Group, List, LoadingOverlay } from '@mantine/core';
import { getPriceLabel } from '@/utils';
import {
  IconCoin,
  IconCoinOff,
  IconTrash,
  IconUser,
} from '@tabler/icons-react';
import { ORDER_STATUS, ORDER_TYPES, PAYMENT_TYPES } from '@/constant';
import { useDisclosure } from '@mantine/hooks';
import { Order } from '@/type/order';
import Table from '../Table';
import UserInfoModal from '../UserInfoModal';

function OrderTable() {
  const [loading, setLoading] = useState(true);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedUserId, setSelectedUserId] = useState<number | undefined>();
  const getOrders = useGetOrders();
  const removeOrder = useRemoveOrder();
  const markOrderAsDebt = useMarkOrderAsDebt();
  const markOrderAsDebtDone = useMarkOrderAsDebtDone();
  const orders = useOrders();

  useEffect(() => {
    setLoading(true);
    getOrders()
      .catch(() =>
        notifications.show({
          message: 'Falha ao buscar por pedidos',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  }, [getOrders]);

  const handleRemoveOrder = (id?: number) => {
    if (!id) {
      notifications.show({
        title: 'Falha ao remover pedido!',
        message: 'Não foi possível localizar o id do pedido para removelo.',
        color: 'red',
      });
      return;
    }
    setLoading(true);
    removeOrder(id)
      .then(() => {
        notifications.show({
          message: 'Pedido excluido com sucesso!',
          color: 'green',
        });
        getOrders();
      })
      .catch(() =>
        notifications.show({
          message: 'Falha ao excluir pedido.',
          color: 'red',
        })
      )
      .finally(() => setLoading(false));
  };

  const handleShowUserInfo = (userId: number) => {
    setSelectedUserId(undefined);
    setSelectedUserId(userId);
    open();
  };

  const handleMarkAsDebit = (order: Order) => {
    setLoading(true);
    markOrderAsDebt(order).then(() => {
      notifications.show({
        message: 'Divida marcada com débito!',
        color: 'green',
      });
      getOrders().finally(() => setLoading(false));
    });
  };

  const handleMarkAsDebitDone = (order: Order) => {
    setLoading(true);
    markOrderAsDebtDone(order).then(() => {
      notifications.show({
        message: 'Divida marcada com paga!',
        color: 'green',
      });
      getOrders().finally(() => setLoading(false));
    });
  };

  return (
    <>
      <LoadingOverlay visible={loading} zIndex={1000} />
      {orders && (
        <Table
          cols={[
            'Status',
            'Tipo',
            'Desconto',
            'Taxa',
            'Total',
            'Tipo de pagamento',
            'Itens',
            'Ações',
          ]}
          rows={orders.map((o) => [
            <Badge
              radius="sm"
              color={ORDER_STATUS.find((s) => s.value === o.status)?.color}
            >
              {ORDER_STATUS.find((s) => s.value === o.status)?.label}
            </Badge>,
            <Badge radius="sm" color="gray">
              {ORDER_TYPES.find((t) => t.value === o.orderType)?.label}
            </Badge>,
            getPriceLabel(o.discount),
            getPriceLabel(o.fees),
            getPriceLabel(o.total),
            <Badge radius="sm" color="gray">
              {PAYMENT_TYPES.find((t) => t.value === o.paymentType)?.label}
            </Badge>,
            <List size="sm">
              {o.items.map((i) => (
                <List.Item key={i.id}>
                  {i.quantity}x {i.name} {getPriceLabel(i.price)}
                </List.Item>
              ))}
            </List>,
            <Group>
              <ActionIcon
                color="red"
                variant="filled"
                aria-label="Settings"
                onClick={() => handleRemoveOrder(Number(o.id))}
              >
                <IconTrash
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
              {o.status === 'DEBT' ? (
                <ActionIcon
                  color="green"
                  variant="filled"
                  aria-label="Settings"
                  onClick={() => handleMarkAsDebitDone(o)}
                >
                  <IconCoin
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              ) : (
                <ActionIcon
                  color="red"
                  variant="filled"
                  aria-label="Settings"
                  onClick={() => handleMarkAsDebit(o)}
                >
                  <IconCoinOff
                    style={{ width: '70%', height: '70%' }}
                    stroke={1.5}
                  />
                </ActionIcon>
              )}
              <ActionIcon
                color="blue"
                variant="filled"
                aria-label="User"
                onClick={() => handleShowUserInfo(Number(o.userId ?? ''))}
              >
                <IconUser
                  style={{ width: '70%', height: '70%' }}
                  stroke={1.5}
                />
              </ActionIcon>
            </Group>,
          ])}
        />
      )}
      <UserInfoModal userId={selectedUserId} opened={opened} close={close} />
    </>
  );
}

export default OrderTable;
