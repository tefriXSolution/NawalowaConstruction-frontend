import { useState, useEffect, useCallback } from 'react';
import {
  RentalItem,
  RentalPageState,
  PaginatedResponse,
} from '@/pages/rentalItemsPage/types';
import { rentalApiService } from '@/pages/rentalItemsPage/services/rentalApiService';
import {
  rentalItemsData,
  getUniqueCategories,
} from '@/pages/rentalItemsPage/data/rentalData';

const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';

export const useRentalPage = () => {
  const [state, setState] = useState<RentalPageState>({
    selectedCategory: 'all',
    currentPage: 1,
    itemsPerPage: 6,
    filters: {
      category: 'all',
    },
    loading: {
      isLoading: false,
      isRefreshing: false,
    },
    error: {
      error: null,
      hasError: false,
    },
  });

  const [items, setItems] = useState<RentalItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['all']);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const setLoading = useCallback(
    (isLoading: boolean, isRefreshing: boolean = false) => {
      setState((prev) => ({
        ...prev,
        loading: { isLoading, isRefreshing },
      }));
    },
    [],
  );

  const setError = useCallback((error: string | null) => {
    setState((prev) => ({
      ...prev,
      error: { error, hasError: !!error },
    }));
  }, []);

  const fetchRentalItems = useCallback(async () => {
    if (USE_MOCK_DATA) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await rentalApiService.getRentalItems(
        state.currentPage,
        state.itemsPerPage,
        state.filters,
      );

      if (response.success) {
        setItems(response.data);
        setTotalPages(response.pagination.totalPages);
        setTotalItems(response.pagination.totalItems);
      } else {
        throw new Error(response.message || 'Failed to fetch rental items');
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setError(errorMessage);
      console.error('Failed to fetch rental items:', error);

      // Fallback to mock data when API fails
      console.log('Falling back to mock data...');
      setItems(rentalItemsData);
      setCategories(getUniqueCategories(rentalItemsData));
      setTotalPages(Math.ceil(rentalItemsData.length / state.itemsPerPage));
      setTotalItems(rentalItemsData.length);
    } finally {
      setLoading(false);
    }
  }, [
    state.currentPage,
    state.itemsPerPage,
    state.filters,
    setLoading,
    setError,
  ]);

  const fetchCategories = useCallback(async () => {
    if (USE_MOCK_DATA) {
      setCategories(getUniqueCategories(rentalItemsData));
      return;
    }

    try {
      const response = await rentalApiService.getRentalCategories();
      if (response.success) {
        setCategories(['all', ...response.data]);
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      // Fallback to mock data categories
      setCategories(getUniqueCategories(rentalItemsData));
    }
  }, []);

  useEffect(() => {
    if (USE_MOCK_DATA) {
      setItems(rentalItemsData);
      setCategories(getUniqueCategories(rentalItemsData));
      setTotalPages(Math.ceil(rentalItemsData.length / state.itemsPerPage));
      setTotalItems(rentalItemsData.length);
    } else {
      fetchCategories();
      fetchRentalItems();
    }
  }, [fetchRentalItems, fetchCategories, state.itemsPerPage]);

  const handleCategoryChange = useCallback((category: string) => {
    setState((prev) => ({
      ...prev,
      selectedCategory: category,
      currentPage: 1,
      filters: {
        ...prev.filters,
        category: category,
      },
    }));
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setState((prev) => ({
      ...prev,
      currentPage: page,
    }));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleRentItem = useCallback(
    async (itemId: number) => {
      if (USE_MOCK_DATA) {
        console.log(`Renting item with ID: ${itemId}`);
        return;
      }

      try {
        setLoading(false, true);
        const rentalDetails = {
          itemId,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        };

        const response = await rentalApiService.rentItem(itemId, rentalDetails);

        if (response.success) {
          console.log('Item rented successfully:', response.data);
          fetchRentalItems();
        } else {
          throw new Error(response.message || 'Failed to rent item');
        }
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Failed to rent item';
        setError(errorMessage);
        console.error('Failed to rent item:', error);
      } finally {
        setLoading(false, false);
      }
    },
    [fetchRentalItems, setLoading, setError],
  );

  const refreshData = useCallback(() => {
    if (!USE_MOCK_DATA) {
      fetchRentalItems();
      fetchCategories();
    }
  }, [fetchRentalItems, fetchCategories]);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const displayedItems = USE_MOCK_DATA
    ? items
        .filter(
          (item) =>
            state.selectedCategory === 'all' ||
            item.category === state.selectedCategory,
        )
        .slice(
          (state.currentPage - 1) * state.itemsPerPage,
          state.currentPage * state.itemsPerPage,
        )
    : items;

  const filteredItemsCount = USE_MOCK_DATA
    ? items.filter(
        (item) =>
          state.selectedCategory === 'all' ||
          item.category === state.selectedCategory,
      ).length
    : totalItems;

  return {
    selectedCategory: state.selectedCategory,
    currentPage: state.currentPage,
    itemsPerPage: state.itemsPerPage,
    categories,
    displayedItems,
    totalPages: USE_MOCK_DATA
      ? Math.ceil(filteredItemsCount / state.itemsPerPage)
      : totalPages,
    totalItems: filteredItemsCount,
    loading: state.loading,
    error: state.error,
    handleCategoryChange,
    handlePageChange,
    handleRentItem,
    refreshData,
    scrollToTop,
  };
};
