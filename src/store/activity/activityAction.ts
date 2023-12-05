import { Activity } from '@/type/activity';
import { User, UserRegistration } from '@/type/user';

export const SELECT_ACTIVITY = 'SELECT_ACTIVITY';
export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITY_REGISTRATIONS = 'GET_ACTIVITY_REGISTRATIONS';
export const CLEAR_ACTIVITY_USERS = 'CLEAR_ACTIVITY_USERS';
export const ADD_ACTIVITY_USER = 'ADD_ACTIVITY_USER';

export const addActivityUser = (user: User) => ({
  type: ADD_ACTIVITY_USER,
  payload: {
    user,
  },
});

export interface AddActivityUser {
  type: typeof ADD_ACTIVITY_USER;
  payload: {
    user: User;
  };
}

export const clearActivityUsers = () => ({
  type: CLEAR_ACTIVITY_USERS,
});

export interface ClearActivityUsers {
  type: typeof CLEAR_ACTIVITY_USERS;
}

export const selectActivity = (selectedActivity: Activity) => ({
  type: SELECT_ACTIVITY,
  payload: {
    selectedActivity,
  },
});

export interface SelectActivity {
  type: typeof SELECT_ACTIVITY;
  payload: {
    selectedActivity: Activity;
  };
}

export const getActivity = (activity: Activity) => ({
  type: GET_ACTIVITY,
  payload: {
    activity,
  },
});

export interface GetActivity {
  type: typeof GET_ACTIVITY;
  payload: {
    activity: Activity;
  };
}

export const getActivities = (activities: Activity[]) => ({
  type: GET_ACTIVITIES,
  payload: {
    activities,
  },
});

export interface GetActivities {
  type: typeof GET_ACTIVITIES;
  payload: {
    activities: Activity[];
  };
}

export const getActivityRegistrations = (
  activityRegistrations: UserRegistration[]
) => ({
  type: GET_ACTIVITY_REGISTRATIONS,
  payload: {
    activityRegistrations,
  },
});

export interface GetActivityRegistrations {
  type: typeof GET_ACTIVITY_REGISTRATIONS;
  payload: {
    activityRegistrations: UserRegistration[];
  };
}
