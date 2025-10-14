import { apiClient } from '@/api/apis.config';
import { Credentials, LoginAPIResponse, LogOutResponse } from '@/types';

export const loginApi = async (
  credentials: Credentials,
): Promise<LoginAPIResponse> => {
  const response = await apiClient.post('/users/signin', credentials);
  return response.data;
};
export const logOutApi = async (
  email:string
): Promise<LogOutResponse> => {
  const response = await apiClient.post('/users/signout', {email});
  return response.data;
};
