import { apiClient } from '@/api/apis.config';
import { Credentials, LoginAPIResponse } from '@/types';

export const loginApi = async (
  credentials: Credentials,
): Promise<LoginAPIResponse> => {
  const response = await apiClient.post('/users/signin', credentials);
  return response.data; // Extract data from axios response
};
