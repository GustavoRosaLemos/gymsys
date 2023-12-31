import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  requestDeleteActivity,
  requestGetActivities,
  requestGetActivity,
  requestPostActivity,
  requestPutActivity,
} from '@/service/activity';
import { Activity } from '@/type/activity';
import { requestGetActivityRegistrations } from '@/service/registration';
import { User } from '@/type/user';
import * as activityActions from '../activity/activityAction';
import { RootState } from '..';

const useActivityState = () =>
  useSelector((rootState: RootState) => rootState.activityState);

export const useActivity = () => useActivityState().activity;

export const useActivities = () => useActivityState().activities;

export const useGetActivity = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (id: string) => {
      const activity = await requestGetActivity(id);
      dispatch(activityActions.getActivity(activity));
    },
    [dispatch]
  );
};

export const useGetActivities = () => {
  const dispatch = useDispatch();

  return useCallback(async () => {
    const activities = await requestGetActivities();
    console.log(activities);
    dispatch(activityActions.getActivities(activities));
  }, [dispatch]);
};

export const usePutActivity = () =>
  useCallback(async (activity: Activity) => requestPutActivity(activity), []);

export const useRemoveActivity = () =>
  useCallback(async (id: string) => requestDeleteActivity(id), []);

export const usePostActivity = () =>
  useCallback(async (activity: Activity) => requestPostActivity(activity), []);

export const useActivityRegistrations = () =>
  useActivityState().activityRegistrations;

export const useGetActivityRegistrations = () => {
  const dispatch = useDispatch();
  return useCallback(
    async (activityId: string) => {
      const registrations = await requestGetActivityRegistrations(activityId);
      dispatch(activityActions.getActivityRegistrations(registrations));
    },
    [dispatch]
  );
};

export const useSelectedActivity = () => useActivityState().selectedActivity;

export const useSelectAtivity = () => {
  const dispatch = useDispatch();
  return useCallback(
    (activity: Activity) => {
      dispatch(activityActions.selectActivity(activity));
    },
    [dispatch]
  );
};

export const useActivityUsers = () => useActivityState().activityUsers;

export const useClearActivityUsers = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(activityActions.clearActivityUsers());
  }, [dispatch]);
};

export const useAddActivityUser = () => {
  const dispatch = useDispatch();

  return useCallback(
    (user: User) => {
      dispatch(activityActions.addActivityUser(user));
    },
    [dispatch]
  );
};
