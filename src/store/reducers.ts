import { combineReducers } from 'redux';
import { userReducer } from './users/userReducer';
import { questionReducer } from './question/questionReducer';
import { activityReducer } from './activity/activityReducer';

const reducers = combineReducers({
  userState: userReducer,
  questionState: questionReducer,
  activityState: activityReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
