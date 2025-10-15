import { ServicesPageHeaderProps } from '../types';

export const ServicesPageHeader = ({
  title,
  description,
}: ServicesPageHeaderProps) => {
  return (
    <div className=' bg-gray-50 text-blue py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-4'>{title}</h1>
        <p className='text-xl text-gray-700 max-w-3xl mx-auto'>{description}</p>
      </div>
    </div>
  );
};
