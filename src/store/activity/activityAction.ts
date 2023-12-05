import { Activity } from '@/type/activity';
import { UserRegistration } from '@/type/user';

export const GET_ACTIVITY = 'GET_ACTIVITY';
export const GET_ACTIVITIES = 'GET_ACTIVITIES';
export const GET_ACTIVITY_REGISTRATIONS = 'GET_ACTIVITY_REGISTRATIONS';

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
