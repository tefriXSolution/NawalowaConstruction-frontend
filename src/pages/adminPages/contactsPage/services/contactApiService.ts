import { ApiResponse, Contact, PaginatedResponse } from '../types';

const RAW_BASE = (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:3001/api';
const API_BASE_URL = RAW_BASE
    .replace(/\/$/, '');

class ContactApiService {
    private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
        const url = `${API_BASE_URL}${cleanEndpoint}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {}),
                ...(localStorage.getItem('token')
                    ? { Authorization: `Bearer ${localStorage.getItem('token')}` }
                    : {}),
            },
            ...options,
        });

        if (!response.ok) {
            const text = await response.text().catch(() => '');
            throw new Error(text || `HTTP error! status: ${response.status}`);
        }

        return response.json();
    }

    async getContacts(): Promise<ApiResponse<Contact[]>> {
        // Backend returns: { contactMessages: Contact[], message: string, error: boolean }
        const raw = await this.makeRequest<{ contactMessages: Contact[]; message?: string; error?: boolean }>('/contact');
        return {
            data: raw.contactMessages ?? [],
            message: raw.message ?? 'OK',
            success: !raw.error,
        } as ApiResponse<Contact[]>;
    }

    async getContactsPaginated(page = 1, limit = 10): Promise<PaginatedResponse<Contact>> {
        const params = new URLSearchParams({ page: String(page), limit: String(limit) });
        return this.makeRequest<PaginatedResponse<Contact>>(`/contact?${params}`);
    }

    async markAsRead(id: string | number): Promise<ApiResponse<{ id: string | number }>> {
        // Use the same pattern as other methods: rely on API_BASE_URL for base path.
        const endpoint = `/contact/message/${id}/read`;
        const res = await this.makeRequest<{ message?: string; error?: boolean }>(endpoint, {
            method: 'POST',
        });
        return {
            data: { id },
            message: res.message ?? 'Marked as read',
            success: res.error === false || res.error === undefined,
        };
    }
}

export const contactApiService = new ContactApiService();
