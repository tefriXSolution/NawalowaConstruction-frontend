import React, { useState } from 'react';
import { RentalType } from '@/types/whatsappTypes';
import { useWhatsApp } from '@/hooks/useWhatsApp';

interface RentalRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  rentalType: RentalType | string;
  itemName: string;
  dailyRate: number;
}

interface CustomerForm {
  name: string;
  phone: string;
  email: string;
  rentalDuration: string;
  message: string;
}

export const RentalRequestModal: React.FC<RentalRequestModalProps> = ({
  isOpen,
  onClose,
  rentalType,
  itemName,
  dailyRate,
}) => {
  const [formData, setFormData] = useState<CustomerForm>({
    name: '',
    phone: '',
    email: '',
    rentalDuration: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<Partial<CustomerForm>>({});
  const { sendRentalRequest, isLoading, error, clearError } = useWhatsApp();

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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
      const response = await sendRentalRequest(
        rentalType,
        itemName,
        dailyRate,
        {
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim() || undefined,
          rentalDuration: formData.rentalDuration.trim() || undefined,
          additionalMessage: formData.message.trim() || undefined,
        },
      );

      if (response.success) {
        // Reset form and close modal on success
        setFormData({
          name: '',
          phone: '',
          email: '',
          rentalDuration: '',
          message: '',
        });
        setFormErrors({});
        onClose();

        // Show success message
        alert(
          'Equipment rental request sent successfully! We will contact you shortly.',
        );
      }
    } catch (err) {
      console.error('Error submitting rental request:', err);
    }
  };

  const handleQuickRequest = async () => {
    clearError();
    try {
      const response = await sendRentalRequest(rentalType, itemName, dailyRate);
      if (response.success) {
        onClose();
        alert('Quick rental request sent! We will contact you shortly.');
      }
    } catch (err) {
      console.error('Error sending quick rental request:', err);
    }
  };

  const handleClose = () => {
    setFormData({
      name: '',
      phone: '',
      email: '',
      rentalDuration: '',
      message: '',
    });
    setFormErrors({});
    clearError();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 z-[9999] overflow-y-auto bg-black/50 backdrop-blur-sm'>
      <div className='flex min-h-full items-center justify-center p-4'>
        <div className='bg-white rounded-lg shadow-xl max-w-md w-full'>
          {/* Header */}
          <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg'>
            <div className='flex justify-between items-center'>
              <div>
                <h2 className='text-xl font-bold'>Rent {itemName}</h2>
                <p className='text-blue-100 text-sm mt-1'>Rs.{dailyRate}/day</p>
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

          {/* Body */}
          <div className='p-6'>
            {/* Quick Request Option */}
            <div className='mb-6'>
              <button
                onClick={handleQuickRequest}
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
              >
                {isLoading ? 'Sending...' : 'Quick Rental Request'}
              </button>
              <p className='text-gray-600 text-sm mt-2 text-center'>
                Send a quick rental inquiry via WhatsApp
              </p>
            </div>

            <div className='relative flex items-center my-6'>
              <div className='flex-grow border-t border-gray-300'></div>
              <span className='flex-shrink mx-4 text-gray-500 text-sm'>OR</span>
              <div className='flex-grow border-t border-gray-300'></div>
            </div>

            {/* Detailed Form */}
            <form onSubmit={handleSubmit} className='space-y-4'>
              <h3 className='font-semibold text-gray-800 mb-4'>
                Provide Details for Better Service
              </h3>

              {/* Error Message */}
              {error && (
                <div className='bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm'>
                  {error}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name *
                </label>
                <input
                  type='text'
                  name='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.name ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder='Your full name'
                />
                {formErrors.name && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.name}</p>
                )}
              </div>

              {/* Phone Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone Number *
                </label>
                <input
                  type='tel'
                  name='phone'
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.phone ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder='071 234 5678'
                />
                {formErrors.phone && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.phone}</p>
                )}
              </div>

              {/* Email Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email Address (Optional)
                </label>
                <input
                  type='email'
                  name='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${formErrors.email ? 'border-red-300' : 'border-gray-300'
                    }`}
                  placeholder='your.email@example.com'
                />
                {formErrors.email && (
                  <p className='text-red-500 text-xs mt-1'>{formErrors.email}</p>
                )}
              </div>

              {/* Rental Duration Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Estimated Rental Duration (Optional)
                </label>
                <select
                  name='rentalDuration'
                  value={formData.rentalDuration}
                  onChange={handleInputChange}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                >
                  <option value=''>Select duration...</option>
                  <option value='1 day'>1 day</option>
                  <option value='2-3 days'>2-3 days</option>
                  <option value='1 week'>1 week</option>
                  <option value='2 weeks'>2 weeks</option>
                  <option value='1 month'>1 month</option>
                  <option value='More than 1 month'>More than 1 month</option>
                  <option value='Project-based'>Project-based</option>
                </select>
              </div>

              {/* Message Field */}
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Additional Message (Optional)
                </label>
                <textarea
                  name='message'
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={3}
                  className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Tell us about your project or any specific requirements...'
                />
              </div>

              {/* Submit Button */}
              <button
                type='submit'
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${isLoading
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                  }`}
              >
                {isLoading ? 'Sending Request...' : 'Send Detailed Request'}
              </button>
            </form>
          </div>

          {/* Footer */}
          <div className='bg-gray-50 px-6 py-4 rounded-b-lg'>
            <p className='text-xs text-gray-600 text-center'>
              By submitting this request, you agree to be contacted via WhatsApp
              regarding this rental inquiry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
