import { useEffect, useState } from 'react';
import { RentItemCard } from './components/RentItemCard';
import { useNavigate } from 'react-router-dom';
import { rentalApiService } from '@/pages/rentalItemsPage/services/rentalApiService';
import { RentalItem } from '@/pages/rentalItemsPage/types';

export const RentSection = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState<RentalItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await rentalApiService.getRentalItems(1, 3);
        if (response.success) {
          setItems(response.data);
        }
      } catch (error) {
        console.error('Failed to fetch rental items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const handleBrowseMoreClick = () => {
    navigate('/rentals', {
      state: { scrollToTop: true },
    });
  };

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
        {loading ? (
          // Loading Skeletons
          Array(3).fill(0).map((_, index) => (
            <div key={index} className='flex justify-center w-full'>
              <div className="w-full max-w-sm h-96 bg-gray-200 animate-pulse rounded-lg"></div>
            </div>
          ))
        ) : items.length > 0 ? (
          items.map((item) => (
            <div key={item.id} className='flex justify-center'>
              <RentItemCard
                imgUrl={item.image}
                cardTitle={item.title}
                CardSubTitle={item.description}
                rentPerDay={item.pricePerDay}
                buttonLabel='Rent Item'
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No rental items available at the moment.
          </div>
        )}
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
