import { ServicesPageHeaderProps } from '../types';

export const ServicesPageHeader = ({
  title,
  description,
}: ServicesPageHeaderProps) => {
  return (
    <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16'>
      <div className='container mx-auto px-4 sm:px-6 lg:px-8 text-center'>
        <h1 className='text-4xl sm:text-5xl font-bold mb-4'>{title}</h1>
        <p className='text-xl text-blue-100 max-w-3xl mx-auto'>{description}</p>
      </div>
    </div>
  );
};
