import heroCoverImg from '@/assets/img/heroSectionImg.jpg';
import { FaTools } from 'react-icons/fa';

import { BiSolidMessageDetail } from 'react-icons/bi';

export const HeroSection = () => {
  return (
    <section className='relative min-h-[80vh] sm:min-h-[90vh] md:min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden'>
      <div
        className='absolute inset-0 bg-cover bg-center bg-no-repeat z-0'
        style={{ backgroundImage: `url(${heroCoverImg})` }}
      >
        <div className='absolute inset-0 bg-black/75'></div>
      </div>

      <div className='relative z-10 w-full max-w-7xl px-4 sm:px-6 md:px-8 lg:px-12 py-12 sm:py-16 md:py-20'>
        <div className='max-w-4xl mx-auto text-center'>
          <h1 className='font-pj text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-4 sm:mb-6'>
            Building the Future,
            <span className='block mt-2'>One Project at a Time</span>
          </h1>

          <div className='relative inline-flex justify-center w-full mb-4 sm:mb-6'>
            <div className='h-1.5 w-20 sm:w-24 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full'></div>
          </div>

          <p className='max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-gray-200 font-inter mb-8 sm:mb-10 leading-relaxed'>
            Your trusted partner for robust construction, precise painting, and
            reliable equipment rentals.
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 mt-8 sm:mt-12'>
            <a
              href='/rentals'
              className='relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-blue-600 border border-transparent rounded-xl font-pj transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg hover:shadow-xl w-full sm:w-auto'
            >
              Rent Equipments
              <FaTools className='w-4 h-4 sm:w-5 sm:h-5 ml-2' />
            </a>

            <a
              href='/contactUs'
              className='relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white bg-transparent border-2 border-white rounded-xl font-pj transition-all duration-300 hover:bg-white hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white w-full sm:w-auto'
            >
              Contact Us Now
              <BiSolidMessageDetail className='w-4 h-4 sm:w-5 sm:h-5 ml-2' />
            </a>
          </div>

          <div className='mt-12 sm:mt-16 md:mt-20 animate-bounce'>
            <div className='flex justify-center'>
              <svg
                className='w-5 h-5 sm:w-6 sm:h-6 text-white'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M19 14l-7 7m0 0l-7-7m7 7V3'
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
