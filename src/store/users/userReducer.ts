import { User } from '@/type/user';
import * as userActions from './userAction';

interface State {
  users?: User[];
}

const INITIAL_STATE: State = {
  users: undefined,
};

export type Actions = userActions.GetUsers;

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

    default:
      return state;
  }
};
