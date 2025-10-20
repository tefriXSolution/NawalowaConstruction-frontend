export interface Contact {
    _id?: string;
    id?: number;
    name: string;
    email: string;
    phone?: string;
    message: string;
    createdAt?: string;
    updatedAt?: string;
    isRead?: boolean;
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
