import { Question } from '@/type/question';
import * as questionActions from './questionAction';

interface State {
  question?: Question;
}

const INITIAL_STATE: State = {
  question: undefined,
};

export type Actions =
  | questionActions.GetQuestion
  | questionActions.ClearQuestion;

// eslint-disable-next-line default-param-last
export const questionReducer = (state = INITIAL_STATE, action: Actions) => {
  switch (action.type) {
    case questionActions.GET_QUESTION: {
      const { question } = action.payload;
      return {
        ...state,
        question,
      };
    }
    case questionActions.CLEAR_QUESTION: {
      return {
        ...state,
        question: undefined,
      };
    }
    default:
      return state;
  }
};
