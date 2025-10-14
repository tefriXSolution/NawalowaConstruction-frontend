import { SectionHeaderProps } from '../types';

export const SectionHeader = ({
  title,
  showDivider = true,
  className = '',
}: SectionHeaderProps) => {
  return (
    <div className={`text-center mb-12 ${className}`}>
      <h2 className='text-3xl font-bold text-mainTheme-color mb-4'>{title}</h2>
      {showDivider && (
        <div className='h-1.5 w-24 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full mx-auto'></div>
      )}
    </div>
  );
};
