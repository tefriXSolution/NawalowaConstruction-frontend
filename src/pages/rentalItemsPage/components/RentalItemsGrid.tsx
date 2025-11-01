import { RentItemCard } from '@/pages/homepage/rentSection/components/RentItemCard';
import { RentalItemsGridProps } from '@/pages/rentalItemsPage/types';

export const RentalItemsGrid = ({
  items,
  onRentItem,
}: RentalItemsGridProps) => {
  if (items.length === 0) {
    return (
      <div className='text-center py-12'>
        <p className='text-muted-text text-lg'>
          No items found in this category.
        </p>
      </div>
    );
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
      {items.map((item) => (
        <div key={item.id} className='flex h-full'>
          <div className='w-full transform hover:scale-105 transition-transform duration-300'>
            <RentItemCard
              imgUrl={item.image}
              cardTitle={item.title}
              CardSubTitle={item.description}
              rentPerDay={item.pricePerDay}
              buttonLabel='Rent Item'
              onClickBtn={() => onRentItem(item.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
