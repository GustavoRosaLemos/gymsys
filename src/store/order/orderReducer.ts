import { Order } from '@/type/order';
import * as orderActions from './orderActions';

interface State {
  orders?: Order[];
  userOrders?: Order[];
}

const INITIAL_STATE: State = {
  orders: undefined,
  userOrders: undefined,
};

export type Actions = orderActions.GetOrders | orderActions.GetUserOrders;

// eslint-disable-next-line default-param-last
export const orderReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case orderActions.GET_USER_ORDERS: {
      const { userOrders } = action.payload;
      return {
        ...state,
        userOrders,
      };
    }
    case orderActions.GET_ORDERS: {
      const { orders } = action.payload;
      return {
        ...state,
        orders,
      };
    }
    default:
      return state;
  }
};
