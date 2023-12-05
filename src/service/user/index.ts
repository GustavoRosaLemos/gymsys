import { User } from '@/type/user';
import { requestService } from '@/utils/requestService';

export const requestGetUser = async (id: number) =>
  requestService(`http://localhost:4000/users/${id}`, {}, {});

export const requestGetUsers = async () =>
  requestService('http://localhost:4000/users', {}, {});

export const requestPostUser = async (user: User) =>
  requestService('http://localhost:4000/users', user, {}, false, 'POST');

export const requestDeleteUser = async (id: string) =>
  requestService(`http://localhost:4000/users/${id}`, {}, {}, false, 'DELETE');

export const requestPutUser = async (user: User) =>
  requestService(
    `http://localhost:4000/users/${user.id}`,
    user,
    {},
    false,
    'PUT'
  );
