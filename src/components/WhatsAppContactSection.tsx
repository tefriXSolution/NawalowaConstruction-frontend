import React from 'react';
import { WhatsAppButton } from '@/components/WhatsAppButton';
import { ServiceType } from '@/types/whatsappTypes';

interface WhatsAppContactSectionProps {
  /**
   * Section title
   */
  title?: string;

  /**
   * Section description
   */
  description?: string;

  /**
   * Show multiple contact options
   */
  showMultipleOptions?: boolean;

  /**
   * Custom background color
   */
  backgroundColor?: string;

  /**
   * Custom styling
   */
  className?: string;
}

/**
 * WhatsApp Contact Section Component
 * Can be used in any page for customer contact
 */
export const WhatsAppContactSection: React.FC<WhatsAppContactSectionProps> = ({
  title = 'Get in Touch',
  description = 'Ready to start your construction project? Contact us via WhatsApp for immediate assistance.',
  showMultipleOptions = true,
  backgroundColor = 'bg-gray-50',
  className = '',
}) => {
  return (
    <section className={`py-16 ${backgroundColor} ${className}`}>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-12'>
          <h2 className='text-3xl sm:text-4xl font-bold text-gray-900 mb-4'>
            {title}
          </h2>
          <p className='text-lg text-gray-600 max-w-3xl mx-auto'>
            {description}
          </p>
        </div>

        {showMultipleOptions ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {/* General Inquiry */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-green-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                General Inquiry
              </h3>
              <p className='text-gray-600 text-sm mb-4'>
                Have questions about our services? Get in touch for general
                information.
              </p>
              <WhatsAppButton
                buttonText='Chat Now'
                serviceType='General Inquiry'
                size='small'
                variant='primary'
                className='w-full'
                customMessage='Hi! I have some questions about your construction services.'
              />
            </div>

            {/* Service Quote */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-blue-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Request Quote
              </h3>
              <p className='text-gray-600 text-sm mb-4'>
                Get a detailed quote for your construction project requirements.
              </p>
              <WhatsAppButton
                buttonText='Get Quote'
                serviceType='Quote Request'
                size='small'
                variant='primary'
                className='w-full'
                showCustomerForm={true}
                customMessage='I would like to request a quote for my construction project.'
              />
            </div>

            {/* Emergency Service */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-red-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L4.35 16.5c-.77.833.192 2.5 1.732 2.5z'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Emergency Service
              </h3>
              <p className='text-gray-600 text-sm mb-4'>
                Need urgent construction assistance? Contact us for emergency
                services.
              </p>
              <WhatsAppButton
                buttonText='Emergency'
                serviceType='Emergency Service'
                size='small'
                variant='warning'
                className='w-full'
                customMessage='🚨 I need emergency construction assistance. Please contact me urgently.'
              />
            </div>

            {/* Project Consultation */}
            <div className='bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow'>
              <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                <svg
                  className='w-8 h-8 text-purple-600'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4'
                  />
                </svg>
              </div>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                Consultation
              </h3>
              <p className='text-gray-600 text-sm mb-4'>
                Schedule a consultation to discuss your construction project in
                detail.
              </p>
              <WhatsAppButton
                buttonText='Book Consultation'
                serviceType='Project Consultation'
                size='small'
                variant='secondary'
                className='w-full'
                showCustomerForm={true}
                customMessage='I would like to schedule a consultation for my construction project.'
              />
            </div>
          </div>
        ) : (
          <div className='flex justify-center'>
            <WhatsAppButton
              buttonText='Contact Us on WhatsApp'
              serviceType='General Inquiry'
              size='large'
              variant='success'
              showCustomerForm={true}
              icon={
                <svg
                  className='w-6 h-6'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787' />
                </svg>
              }
            />
          </div>
        )}

        {/* Additional Info */}
        <div className='mt-12 text-center'>
          <div className='bg-white rounded-lg shadow-sm p-6 max-w-2xl mx-auto'>
            <h4 className='text-lg font-semibold text-gray-900 mb-3'>
              Why Choose WhatsApp?
            </h4>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600'>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Instant Response</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>Professional Service</span>
              </div>
              <div className='flex items-center gap-2'>
                <svg
                  className='w-5 h-5 text-green-500'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                >
                  <path
                    fillRule='evenodd'
                    d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z'
                    clipRule='evenodd'
                  />
                </svg>
                <span>24/7 Available</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
