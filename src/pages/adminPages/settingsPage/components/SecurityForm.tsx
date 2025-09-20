import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { Label, TextInput } from 'flowbite-react';
import { HiEye, HiEyeOff } from 'react-icons/hi';
import { FormComponentProps } from '@/pages/adminPages/settingsPage/types';

export const SecurityForm: React.FC<FormComponentProps> = ({
  control,
  errors,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const inputTheme = {
    field: {
      input: {
        base: '!bg-white border !border-gray-300 !text-gray-800',
      },
    },
  };

  return (
    <>
      <h3 className='text-lg font-semibold mb-4 text-gray-800'>Security</h3>
      <div className='space-y-2'>
        {/* New Password */}
        <div>
          <Label
            htmlFor='newPassword'
            className='mb-1.5 !text-gray-700 font-medium'
          >
            New Password
          </Label>
          <div className='relative'>
            <Controller
              name='newPassword'
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    id='newPassword'
                    type={showPassword ? 'text' : 'password'}
                    {...field}
                    placeholder='Enter new password'
                    theme={inputTheme}
                    color={errors.newPassword ? 'failure' : undefined}
                  />
                  {errors.newPassword && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.newPassword.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type='button'
              onClick={() => setShowPassword(!showPassword)}
              className='absolute inset-y-0 right-0 flex items-center pr-3'
            >
              {showPassword ? (
                <HiEyeOff className='h-5 w-5 text-gray-500' />
              ) : (
                <HiEye className='h-5 w-5 text-gray-500' />
              )}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div>
          <Label
            htmlFor='confirmPassword'
            className='mb-1.5 !text-gray-700 font-medium'
          >
            Confirm New Password
          </Label>
          <div className='relative'>
            <Controller
              name='confirmPassword'
              control={control}
              render={({ field }) => (
                <>
                  <TextInput
                    id='confirmPassword'
                    type={showConfirmPassword ? 'text' : 'password'}
                    {...field}
                    placeholder='Confirm new password'
                    theme={inputTheme}
                    color={errors.confirmPassword ? 'failure' : undefined}
                  />
                  {errors.confirmPassword && (
                    <p className='mt-1 text-sm text-red-600'>
                      {errors.confirmPassword.message}
                    </p>
                  )}
                </>
              )}
            />
            <button
              type='button'
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 flex items-center pr-3'
            >
              {showConfirmPassword ? (
                <HiEyeOff className='h-5 w-5 text-gray-500' />
              ) : (
                <HiEye className='h-5 w-5 text-gray-500' />
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
