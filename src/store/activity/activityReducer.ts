import { Activity } from '@/type/activity';
import { UserRegistration } from '@/type/user';
import * as activityActions from './activityAction';

interface State {
  activity?: Activity;
  activities?: Activity[];
  activityRegistrations?: UserRegistration[];
}

const INITIAL_STATE: State = {
  activity: undefined,
  activities: undefined,
  activityRegistrations: undefined,
};

export type Actions =
  | activityActions.GetActivities
  | activityActions.GetActivity
  | activityActions.GetActivityRegistrations;

// eslint-disable-next-line default-param-last
export const activityReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case activityActions.GET_ACTIVITIES: {
      const { activities } = action.payload;
      return {
        ...state,
        activities,
      };
    }
    case activityActions.GET_ACTIVITY: {
      const { activity } = action.payload;
      return {
        ...state,
        activity,
      };
    }
    case activityActions.GET_ACTIVITY_REGISTRATIONS: {
      const { activityRegistrations } = action.payload;
      return {
        ...state,
        activityRegistrations,
      };
    }
    default:
      return state;
  }
};
