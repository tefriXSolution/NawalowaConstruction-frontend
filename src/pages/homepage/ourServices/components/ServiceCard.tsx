import React, { useState } from 'react';
import { ServiceRequestModal } from '@/components/ServiceRequestModal';
import { ServiceType } from '@/types/whatsappTypes';

interface Props {
  cardTitle: string;
  CardSubTitle: string;
  buttonLabel: string;
  imgUrl: string;
  onClickBtn?: () => void;
}

export const ServiceCard = ({
  cardTitle,
  CardSubTitle,
  buttonLabel,
  imgUrl,
  onClickBtn,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Map card titles to ServiceType enum
  const getServiceType = (title: string): ServiceType => {
    switch (title.toLowerCase()) {
      case 'sand blasting':
        return ServiceType.SAND_BLASTING;
      case 'steel painting':
        return ServiceType.STEEL_PAINTING;
      case 'house painting':
        return ServiceType.HOUSE_PAINTING;
      default:
        return ServiceType.CUSTOM_SERVICE;
    }
  };

  const handleButtonClick = () => {
    if (onClickBtn) {
      onClickBtn();
    } else {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <div className='flex md:flex-col sm:flex-row md:max-w-sm max-w-full bg-serviceCardTheme-color border border-gray-200 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300'>
        <div className='w-full hidden md:block'>
          <img
            className='rounded-t-lg w-full h-fit object-cover'
            src={imgUrl}
            alt={cardTitle}
          />
        </div>

        <div className='relative w-full md:relative'>
          <div className='md:hidden absolute inset-0 z-0'>
            <img
              className='w-full h-full object-cover rounded-lg'
              src={imgUrl}
              alt={cardTitle}
            />
            <div className='absolute inset-0 bg-black opacity-40 rounded-lg'></div>
          </div>

          <div className='relative z-10 p-5'>
            <h5 className='mb-2 text-2xl font-bold tracking-tight flex justify-center text-white md:text-mainTheme-color'>
              {cardTitle}
            </h5>
            <p className='mb-3 font-normal text-white md:text-serviceCardSubText-color'>
              {CardSubTitle}
            </p>
            <button
              onClick={handleButtonClick}
              className='inline-flex w-full items-center justify-center px-3 py-2 text-sm font-medium text-center text-white bg-mainTheme-color rounded-lg hover:bg-mainTheme-hover-color focus:ring-4 focus:outline-none focus:ring-blue-300 border-2 border-white md:border-transparent transition-all duration-200 hover:scale-105'
              aria-label={`Request ${cardTitle} service via WhatsApp`}
            >
              {buttonLabel}
              <svg
                className='rtl:rotate-180 w-3.5 h-3.5 ms-2'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 14 10'
              >
                <path
                  stroke='currentColor'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M1 5h12m0 0L9 1m4 4L9 9'
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        serviceType={getServiceType(cardTitle)}
        serviceName={cardTitle}
      />
    </>
  );
};
