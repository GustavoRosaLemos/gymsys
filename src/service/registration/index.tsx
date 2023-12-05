import { UserRegistration } from '@/type/user';
import { requestService } from '@/utils/requestService';

export const requestGetUserRegistrations = async (userId: string) =>
  requestService(
    `http://localhost:4000/registrations?userId=${userId}`,
    {},
    {}
  );

export const requestGetActivityRegistrations = async (activityId: string) =>
  requestService(
    `http://localhost:4000/registrations?activityId=${activityId}`,
    {},
    {}
  );

export const requestDeleteUserRegistration = async (registrationId: string) =>
  requestService(
    `http://localhost:4000/registrations/${registrationId}`,
    {},
    {},
    false,
    'DELETE'
  );

export const requestPostUserRegistration = async (
  userRegistration: UserRegistration
) =>
  requestService(
    `http://localhost:4000/registrations`,
    userRegistration,
    {},
    false,
    'POST'
  );
