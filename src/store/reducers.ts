import { combineReducers } from 'redux';
import { userReducer } from './users/userReducer';
import { questionReducer } from './question/questionReducer';

const reducers = combineReducers({
  userState: userReducer,
  questionState: questionReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
