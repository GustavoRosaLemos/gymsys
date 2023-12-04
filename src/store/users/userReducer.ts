import { User } from '@/type/user';
import * as userActions from './userAction';

interface State {
  users?: User[];
  userData?: User;
}

const INITIAL_STATE: State = {
  users: undefined,
  userData: undefined,
};

export type Actions = userActions.GetUsers | userActions.GetUserData;

// eslint-disable-next-line default-param-last
export const userReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case userActions.GET_USERS: {
      const { users } = action.payload;
      return {
        ...state,
        users,
      };
    }
    case userActions.GET_USER_DATA: {
      const { userData } = action.payload;
      return {
        ...state,
        userData,
      };
    }
    default:
      return state;
  }
};
