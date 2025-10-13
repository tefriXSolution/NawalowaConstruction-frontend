import React, { useState } from 'react';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface WhatsAppWidgetProps {
  /**
   * Position of the widget on screen
   */
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';

  /**
   * Custom message for quick contact
   */
  quickMessage?: string;

  /**
   * Show/hide the widget
   */
  isVisible?: boolean;

  /**
   * Custom styling
   */
  className?: string;
}

/**
 * Floating WhatsApp Widget
 * Can be placed anywhere on your website for instant customer contact
 */
export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  position = 'bottom-right',
  quickMessage = "Hi! I'm interested in your construction services. Can you help me?",
  isVisible = true,
  className = '',
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sendServiceRequest, isLoading } = useWhatsApp();

  const positionClasses = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  };

  const handleQuickContact = async () => {
    try {
      await sendServiceRequest('General Inquiry', {
        additionalMessage: quickMessage,
      });
      setIsExpanded(false);
    } catch (error) {
      console.error('WhatsApp contact error:', error);
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed ${positionClasses[position]} z-50 ${className}`}>
      {/* Expanded Widget */}
      {isExpanded && (
        <div className='mb-4 bg-white rounded-lg shadow-lg border border-gray-200 w-80 overflow-hidden animate-in slide-in-from-bottom-2'>
          <div className='bg-green-600 text-white p-4'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                  <svg
                    className='w-6 h-6 text-green-600'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787' />
                  </svg>
                </div>
                <div>
                  <h4 className='font-semibold'>Chat with us</h4>
                  <p className='text-xs text-green-100'>We're online now</p>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className='text-white hover:text-green-200'
              >
                <svg
                  className='w-5 h-5'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className='p-4'>
            <div className='bg-gray-100 rounded-lg p-3 mb-4'>
              <p className='text-sm text-gray-700'>
                👋 Hi there! How can we help you with your construction needs
                today?
              </p>
            </div>

            <div className='space-y-2'>
              <button
                onClick={handleQuickContact}
                disabled={isLoading}
                className='w-full text-left p-3 rounded-lg bg-green-50 hover:bg-green-100 text-green-800 text-sm transition-colors'
              >
                💬 Start a conversation
              </button>

              <button
                onClick={() => sendServiceRequest('Service Quote Request')}
                disabled={isLoading}
                className='w-full text-left p-3 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm transition-colors'
              >
                📋 Request a quote
              </button>

              <button
                onClick={() => sendServiceRequest('Emergency Service')}
                disabled={isLoading}
                className='w-full text-left p-3 rounded-lg bg-orange-50 hover:bg-orange-100 text-orange-800 text-sm transition-colors'
              >
                🚨 Emergency service
              </button>
            </div>

            <div className='mt-4 text-xs text-gray-500 text-center'>
              Powered by WhatsApp Business
            </div>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`
                    w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full 
                    flex items-center justify-center shadow-lg hover:shadow-xl 
                    transition-all duration-300 hover:scale-110
                    ${isExpanded ? 'rotate-45' : 'animate-bounce'}
                `}
        aria-label='Open WhatsApp chat'
      >
        {isExpanded ? (
          <svg
            className='w-6 h-6'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        ) : (
          <svg className='w-7 h-7' fill='currentColor' viewBox='0 0 24 24'>
            <path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.570-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.787' />
          </svg>
        )}
      </button>

      {/* Online indicator */}
      {!isExpanded && (
        <div className='absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse'></div>
      )}
    </div>
  );
};
