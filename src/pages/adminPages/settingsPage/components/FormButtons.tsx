import React from 'react';
import { Button } from 'flowbite-react';
import { FormButtonsProps } from '@/pages/adminPages/settingsPage/types';

export const FormButtons: React.FC<FormButtonsProps> = ({
  isSubmitting,
  resetForm,
}) => {
  return (
    <div className='flex justify-end gap-3 mt-6 pt-6 border-t border-gray-200'>
      <Button
        color='light'
        className='!bg-white hover:!bg-gray-100 !border-gray-300 !text-gray-700'
        type='button'
        disabled={isSubmitting}
        onClick={resetForm}
      >
        Cancel
      </Button>
      <Button
        color='blue'
        className='!bg-blue-600 hover:!bg-blue-700 !text-white'
        type='submit'
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Saving...' : 'Save Changes'}
      </Button>
    </div>
  );
};
