import { Activity } from '@/type/activity';
import { requestService } from '@/utils/requestService';

export const requestGetActivity = (id: string) =>
  requestService(
    `http://localhost:4000/activities/${id}`,
    {},
    {},
    false,
    'GET'
  );

export const requestGetActivities = () =>
  requestService(`http://localhost:4000/activities`, {}, {}, false, 'GET');

export const requestPutActivity = (activity: Activity) =>
  requestService(
    `http://localhost:4000/activities/${activity.id}`,
    activity,
    {},
    false,
    'PUT'
  );

export const requestPostActivity = (activity: Activity) =>
  requestService(
    `http://localhost:4000/activities`,
    activity,
    {},
    false,
    'POST'
  );

export const requestDeleteActivity = (id: string) =>
  requestService(
    `http://localhost:4000/activities/${id}`,
    {},
    {},
    false,
    'DELETE'
  );
