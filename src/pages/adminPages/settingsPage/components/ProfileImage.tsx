import React from 'react';
import { BiCloudUpload } from 'react-icons/bi';
import { HiTrash } from 'react-icons/hi';
import { Button } from 'flowbite-react';
import { ProfileImageProps } from '@/pages/adminPages/settingsPage/types';

export const ProfileImage: React.FC<ProfileImageProps> = ({
  profileImage,
  handleImageUpload,
  handleRemoveImage,
}) => {
  return (
    <div className='mb-8'>
      <div className='flex flex-col items-center mb-4'>
        <div className='w-28 h-28 rounded-full overflow-hidden border-2 border-blue-100 shadow-sm mb-3'>
          <img
            src={profileImage}
            alt='Profile'
            className='w-full h-full object-cover'
          />
        </div>
        <div className='flex gap-2 justify-center'>
          <Button
            size='sm'
            color='blue'
            className='px-3 py-2 rounded-md !bg-blue-600 hover:!bg-blue-700 flex items-center gap-1.5'
            onClick={() => document.getElementById('upload-photo')?.click()}
          >
            <BiCloudUpload className='w-4 h-4' />
            <span>Upload</span>
            <input
              id='upload-photo'
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleImageUpload}
            />
          </Button>
          <Button
            size='sm'
            color='light'
            className='px-3 py-2 rounded-md !bg-gray-200 hover:!bg-gray-300 flex items-center gap-1.5'
            onClick={handleRemoveImage}
          >
            <HiTrash className='w-4 h-4 !text-gray-600' />
            <span>Remove</span>
          </Button>
        </div>
      </div>
    </div>
  );
};
