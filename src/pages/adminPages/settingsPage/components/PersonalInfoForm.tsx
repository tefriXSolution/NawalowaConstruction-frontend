import React from 'react';
import { Controller } from 'react-hook-form';
import { Label, TextInput } from 'flowbite-react';
import { HiMail } from 'react-icons/hi';
import { FormComponentProps } from '@/pages/adminPages/settingsPage/types';

export const PersonalInfoForm: React.FC<FormComponentProps> = ({
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
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>
        Personal Information
      </h3>
      <div className='space-y-2'>
        {/* Name */}
        <div>
          <Label htmlFor='name' className='mb-1.5 !text-gray-700 font-medium'>
            Name
          </Label>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  id='name'
                  {...field}
                  placeholder='Enter your full name'
                  theme={inputTheme}
                  color={errors.name ? 'failure' : undefined}
                />
                {errors.name && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.name.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Phone */}
        <div>
          <Label
            htmlFor='phoneNumber'
            className='mb-1.5 !text-gray-700 font-medium'
          >
            Phone Number
          </Label>
          <Controller
            name='phoneNumber'
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  id='phoneNumber'
                  {...field}
                  placeholder='Enter your phone number'
                  theme={inputTheme}
                  color={errors.phoneNumber ? 'failure' : undefined}
                />
                {errors.phoneNumber && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.phoneNumber.message}
                  </p>
                )}
              </>
            )}
          />
        </div>

        {/* Email */}
        <div>
          <Label htmlFor='email' className='mb-1.5 !text-gray-700 font-medium'>
            Email Address
          </Label>
          <Controller
            name='email'
            control={control}
            render={({ field }) => (
              <>
                <TextInput
                  id='email'
                  type='email'
                  icon={HiMail}
                  {...field}
                  placeholder='Enter your email address'
                  theme={inputTheme}
                  color={errors.email ? 'failure' : undefined}
                />
                {errors.email && (
                  <p className='mt-1 text-sm text-red-600'>
                    {errors.email.message}
                  </p>
                )}
              </>
            )}
          />
        </div>
      </div>
    </>
  );
};
