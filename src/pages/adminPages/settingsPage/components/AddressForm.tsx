import React from 'react';
import { Controller } from 'react-hook-form';
import { Label, TextInput, Textarea } from 'flowbite-react';
import { FormComponentProps } from '@/pages/adminPages/settingsPage/types';

export const AddressForm: React.FC<FormComponentProps> = ({
  control,
  errors,
}) => {
  const inputTheme = {
    field: {
      input: {
        base: '!bg-white border !border-gray-300 !text-gray-800',
      },
    },
  };

  return (
    <>
      <h3 className='text-lg font-semibold mb-4 text-gray-800 pt-2 border-t border-gray-300'>
        Location Information
      </h3>
      <div className='grid grid-cols-1 gap-y-3'>
        {/* Address */}
        <div className='md:col-span-2'>
          <Label
            htmlFor='address'
            className='mb-1.5 !text-gray-700 font-medium'
          >
            Address
          </Label>
          <Controller
            name='address'
            control={control}
            render={({ field }) => (
              <>
                <Textarea
                  id='address'
                  {...field}
                  rows={3}
                  className='rounded-md !bg-white border !border-gray-300 !text-gray-800'
                  placeholder='Enter your complete address'
                  color={errors.address ? 'failure' : undefined}
                />
                {errors.address && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.address.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Google Maps URL */}
        <div className='md:col-span-2'>
          <Label htmlFor='mapUrl' className='mb-1.5 !text-gray-700 font-medium'>
            Google Maps URL
          </Label>
          <Controller
            name='mapUrl'
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  id='mapUrl'
                  {...field}
                  placeholder='Enter your Google Maps location URL'
                  theme={inputTheme}
                  color={errors.mapUrl ? 'failure' : undefined}
                />
                {errors.mapUrl && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.mapUrl.message}
                  </p>
                )}
              </>
            )}
          />
          <p className='mt-1 text-xs text-gray-500'>
            This URL will be used to show your business location on the website. Please use the "Embed a map" URL from Google Maps (Share -&gt; Embed a map).
          </p>
        </div>
      </div>
    </>
  );
};
