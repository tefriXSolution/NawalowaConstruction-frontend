import React, { useState } from 'react';
import { ServiceType } from '@/types/whatsappTypes';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface ServiceRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceType: ServiceType | string;
  serviceName: string;
}

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  message: string;
}

export const ServiceRequestModal: React.FC<ServiceRequestModalProps> = ({
  isOpen,
  onClose,
  serviceType,
  serviceName,
}) => {
  const [formData, setFormData] = useState<CustomerForm>({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CustomerForm>>({});
  const { sendServiceRequest, isLoading, error, clearError } = useWhatsApp();

  const validateForm = (): boolean => {
    const errors: Partial<CustomerForm> = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      errors.phone = 'Please enter a valid phone number';
    }

    if (
      formData.email.trim() &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())
    ) {
      errors.email = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (formErrors[name as keyof CustomerForm]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      const response = await sendServiceRequest(serviceType, {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim() || undefined,
        additionalMessage: formData.message.trim() || undefined,
      });

      if (response.success) {
        // Reset form and close modal on success
        setFormData({ name: '', phone: '', email: '', message: '' });
        setFormErrors({});
        onClose();

        // Show success message
        alert(
          'Service request sent successfully! We will contact you shortly.',
        );
      }
    } catch (err) {
      console.error('Error submitting service request:', err);
    }
  };

  const handleQuickRequest = async () => {
    clearError();
    try {
      const response = await sendServiceRequest(serviceType);
      if (response.success) {
        onClose();
        alert('Quick service request sent! We will contact you shortly.');
      }
    } catch (err) {
      console.error('Error sending quick request:', err);
    }
  };

  const handleClose = () => {
    setFormData({ name: '', phone: '', email: '', message: '' });
    setFormErrors({});
    clearError();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-50 overflow-y-auto bg-gray-200 bg-opacity-50'>
      <div className='flex min-h-full items-center justify-center p-4'>
        <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-xl font-bold'>
                  Request {serviceName} Service
                </h2>
              </div>
              <button
                onClick={handleClose}
                className='text-white hover:text-gray-200 text-2xl leading-none'
                aria-label='Close modal'
              >
                ×
              </button>
            </div>
          </div>

          {/* Content */}
          <div className='p-6'>
            {/* Error Message */}
            {error && (
              <div className='mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded'>
                <p className='text-sm'>{error}</p>
              </div>
            )}

            {/* Quick Request Option */}
            <div className='mb-6 p-4 bg-gray-50 rounded-lg border'>
              <h3 className='font-semibold text-gray-800 mb-2'>Quick Request</h3>
              <p className='text-sm text-gray-600 mb-3'>
                Send a quick request and we'll contact you using our business
                information.
              </p>
              <button
                onClick={handleQuickRequest}
                disabled={isLoading}
                className='w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              >
                {isLoading ? 'Sending...' : 'Send Quick Request'}
              </button>
            </div>

            {/* Divider */}
            <div className='flex items-center my-6'>
              <div className='flex-1 border-t border-gray-300'></div>
              <span className='px-4 text-sm text-gray-500'>
                or provide your details
              </span>
              <div className='flex-1 border-t border-gray-300'></div>
            </div>

            {/* Detailed Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              {/* Name Field */}
              <div>
                <label
                  htmlFor='name'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Full Name *
                </label>
                <input
                  type='text'
                  id='name'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder='Enter your full name'
                />
                {formErrors.name && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label
                  htmlFor='phone'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Phone Number *
                </label>
                <input
                  type='tel'
                  id='phone'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder='071 234 5678'
                />
                {formErrors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor='email'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Email Address (Optional)
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  placeholder='your.email@example.com'
                />
                {formErrors.email && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.email}</p>
                )}
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-medium text-gray-700 mb-1'
                >
                  Additional Message (Optional)
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Any specific requirements or additional information...'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className='w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium'
              >
                {isLoading ? 'Sending Request...' : 'Send Detailed Request'}
              </button>
            </form>

            {/* Info Text */}
            <div className='mt-4 p-3 bg-blue-50 rounded-lg'>
              <p className='text-xs text-blue-700 text-center'>
                Your request will be sent via WhatsApp to our business team. We
                typically respond within 2-4 business hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
