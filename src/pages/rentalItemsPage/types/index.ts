export interface RentalItem {
  id: string;
  title: string;
  description: string;
  pricePerDay: number;
  image: string[];
  category: string;
  availability?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface ApiResponse<T> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
  message: string;
  success: boolean;
}

export interface RentalFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  availability?: boolean;
  search?: string;
}

export interface LoadingState {
  isLoading: boolean;
  isRefreshing?: boolean;
}

export interface ErrorState {
  error: string | null;
  hasError: boolean;
}

export interface RentalPageState {
  selectedCategory: string;
  currentPage: number;
  itemsPerPage: number;
  filters: RentalFilters;
  loading: LoadingState;
  error: ErrorState;
}

export interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading?: boolean;
}

export interface RentalItemsGridProps {
  items: RentalItem[];
  onRentItem: (itemId: string) => void;
  loading?: boolean;
}

export interface PageHeaderProps {
  title: string;
  description: string;
}

export interface ResultsInfoProps {
  displayedCount: number;
  totalCount: number;
  selectedCategory: string;
  loading?: boolean;
}
