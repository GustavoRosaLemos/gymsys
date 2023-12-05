import { Order } from '@/type/order';

export const GET_USER_ORDERS = 'GET_USER_ORDERS';
export const GET_ORDERS = 'GET_ORDERS';

export const getUserOrders = (userOrders: Order[]) => ({
  type: GET_USER_ORDERS,
  payload: {
    userOrders,
  },
});

export interface GetUserOrders {
  type: typeof GET_USER_ORDERS;
  payload: {
    userOrders: Order[];
  };
}

export const getOrders = (orders: Order[]) => ({
  type: GET_ORDERS,
  payload: {
    orders,
  },
});

export interface GetOrders {
  type: typeof GET_ORDERS;
  payload: {
    orders: Order[];
  };
}
