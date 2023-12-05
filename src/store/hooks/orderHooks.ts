import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  requestDeleteOrder,
  requestGetOrders,
  requestPostOrder,
  requestPutOrder,
  requestUserOrders,
} from '@/service/order';
import { Order } from '@/type/order';
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
