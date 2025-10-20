interface BackToTopButtonProps {
  onClick: () => void;
}

export const BackToTopButton = ({ onClick }: BackToTopButtonProps) => {
  return (
    <div className='flex justify-center'>
      <button
        onClick={onClick}
        className='text-rentBtn-color hover:text-white border border-rentBtn-hover-color hover:bg-rentBtn-hover-color focus:ring-4 focus:outline-none focus:ring-focus-ring font-medium rounded-lg text-sm px-8 py-3 text-center transition-all duration-300 shadow-lg'
      >
        Back to Top
      </button>
    </div>
  );
};
