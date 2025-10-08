import { PaginationProps } from '@/pages/rentalItemsPage/types';

export const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className='flex justify-center items-center space-x-2 mb-8'>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 rounded-lg ${
          currentPage === 1
            ? 'bg-disabled-bg text-disabled-text cursor-not-allowed'
            : 'bg-white text-secondary-text border border-border-gray hover:bg-rentBtn-color hover:text-white'
        } transition-all duration-300`}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            currentPage === page
              ? 'bg-rentBtn-hover-color text-mainTheme-color'
              : 'bg-white text-secondary-text border border-border-gray hover:bg-rentBtn-color hover:text-white'
          } transition-all duration-300`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-disabled-bg text-disabled-text cursor-not-allowed'
            : 'bg-white text-secondary-text border border-border-gray hover:bg-rentBtn-color hover:text-white'
        } transition-all duration-300`}
      >
        Next
      </button>
    </div>
  );
};
