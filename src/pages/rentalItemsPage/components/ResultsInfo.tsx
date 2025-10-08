import { ResultsInfoProps } from '@/pages/rentalItemsPage/types';

export const ResultsInfo = ({
  displayedCount,
  totalCount,
  selectedCategory,
}: ResultsInfoProps) => {
  return (
    <div className='text-center mb-6'>
      <p className='text-secondary-text'>
        Showing {displayedCount} of {totalCount} items
        {selectedCategory !== 'all' && ` in ${selectedCategory}`}
      </p>
    </div>
  );
};
