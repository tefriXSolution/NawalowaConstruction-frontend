import { PageHeaderProps } from '@/pages/rentalItemsPage/types';

export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <header className='text-center mb-8 sm:mb-12'>
      <div className='max-w-4xl mx-auto px-4'>
        <h2 className='section-title text-mainTheme-color mb-4 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight whitespace-nowrap'>
          {title}
        </h2>
        <p className='text-base sm:text-lg md:text-xl text-secondary-text max-w-3xl mx-auto leading-relaxed'>
          {description}
        </p>

        {/* Breadcrumb for SEO */}
        <nav aria-label='Breadcrumb' className='mt-6'>
          <ol className='flex justify-center items-center space-x-2 text-sm text-secondary-text'>
            <li>
              <a
                href='/'
                className='hover:text-mainTheme-color transition-colors'
              >
                Home
              </a>
            </li>
            <li>
              <span className='mx-2'>/</span>
            </li>
            <li>
              <span
                className='text-mainTheme-color font-medium'
                aria-current='page'
              >
                Equipment Rental
              </span>
            </li>
          </ol>
        </nav>
      </div>
    </header>
  );
};
