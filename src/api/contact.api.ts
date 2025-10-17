import { apiClient } from '@/api/apis.config';

export interface CreateContactMessagePayload {
    name: string;
    email: string;
    phone?: string;
    message: string;
}

export interface CreateContactMessageResponse {
    message: string;
    error: boolean;
    errorMessage?: string;
    contactMessage?: any;
}

export const createContactMessageApi = async (
    payload: CreateContactMessagePayload,
): Promise<CreateContactMessageResponse> => {
    // Backend routes: POST /contact/send-message (public)
    const res = await apiClient.post('/contact/send-message', payload);
    return res.data as CreateContactMessageResponse;
};
