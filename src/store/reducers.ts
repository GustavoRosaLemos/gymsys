import { combineReducers } from 'redux';
import { userReducer } from './users/userReducer';

const reducers = combineReducers({
  userState: userReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
