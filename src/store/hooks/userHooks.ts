import {
  requestDeleteUser,
  requestGetUsers,
  requestPostUser,
  requestPutUser,
} from '@/service/user';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { User } from '@/type/user';
import { requestDeleteQuestion, requestPostQuestion } from '@/service/question';
import {
  requestDeleteUserRegistration,
  requestGetUserRegistrations,
} from '@/service/registration';
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
  useCallback(async (user: User) => {
    await requestPostUser(user);
    await requestPostQuestion({
      hasHealthPlan: null,
      healPlan: null,
      howToFindAcademy: null,
      howToFindAcademyAnother: null,
      praticeSports: null,
      userOfAnotherGym: null,
      whyGoToGym: [],
      whyGoToGymAnother: null,
      id: user.id,
    });
  }, []);

export const useDeleteUser = () =>
  useCallback(async (id: string) => {
    await requestDeleteUser(id);
    await requestDeleteQuestion(id);
  }, []);

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

export const useUserRegistrations = () => useUserState().registrations;

export const useGetUserRegistrations = () => {
  const dispatch = useDispatch();
  return useCallback(
    async (userId: string) => {
      const registrations = await requestGetUserRegistrations(userId);
      dispatch(userActions.getRegistrations(registrations));
    },
    [dispatch]
  );
};

export const useRemoveUserRegistration = () =>
  useCallback(
    async (activityId: string) => requestDeleteUserRegistration(activityId),
    []
  );
