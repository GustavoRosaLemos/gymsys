import { User, UserRegistration } from '@/type/user';

export const GET_USERS = 'GET_USERS';
export const GET_USER_DATA = 'GET_USER_DATA';
export const GET_REGISTRATIONS = 'GET_REGISTRATIONS';

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

export const getUserData = (userData: User) => ({
  type: GET_USER_DATA,
  payload: {
    userData,
  },
});

export interface GetUserData {
  type: typeof GET_USER_DATA;
  payload: {
    userData: User;
  };
}

export const getRegistrations = (registrations: UserRegistration[]) => ({
  type: GET_REGISTRATIONS,
  payload: {
    registrations,
  },
});

export interface GetRegistrations {
  type: typeof GET_REGISTRATIONS;
  payload: {
    registrations: UserRegistration[];
  };
}
