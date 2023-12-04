import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import {
  requestGetQuestion,
  requestPostQuestion,
  requestPutQuestion,
} from '@/service/question';
import { Question } from '@/type/question';
import { RootState } from '..';
import * as questionActions from '../question/questionAction';

const useQuestionState = () =>
  useSelector((rootState: RootState) => rootState.questionState);

export const useQuestion = () => useQuestionState().question;

export const useGetQuestion = () => {
  const dispatch = useDispatch();

  return useCallback(
    async (id: string) => {
      const question = await requestGetQuestion(id);
      dispatch(questionActions.getQuestion(question));
    },
    [dispatch]
  );
};

export const usePutQuestion = () =>
  useCallback((question: Question) => requestPutQuestion(question), []);

export const usePostQuestion = () =>
  useCallback((question: Question) => requestPostQuestion(question), []);

export const useClearQuestion = () => {
  const dispatch = useDispatch();

  return useCallback(() => {
    dispatch(questionActions.clearQuestion());
  }, [dispatch]);
};
