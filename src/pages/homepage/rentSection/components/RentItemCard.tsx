interface Props {
  cardTitle: string;
  CardSubTitle: string;
  buttonLabel: string;
  imgUrl: string;
  rentPerDay: number;
  onClickBtn?: () => void;
}

export const RentItemCard = ({
  cardTitle,
  CardSubTitle,
  buttonLabel,
  imgUrl,
  rentPerDay,
  onClickBtn = () => {
    console.log('Press Card Button');
  },
}: Props) => {
  return (
    <article
      className='flex flex-col w-full max-w-sm mx-auto bg-rentCardTheme-color border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 focus-within:ring-2 focus-within:ring-mainTheme-color relative md:bg-transparent'
      itemScope
      itemType='https://schema.org/Product'
    >
      <div className='w-full h-48 sm:h-56 lg:h-60 overflow-hidden rounded-t-lg hidden md:block'>
        <img
          className='w-full h-full object-cover transition-transform duration-300 hover:scale-105'
          src={imgUrl}
          alt={`${cardTitle} - Professional equipment rental`}
          itemProp='image'
          loading='lazy'
          width='300'
          height='200'
        />
      </div>
      
      <div className='md:hidden absolute inset-0 z-0 rounded-lg overflow-hidden'>
        <img
          className='w-full h-full object-cover'
          src={imgUrl}
          alt={`${cardTitle} - Professional equipment rental`}
          loading='lazy'
        />
        <div className='absolute inset-0 bg-black opacity-60'></div>
      </div>

      <div className='relative z-10 p-4 sm:p-5 lg:p-6 flex flex-col flex-grow'>
        <h3
          className='mb-2 text-lg sm:text-xl lg:text-2xl font-bold tracking-tight text-center text-white md:text-mainTheme-color line-clamp-2 hover:text-opacity-80 transition-colors'
          itemProp='name'
        >
          {cardTitle}
        </h3>
        
        <p
          className='mb-3 text-sm sm:text-base font-normal text-white md:text-serviceCardSubText-color flex-grow line-clamp-3 leading-relaxed'
          itemProp='description'
        >
          {CardSubTitle}
        </p>
        
        <div className='mt-auto'>
          <div
            className='mb-3 font-bold text-lg sm:text-xl text-white md:text-mainTheme-color'
            itemProp='offers'
            itemScope
            itemType='https://schema.org/Offer'
          >
            <span itemProp='price'>Rs.{rentPerDay}</span>
            <span itemProp='priceCurrency' content='LKR'>
              /day
            </span>
            <meta
              itemProp='availability'
              content='https://schema.org/InStock'
            />
          </div>
          
          <button
            onClick={onClickBtn}
            className='inline-flex w-full items-center justify-center px-3 py-2.5 sm:py-3 text-sm sm:text-base font-medium text-center text-white bg-mainTheme-color rounded-lg hover:bg-mainTheme-hover-color focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all transform hover:scale-105 active:scale-95 border-2 border-white md:border-transparent'
            aria-label={`Rent ${cardTitle} for Rs.${rentPerDay} per day`}
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </article>
  );
};