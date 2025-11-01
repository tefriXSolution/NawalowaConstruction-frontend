import {
  RentalItem,
  PaginatedResponse,
  ApiResponse,
  RentalFilters,
} from '@/pages/rentalItemsPage/types';

const API_BASE_URL =
  (import.meta.env.VITE_API_BASE_URL as string | undefined) || 'http://localhost:5001/api';

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
    try {
      // Backend endpoint: GET /api/rent-items
      // Backend returns: { message, error, data: RentItem[] }
      const response = await this.makeRequest<{
        message: string;
        error: boolean;
        data: Array<{
          _id: string;
          name: string;
          description: string;
          price: number;
          availability: boolean;
          category: string;
          images: string[];
        }>;
      }>('/rent-items');

      if (response.error) {
        throw new Error(response.message || 'Failed to fetch rental items');
      }

      // Transform backend data to frontend format
      const allItems = (response.data || []).map((item, index) => ({
        id: index + 1, // or use a hash of _id
        title: item.name,
        description: item.description,
        pricePerDay: item.price,
        image: item.images && item.images.length > 0 ? item.images[0] : '',
        category: item.category,
        availability: item.availability,
      }));

      // Apply frontend filters
      let filteredItems = allItems;
      
      if (filters.category && filters.category !== 'all') {
        filteredItems = filteredItems.filter(
          item => item.category.toLowerCase() === filters.category?.toLowerCase()
        );
      }
      
      if (filters.availability !== undefined) {
        filteredItems = filteredItems.filter(
          item => item.availability === filters.availability
        );
      }
      
      if (filters.minPrice !== undefined) {
        filteredItems = filteredItems.filter(
          item => item.pricePerDay >= filters.minPrice!
        );
      }
      
      if (filters.maxPrice !== undefined) {
        filteredItems = filteredItems.filter(
          item => item.pricePerDay <= filters.maxPrice!
        );
      }
      
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredItems = filteredItems.filter(
          item =>
            item.title.toLowerCase().includes(searchLower) ||
            item.description.toLowerCase().includes(searchLower)
        );
      }

      // Apply pagination
      const totalItems = filteredItems.length;
      const totalPages = Math.ceil(totalItems / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedItems = filteredItems.slice(startIndex, endIndex);

      return {
        data: paginatedItems,
        pagination: {
          currentPage: page,
          totalPages: totalPages,
          totalItems: totalItems,
          itemsPerPage: limit,
        },
        message: response.message || 'Success',
        success: !response.error,
      };
    } catch (error) {
      console.error('Error fetching rental items:', error);
      throw error;
    }
  }

  async getRentalCategories(): Promise<ApiResponse<string[]>> {
    try {
      // Backend endpoint: GET /api/rent-items/categories
      // Backend returns: { message, error, data: Category[] }
      // Category schema: { category: string, _id: string, createdAt, updatedAt }
      const response = await this.makeRequest<{
        message: string;
        error: boolean;
        data: Array<{ category: string; _id: string }> | null;
      }>('/rent-items/categories');

      if (response.error || !response.data) {
        throw new Error(response.message || 'Failed to fetch categories');
      }

      // Extract category names from the response
      const categoryNames = response.data.map(cat => cat.category);

      return {
        data: categoryNames,
        message: response.message || 'Success',
        success: !response.error,
      };
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
  }

  async getRentalItem(id: number): Promise<ApiResponse<RentalItem>> {
    return this.makeRequest<ApiResponse<RentalItem>>(`/rent-items/${id}`);
  }

  async rentItem(
    itemId: number,
    rentalDetails: any,
  ): Promise<ApiResponse<any>> {
    return this.makeRequest<ApiResponse<any>>(`/rent-items/${itemId}/rent`, {
      method: 'POST',
      body: JSON.stringify(rentalDetails),
    });
  }

  async checkAvailability(
    itemId: number,
    dates: { startDate: string; endDate: string },
  ): Promise<ApiResponse<boolean>> {
    return this.makeRequest<ApiResponse<boolean>>(
      `/rent-items/${itemId}/availability`,
      {
        method: 'POST',
        body: JSON.stringify(dates),
      },
    );
  }
}

export const rentalApiService = new RentalApiService();
