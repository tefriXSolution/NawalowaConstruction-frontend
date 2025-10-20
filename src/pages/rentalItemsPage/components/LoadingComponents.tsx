export const LoadingSpinner = () => {
  return (
    <div className='flex justify-center items-center py-12'>
      <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-rentBtn-color'></div>
    </div>
  );
};

export const LoadingGrid = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className='animate-pulse'>
          <div className='bg-disabled-bg rounded-lg p-6'>
            <div className='bg-border-gray h-48 rounded mb-4'></div>
            <div className='bg-border-gray h-6 rounded mb-2'></div>
            <div className='bg-border-gray h-4 rounded mb-4'></div>
            <div className='bg-border-gray h-10 rounded'></div>
          </div>
        </div>
      ))}
    </div>
  );
};
