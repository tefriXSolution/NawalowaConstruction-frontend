import { CategoryFilterProps } from '@/pages/rentalItemsPage/types';

export const CategoryFilter = ({
  categories,
  selectedCategory,
  onCategoryChange,
}: CategoryFilterProps) => {
  return (
    <section className='mb-8 px-4' aria-label='Equipment categories'>
      <h2 className='sr-only'>Filter by Equipment Category</h2>
      <div className='flex flex-wrap justify-center gap-2 sm:gap-3 max-w-4xl mx-auto'>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm lg:text-base font-medium transition-all duration-300 min-w-0 whitespace-nowrap ${
              selectedCategory === category
                ? 'bg-rentBtn-hover-color text-white shadow-lg transform scale-105'
                : 'bg-white text-secondary-text border border-border-gray hover:bg-rentBtn-color hover:text-white hover:scale-105 active:scale-95'
            }`}
            aria-pressed={selectedCategory === category}
            aria-label={`Filter by ${category} equipment`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
};
