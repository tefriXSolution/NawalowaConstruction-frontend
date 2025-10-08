import { useRentalPage } from '@/pages/rentalItemsPage/hooks/useRentalPage';
import {
  PageHeader,
  CategoryFilter,
  ResultsInfo,
  RentalItemsGrid,
  Pagination,
  BackToTopButton,
  LoadingGrid,
  ErrorMessage,
} from '@/pages/rentalItemsPage/components';

export const RentalItemsPage = () => {
  const {
    selectedCategory,
    currentPage,
    categories,
    displayedItems,
    totalPages,
    totalItems,
    loading,
    error,
    handleCategoryChange,
    handlePageChange,
    handleRentItem,
    refreshData,
    scrollToTop,
  } = useRentalPage();

  return (
    <main className='min-h-screen bg-light-gray'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12 max-w-7xl'>
        <PageHeader
          title='Equipment for Rent'
          description='Browse our comprehensive collection of high-quality construction and industrial equipment available for rent. Professional-grade tools for all your project needs.'
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={handleCategoryChange}
          loading={loading.isLoading}
        />

        {error.hasError ? (
          <ErrorMessage
            message={error.error || 'Something went wrong'}
            onRetry={refreshData}
          />
        ) : (
          <>
            <ResultsInfo
              displayedCount={displayedItems.length}
              totalCount={totalItems}
              selectedCategory={selectedCategory}
              loading={loading.isLoading}
            />

            {loading.isLoading ? (
              <LoadingGrid />
            ) : (
              <RentalItemsGrid
                items={displayedItems}
                onRentItem={handleRentItem}
                loading={loading.isRefreshing}
              />
            )}

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              loading={loading.isLoading}
            />
          </>
        )}

        <BackToTopButton onClick={scrollToTop} />
      </div>
    </main>
  );
};
