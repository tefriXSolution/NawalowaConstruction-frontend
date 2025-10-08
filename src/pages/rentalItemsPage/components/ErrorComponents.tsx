interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className='text-center py-12'>
      <div className='bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto'>
        <div className='flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full'>
          <svg
            className='w-6 h-6 text-red-600'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </div>
        <h3 className='text-lg font-medium text-red-800 mb-2'>
          Something went wrong
        </h3>
        <p className='text-red-600 mb-4'>{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200'
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export const NoDataMessage = () => {
  return (
    <div className='text-center py-12'>
      <div className='flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-light-gray rounded-full'>
        <svg
          className='w-8 h-8 text-muted-text'
          fill='none'
          stroke='currentColor'
          viewBox='0 0 24 24'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth={2}
            d='M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
          />
        </svg>
      </div>
      <h3 className='text-lg font-medium text-secondary-text mb-2'>
        No rental items found
      </h3>
      <p className='text-muted-text'>
        Try adjusting your filters or check back later for new items.
      </p>
    </div>
  );
};
