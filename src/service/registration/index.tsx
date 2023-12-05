import { requestService } from '@/utils/requestService';

export const requestGetUserRegistrations = async (userId: string) =>
  requestService(
    `http://localhost:4000/registrations?userId=${userId}`,
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
