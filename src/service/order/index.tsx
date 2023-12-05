import { Order } from '@/type/order';
import { requestService } from '@/utils/requestService';

export const requestGetOrder = async (id: number) =>
  requestService(`http://localhost:4000/orders/${id}`, {}, {});

export const requestGetOrders = async () =>
  requestService('http://localhost:4000/orders', {}, {});

export const requestPostOrder = async (order: Order) =>
  requestService('http://localhost:4000/orders', order, {}, false, 'POST');

export const requestDeleteOrder = async (id: number) =>
  requestService(`http://localhost:4000/orders/${id}`, {}, {}, false, 'DELETE');

export const requestPutOrder = async (order: Order) =>
  requestService(
    `http://localhost:4000/orders/${order.id}`,
    order,
    {},
    false,
    'PUT'
  );

export const requestUserOrders = async (userId: number) =>
  requestService(
    `http://localhost:4000/orders/?userId=${userId}`,
    {},
    {},
    false,
    'GET'
  );
