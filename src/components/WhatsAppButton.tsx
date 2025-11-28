import React, { useState } from 'react';
import { useWhatsApp } from '@/hooks/useWhatsApp';
import { ServiceType } from '@/types/whatsappTypes';

interface WhatsAppButtonProps {
  /**
   * The text to display on the button
   */
  buttonText?: string;

  /**
   * The service type for the WhatsApp message
   */
  serviceType?: ServiceType | string;

  /**
   * Custom message to send (overrides service template)
   */
  customMessage?: string;

  /**
   * Button styling class
   */
  className?: string;

  /**
   * Include customer details form
   */
  showCustomerForm?: boolean;

  /**
   * Button size variant
   */
  size?: 'small' | 'medium' | 'large';

  /**
   * Button color variant
   */
  variant?: 'primary' | 'secondary' | 'success' | 'warning';

  /**
   * Icon to display in button
   */
  icon?: React.ReactNode;

  /**
   * Callback when message is sent successfully
   */
  onSuccess?: (requestId: string) => void;

  /**
   * Callback when there's an error
   */
  onError?: (error: string) => void;
}

/**
 * Reusable WhatsApp Button Component
 * Can be used anywhere in your application for sending WhatsApp messages
 */
export const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({
  buttonText = 'Contact via WhatsApp',
  serviceType = 'General Inquiry',
  customMessage,
  className = '',
  showCustomerForm = false,
  size = 'medium',
  variant = 'primary',
  icon,
  onSuccess,
  onError,
}) => {
  const { sendServiceRequest, isLoading, error } = useWhatsApp();
  const [showForm, setShowForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    email: '',
    message: customMessage || '',
  });

  // Size classes
  const sizeClasses = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-4 py-2 text-base',
    large: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-green-600 hover:bg-green-700 text-white',
    secondary: 'bg-gray-600 hover:bg-gray-700 text-white',
    success: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    warning: 'bg-orange-600 hover:bg-orange-700 text-white',
  };

  const handleQuickSend = async () => {
    try {
      const response = await sendServiceRequest(
        serviceType,
        customMessage
          ? {
            additionalMessage: customMessage,
          }
          : undefined,
      );

      if (response.success) {
        onSuccess?.(response.messageId || '');
        alert('WhatsApp message sent successfully!');
      } else {
        onError?.(response.error || 'Failed to send message');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      onError?.(errorMsg);
    }
  };

  const handleDetailedSend = async () => {
    if (!customerInfo.name.trim() || !customerInfo.phone.trim()) {
      alert('Please fill in your name and phone number');
      return;
    }

    try {
      const response = await sendServiceRequest(serviceType, {
        name: customerInfo.name.trim(),
        phone: customerInfo.phone.trim(),
        email: customerInfo.email.trim() || undefined,
        additionalMessage: customerInfo.message.trim() || customMessage,
      });

      if (response.success) {
        onSuccess?.(response.messageId || '');
        setShowForm(false);
        setCustomerInfo({
          name: '',
          phone: '',
          email: '',
          message: customMessage || '',
        });
        alert('WhatsApp message sent successfully!');
      } else {
        onError?.(response.error || 'Failed to send message');
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error';
      onError?.(errorMsg);
    }
  };

  const buttonClasses = `
        inline-flex items-center justify-center gap-2 
        ${sizeClasses[size]} 
        ${variantClasses[variant]}
        border border-transparent rounded-lg font-medium
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-200 hover:scale-105
        ${className}
    `.trim();

  if (showCustomerForm) {
    return (
      <>
        <button
          onClick={() => setShowForm(true)}
          disabled={isLoading}
          className={buttonClasses}
        >
          {icon}
          {isLoading ? 'Sending...' : buttonText}
        </button>

        {/* Customer Information Modal */}
        {showForm && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'>
            <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
              <div className='bg-green-600 text-white p-4 rounded-t-lg'>
                <h3 className='text-lg font-semibold'>Contact via WhatsApp</h3>
                <p className='text-green-100 text-sm'>
                  Provide your details for a personalized message
                </p>
              </div>

              <div className='p-6 space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Name *
                  </label>
                  <input
                    type='text'
                    value={customerInfo.name}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                    placeholder='Your full name'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Phone *
                  </label>
                  <input
                    type='tel'
                    value={customerInfo.phone}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                    placeholder='071 234 5678'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Email (Optional)
                  </label>
                  <input
                    type='email'
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                    placeholder='your.email@example.com'
                  />
                </div>

                <div>
                  <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Message (Optional)
                  </label>
                  <textarea
                    value={customerInfo.message}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        message: e.target.value,
                      }))
                    }
                    rows={3}
                    className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500'
                    placeholder='Any additional information...'
                  />
                </div>

                {error && (
                  <div className='text-red-600 text-sm bg-red-50 p-3 rounded-lg'>
                    {error}
                  </div>
                )}

                <div className='flex gap-3 pt-4'>
                  <button
                    onClick={() => setShowForm(false)}
                    className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50'
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDetailedSend}
                    disabled={isLoading}
                    className='flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50'
                  >
                    {isLoading ? 'Sending...' : 'Send WhatsApp'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <button
      onClick={handleQuickSend}
      disabled={isLoading}
      className={buttonClasses}
    >
      {icon}
      {isLoading ? 'Sending...' : buttonText}
    </button>
  );
};
