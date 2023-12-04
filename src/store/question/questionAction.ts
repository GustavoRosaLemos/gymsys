import { Question } from '@/type/question';

export const GET_QUESTION = 'GET_QUESTION';
export const CLEAR_QUESTION = 'CLEAR_QUESTION';

export const getQuestion = (question: Question) => ({
  type: GET_QUESTION,
  payload: {
    question,
  },
});

export interface GetQuestion {
  type: typeof GET_QUESTION;
  payload: {
    question: Question;
  };
}

export const clearQuestion = () => ({
  type: CLEAR_QUESTION,
});

export interface ClearQuestion {
  type: typeof CLEAR_QUESTION;
}
