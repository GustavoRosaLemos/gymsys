import { combineReducers } from 'redux';
import { userReducer } from './users/userReducer';
import { questionReducer } from './question/questionReducer';
import { activityReducer } from './activity/activityReducer';
import { productReducer } from './product/productReducer';
import { orderReducer } from './order/orderReducer';

const reducers = combineReducers({
  userState: userReducer,
  questionState: questionReducer,
  activityState: activityReducer,
  productState: productReducer,
  orderState: orderReducer,
});

export type RootState = ReturnType<typeof reducers>;

export default reducers;
