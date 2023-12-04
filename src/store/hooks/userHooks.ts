import {
  requestDeleteUser,
  requestGetUsers,
  requestPostUser,
  requestPutUser,
} from '@/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { User } from '@/type/user';
import * as userActions from '../users/userAction';
import { RootState } from '..';

const useUserState = () =>
  useSelector((rootState: RootState) => rootState.userState);

export const useUsers = () => useUserState().users;

export const useGetUsers = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const users = await requestGetUsers();
    dispatch(userActions.getUsers(users));
  }, [dispatch]);
};

export const usePostUser = () =>
  useCallback(async (user: User) => requestPostUser(user), []);

export const useDeleteUser = () =>
  useCallback(async (id: string) => requestDeleteUser(id), []);

export const usePutUser = () =>
  useCallback(async (user: User) => requestPutUser(user), []);

export const useUserData = () => useUserState().userData;

export const useGetUserData = () => {
  const dispatch = useDispatch();

  return useCallback(
    (userData: User) => {
      dispatch(userActions.getUserData(userData));
    },
    [dispatch]
  );
};
