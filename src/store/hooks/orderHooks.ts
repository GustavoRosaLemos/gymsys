import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  requestDeleteOrder,
  requestGetOrders,
  requestPostOrder,
  requestPutOrder,
  requestUserDebitOrders,
  requestUserOrders,
} from '@/service/order';
import { Order } from '@/type/order';
import { requestPatchUser } from '@/service/user';
import { RootState } from '..';
import * as OrderActions from '../order/orderActions';

const useOrderState = () =>
  useSelector((rootState: RootState) => rootState.orderState);

export const useOrders = () => useOrderState().orders;

export const useGetOrders = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const orders = await requestGetOrders();
    dispatch(OrderActions.getOrders(orders));
  }, [dispatch]);
};

export const usePostOrder = () =>
  useCallback(async (order: Order) => requestPostOrder(order), []);

export const usePutOrder = () =>
  useCallback(async (order: Order) => requestPutOrder(order), []);

export const useRemoveOrder = () =>
  useCallback(async (id: number) => requestDeleteOrder(id), []);

export const useUserOrders = () => useOrderState().userOrders;

export const useGetUserOrders = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (userId: number) => {
      const userOrders = await requestUserOrders(userId);
      dispatch(OrderActions.getUserOrders(userOrders));
    },
    [dispatch]
  );
};

export const useMarkOrderAsDebt = () =>
  useCallback(async (order: Order) => {
    await requestPutOrder({ ...order, status: 'DEBT' });
    await requestPatchUser({ id: order.userId ?? 0, status: 'DEFAULER' });
  }, []);

export const useMarkOrderAsDebtDone = () =>
  useCallback(async (order: Order) => {
    await requestPutOrder({ ...order, status: 'COMPLETED' });
    const userDebits = await requestUserDebitOrders(order.userId ?? 0);
    if (userDebits.length === 0) {
      await requestPatchUser({ id: order.userId ?? 0, status: 'ACTIVE' });
    }
  }, []);
