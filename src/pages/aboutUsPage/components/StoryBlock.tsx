interface Props {
  title: string;
  description: string;
}

export const StoryBlock = ({ title, description }: Props) => {
  return (
    <div className='group bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100'>
      <div className='flex items-start space-x-4'>
        <div className='flex-shrink-0 w-3 h-3 bg-mainTheme-color rounded-full mt-3 group-hover:scale-125 transition-transform duration-300'></div>
        <div className='flex-1 space-y-4'>
          <h2 className='text-2xl lg:text-3xl font-bold text-mainTheme-color group-hover:text-mainTheme-hover-color transition-colors duration-300'>
            {title}
          </h2>
          <p className='text-gray-600 leading-relaxed text-lg'>{description}</p>
        </div>
      </div>
    </div>
  );
};
