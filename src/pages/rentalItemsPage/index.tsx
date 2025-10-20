import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
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
import { RentalRequestModal } from '@/components/RentalRequestModal';
import { RentalType } from '@/types/whatsappTypes';
import { RentalItem } from '@/pages/rentalItemsPage/types';

export const RentalItemsPage = () => {
  const location = useLocation();
  const [selectedRentalItem, setSelectedRentalItem] =
    useState<RentalItem | null>(null);
  const [isRentalModalOpen, setIsRentalModalOpen] = useState(false);

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
    handleRentItem: originalHandleRentItem,
    refreshData,
    scrollToTop,
  } = useRentalPage();

  // Map rental item titles to RentalType enum
  const getRentalType = (title: string): RentalType => {
    const titleLower = title.toLowerCase();

    if (titleLower.includes('painting') || titleLower.includes('paint')) {
      return RentalType.PAINTING_MACHINE;
    } else if (titleLower.includes('sand') || titleLower.includes('blast')) {
      return RentalType.SAND_BLASTING_EQUIPMENT;
    } else if (titleLower.includes('scaffold')) {
      return RentalType.SCAFFOLDING;
    } else if (
      titleLower.includes('concrete') ||
      titleLower.includes('mixer')
    ) {
      return RentalType.CONCRETE_MIXER;
    } else if (titleLower.includes('power') || titleLower.includes('tool')) {
      return RentalType.POWER_TOOLS;
    } else {
      return RentalType.CUSTOM_EQUIPMENT;
    }
  };

  // New WhatsApp-enabled rent item handler
  const handleRentItem = (itemId: number) => {
    const item = displayedItems.find((item) => item.id === itemId);
    if (item) {
      setSelectedRentalItem(item);
      setIsRentalModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setIsRentalModalOpen(false);
    setSelectedRentalItem(null);
  };

  // Scroll to top when navigated from home page
  useEffect(() => {
    if (location.state?.scrollToTop) {
      scrollToTop();
    }
  }, [location.state, scrollToTop]);

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

      {/* Rental Request Modal */}
      {selectedRentalItem && (
        <RentalRequestModal
          isOpen={isRentalModalOpen}
          onClose={handleCloseModal}
          rentalType={getRentalType(selectedRentalItem.title)}
          itemName={selectedRentalItem.title}
          dailyRate={selectedRentalItem.pricePerDay}
        />
      )}
    </main>
  );
};
