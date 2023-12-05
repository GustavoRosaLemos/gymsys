import { Activity } from '@/type/activity';
import { User, UserRegistration } from '@/type/user';
import * as activityActions from './activityAction';

interface State {
  activity?: Activity;
  activities?: Activity[];
  activityRegistrations?: UserRegistration[];
  selectedActivity?: Activity;
  activityUsers: User[];
}

const INITIAL_STATE: State = {
  activity: undefined,
  activities: undefined,
  activityRegistrations: undefined,
  selectedActivity: undefined,
  activityUsers: [],
};

export type Actions =
  | activityActions.GetActivities
  | activityActions.GetActivity
  | activityActions.GetActivityRegistrations
  | activityActions.SelectActivity
  | activityActions.ClearActivityUsers
  | activityActions.AddActivityUser;

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
    case activityActions.SELECT_ACTIVITY: {
      const { selectedActivity } = action.payload;
      return {
        ...state,
        selectedActivity,
      };
    }
    case activityActions.CLEAR_ACTIVITY_USERS: {
      return {
        ...state,
        activityUsers: [],
      };
    }
    case activityActions.ADD_ACTIVITY_USER: {
      const { user } = action.payload;
      const { activityUsers } = state;
      const updatedActivityUsers = activityUsers
        ? [...activityUsers, user]
        : [user];

      return {
        ...state,
        activityUsers: updatedActivityUsers,
      };
    }
    default:
      return state;
  }
};
