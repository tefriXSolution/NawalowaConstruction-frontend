import React from 'react';
import { IconType } from 'react-icons';
import { WavyBackground } from './sections/wavy-background';

type CoreValueCardProps = {
  title: string;
  description: string;
  Icon: IconType;
};



export const CoreValueCard: React.FC<CoreValueCardProps> = ({
  title,
  description,
  Icon,
}) => {
  return (
    <div className='group bg-white shadow-lg rounded-xl h-full p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 relative overflow-hidden'>
      {/* Background gradient overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-mainTheme-color/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>

      {/* Icon container */}
      <div className='relative z-10 w-16 h-16 bg-gradient-to-br from-mainTheme-color to-mainTheme-hover-color rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg'>
        <Icon className='text-2xl text-white' />
      </div>

      {/* Content */}
      <div className='relative z-10 space-y-4'>
        <h3 className='text-xl font-bold text-gray-900 group-hover:text-mainTheme-color transition-colors duration-300'>
          {title}
        </h3>
        <p className='text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300'>
          {description}
        </p>
      </div>

      {/* Bottom accent line */}
      <div className='absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-mainTheme-color to-mainTheme-hover-color transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left'></div>
    </div>
  );
};
