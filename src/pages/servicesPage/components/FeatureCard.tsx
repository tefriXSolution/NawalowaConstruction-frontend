import { FeatureCardProps } from '../types';

export const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className='text-center'>
      <div className='bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4'>
        {icon}
      </div>
      <h3 className='text-xl font-semibold text-mainTheme-color mb-2'>
        {title}
      </h3>
      <p className='text-gray-600'>{description}</p>
    </div>
  );
};
