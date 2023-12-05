import { User, UserRegistration } from '@/type/user';
import * as userActions from './userAction';

interface State {
  users?: User[];
  userData?: User;
  registrations?: UserRegistration[];
}

const INITIAL_STATE: State = {
  users: undefined,
  userData: undefined,
  registrations: undefined,
};

export type Actions =
  | userActions.GetUsers
  | userActions.GetUserData
  | userActions.GetRegistrations;

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
    case userActions.GET_REGISTRATIONS: {
      const { registrations } = action.payload;
      return {
        ...state,
        registrations,
      };
    }
    default:
      return state;
  }
};
