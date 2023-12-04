import { Question } from '@/type/question';
import { requestService } from '@/utils/requestService';

export const requestGetQuestion = (id: string) =>
  requestService(`http://localhost:4000/questions/${id}`, {}, {}, false, 'GET');

export const requestPutQuestion = (question: Question) =>
  requestService(
    `http://localhost:4000/questions/${question.id}`,
    question,
    {},
    false,
    'PUT'
  );

export const requestPostQuestion = (question: Question) =>
  requestService(
    `http://localhost:4000/questions`,
    question,
    {},
    false,
    'POST'
  );

export const requestDeleteQuestion = (id: string) =>
  requestService(
    `http://localhost:4000/questions/${id}`,
    {},
    {},
    false,
    'DELETE'
  );
