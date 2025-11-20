import { RentItemCard } from './components/RentItemCard';
import testImg from '@/assets/img/testCard.jpg';
import { useNavigate } from 'react-router-dom';

export const RentSection = () => {
  const navigate = useNavigate();

  const handleBrowseMoreClick = () => {
    navigate('/rentals', {
      state: { scrollToTop: true },
    });
  };

  const images = [testImg,testImg,testImg]

  return (
    <section id="rentSection" className='w-full px-4 sm:px-6 lg:px-8 py-10'>
      {/* Section Title */}
      <div className='text-center mb-10'>
        <h1 className='text-3xl sm:text-4xl font-bold text-mainTheme-color section-title'>
          Reliable Equipment for Rent
        </h1>
        <div className='mt-3 flex justify-center'>
          <div className='h-1.5 w-24 bg-gradient-to-r from-blue-400 via-purple-500 to-orange-400 rounded-full'></div>
        </div>
      </div>

      {/* Responsive Card Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        <div className='flex justify-center'>
          <RentItemCard
            imgUrl={images}
            cardTitle='Painting Machine'
            CardSubTitle='High-efficiency painting machines for rent, perfect for large-scale projects and achieving a smooth, even finish.'
            rentPerDay={2500}
            buttonLabel='Rent Item'
          />
        </div>
        <div className='flex justify-center'>
          <RentItemCard
            imgUrl={images}
            cardTitle='Sand Blasting Equipment'
            CardSubTitle='Professional sand blasting equipment for surface preparation and cleaning. Complete with safety gear and operation instructions.'
            rentPerDay={3500}
            buttonLabel='Rent Item'
          />
        </div>
        <div className='flex justify-center'>
          <RentItemCard
            imgUrl={images}
            cardTitle='Scaffolding'
            CardSubTitle='Sturdy scaffolding systems for construction and maintenance work. Various heights available with safety accessories.'
            rentPerDay={1800}
            buttonLabel='Rent Item'
          />
        </div>
      </div>

      {/* Browse More Button */}
      <div className='flex justify-center md:justify-end mt-10'>
        <button
          type='button'
          onClick={handleBrowseMoreClick}
          className='text-rentBtn-color hover:text-white border border-rentBtn-hover-color hover:bg-rentBtn-hover-color focus:ring-4 focus:outline-none focus:ring-focus-ring font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300'
          aria-label='Browse all rental equipment'
        >
          Browse More...
        </button>
      </div>
    </section>
  );
};
