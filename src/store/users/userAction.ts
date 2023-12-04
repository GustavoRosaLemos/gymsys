import { User } from '@/type/user';

export const GET_USERS = 'GET_USERS';

export const getUsers = (users: User[]) => ({
  type: GET_USERS,
  payload: {
    users,
  },
});

export interface GetUsers {
  type: typeof GET_USERS;
  payload: {
    users: User[];
  };
}
