import { Activity } from '@/type/activity';
import * as activityActions from './activityAction';

interface State {
  activity?: Activity;
  activities?: Activity[];
}

const INITIAL_STATE: State = {
  activity: undefined,
  activities: undefined,
};

export type Actions =
  | activityActions.GetActivities
  | activityActions.GetActivity;

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
    default:
      return state;
  }
};