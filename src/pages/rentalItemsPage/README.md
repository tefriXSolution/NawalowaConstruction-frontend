# Rental Items Page - Backend Integration Guide

## Overview

The rental items page is now fully prepared for backend integration with comprehensive API support, loading states, error handling, and proper data management.

## Features

### ✅ Backend Ready Features

- **API Service Layer** - Complete REST API integration
- **Loading States** - Skeleton loading and spinner components
- **Error Handling** - User-friendly error messages with retry functionality
- **Pagination** - Server-side pagination support
- **Filtering** - Category, price, and availability filters
- **Search** - Full-text search capability
- **Mock Data Fallback** - Seamless development experience

## Configuration

### Environment Variables

Create a `.env` file in the project root with:

```env
# API Configuration
REACT_APP_API_BASE_URL=http://localhost:3001/api

# Development Settings
REACT_APP_USE_MOCK_DATA=true
```

### Development vs Production

- **Development**: Set `REACT_APP_USE_MOCK_DATA=true` to use static data
- **Production**: Set `REACT_APP_USE_MOCK_DATA=false` to use real API

## API Endpoints Expected

### 1. Get Rental Items (Paginated)

```
GET /api/rentals?page=1&limit=6&category=painting&search=machine
```

**Response:**

```json
{
  "data": [
    {
      "id": 1,
      "title": "Painting Machine",
      "description": "High-efficiency painting machine...",
      "pricePerDay": 2500,
      "image": "https://example.com/image.jpg",
      "category": "painting",
      "availability": true,
      "createdAt": "2024-01-01T00:00:00Z",
      "updatedAt": "2024-01-01T00:00:00Z"
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalPages": 5,
    "totalItems": 25,
    "itemsPerPage": 6
  },
  "message": "Items retrieved successfully",
  "success": true
}
```

### 2. Get Categories

```
GET /api/rentals/categories
```

**Response:**

```json
{
  "data": ["painting", "cleaning", "construction", "power", "grinding"],
  "message": "Categories retrieved successfully",
  "success": true
}
```

### 3. Get Single Item

```
GET /api/rentals/:id
```

### 4. Rent Item

```
POST /api/rentals/:id/rent
```

**Request Body:**

```json
{
  "itemId": 1,
  "startDate": "2024-01-01T00:00:00Z",
  "endDate": "2024-01-08T00:00:00Z"
}
```

### 5. Check Availability

```
POST /api/rentals/:id/availability
```

## Query Parameters Supported

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 6)
- `category` - Filter by category
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `availability` - Filter by availability (true/false)
- `search` - Search in title and description

## Component Props with Loading States

All components now support loading states:

```tsx
<CategoryFilter loading={isLoading} />
<ResultsInfo loading={isLoading} />
<RentalItemsGrid loading={isRefreshing} />
<Pagination loading={isLoading} />
```

## Error Handling

The page includes comprehensive error handling:

- **Network errors** - Connection issues, timeouts
- **API errors** - Server errors, validation errors
- **Retry functionality** - Users can retry failed requests
- **Fallback to mock data** - Graceful degradation

## Usage Examples

### Switch to API Mode

```env
REACT_APP_USE_MOCK_DATA=false
REACT_APP_API_BASE_URL=https://your-api.com/api
```

### Custom API Integration

```typescript
import { rentalApiService } from '@/pages/rentalItemsPage/services';

// Fetch items with filters
const items = await rentalApiService.getRentalItems(1, 6, {
  category: 'painting',
  minPrice: 1000,
  maxPrice: 5000,
  search: 'machine',
});
```

## File Structure

```
src/pages/rentalItemsPage/
├── components/
│   ├── ErrorComponents.tsx      # Error handling UI
│   ├── LoadingComponents.tsx    # Loading states UI
│   └── ...other components
├── hooks/
│   └── useRentalPage.ts        # Main hook with API logic
├── services/
│   └── rentalApiService.ts     # API service layer
├── types/
│   └── index.ts               # TypeScript interfaces
└── data/
    └── rentalData.ts          # Mock data fallback
```

## Next Steps for Backend Integration

1. **Set up your API server** with the expected endpoints
2. **Update environment variables** to point to your API
3. **Set `REACT_APP_USE_MOCK_DATA=false`**
4. **Test API integration** and adjust as needed
5. **Handle authentication** if required (add to API service)

## Performance Optimizations Included

- **Memoized API calls** - Prevents unnecessary requests
- **Loading states** - Better user experience
- **Error boundaries** - Graceful error handling
- **Optimistic updates** - Immediate UI feedback

The rental page is now production-ready and can seamlessly connect to your backend API!
