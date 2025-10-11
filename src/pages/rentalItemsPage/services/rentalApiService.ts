import {
  RentalItem,
  PaginatedResponse,
  ApiResponse,
  RentalFilters,
} from '@/pages/rentalItemsPage/types';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

class RentalApiService {
  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {},
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    try {
      const response = await fetch(url, {
        headers: {
          'Content-Type': 'application/json',
          ...options.headers,
        },
        ...options,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async getRentalItems(
    page: number = 1,
    limit: number = 6,
    filters: RentalFilters = {},
  ): Promise<PaginatedResponse<RentalItem>> {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filters.category && filters.category !== 'all') {
      params.append('category', filters.category);
    }
    if (filters.minPrice) {
      params.append('minPrice', filters.minPrice.toString());
    }
    if (filters.maxPrice) {
      params.append('maxPrice', filters.maxPrice.toString());
    }
    if (filters.availability !== undefined) {
      params.append('availability', filters.availability.toString());
    }
    if (filters.search) {
      params.append('search', filters.search);
    }

    return this.makeRequest<PaginatedResponse<RentalItem>>(
      `/rentals?${params}`,
    );
  }

  async getRentalCategories(): Promise<ApiResponse<string[]>> {
    return this.makeRequest<ApiResponse<string[]>>('/rentals/categories');
  }

  async getRentalItem(id: number): Promise<ApiResponse<RentalItem>> {
    return this.makeRequest<ApiResponse<RentalItem>>(`/rentals/${id}`);
  }

  async rentItem(
    itemId: number,
    rentalDetails: any,
  ): Promise<ApiResponse<any>> {
    return this.makeRequest<ApiResponse<any>>(`/rentals/${itemId}/rent`, {
      method: 'POST',
      body: JSON.stringify(rentalDetails),
    });
  }

  async checkAvailability(
    itemId: number,
    dates: { startDate: string; endDate: string },
  ): Promise<ApiResponse<boolean>> {
    return this.makeRequest<ApiResponse<boolean>>(
      `/rentals/${itemId}/availability`,
      {
        method: 'POST',
        body: JSON.stringify(dates),
      },
    );
  }
}

export const rentalApiService = new RentalApiService();
