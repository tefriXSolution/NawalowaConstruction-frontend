import React from 'react';
import { Card } from 'flowbite-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ProfileImage } from '@/pages/adminPages/settingsPage/components/ProfileImage';
import { PersonalInfoForm } from '@/pages/adminPages/settingsPage/components/PersonalInfoForm';
import { SecurityForm } from '@/pages/adminPages/settingsPage/components/SecurityForm';
import { AddressForm } from '@/pages/adminPages/settingsPage/components/AddressForm';
import { FormButtons } from '@/pages/adminPages/settingsPage/components/FormButtons';
import { useSettingsForm } from '@/pages/adminPages/settingsPage/hooks/useSettingsForm';

export function SettingsPage() {
  const {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    profileImage,
    handleImageUpload,
    handleRemoveImage,
    onSubmit,
    resetForm,
  } = useSettingsForm();

  // TODO: Handle loading state

  return (
    <div className='container mx-auto px-4 py-6 min-h-screen'>
      <ToastContainer
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />

      <h1 className='text-2xl font-bold mb-1 text-gray-800'>
        Account Settings
      </h1>
      <p className='text-gray-600 mb-4 text-sm'>
        Manage your profile information and preferences
      </p>

      <Card className='max-w-4xl mx-auto shadow-md !bg-gray-100 border !border-gray-200'>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ProfileImage
            profileImage={profileImage}
            handleImageUpload={handleImageUpload}
            handleRemoveImage={handleRemoveImage}
          />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5'>
            {/* Left column: Personal Information */}
            <div>
              <PersonalInfoForm control={control} errors={errors} />
            </div>

            {/* Right column: Security */}
            <div>
              <SecurityForm control={control} errors={errors} />
            </div>
          </div>

          {/* Full width address section */}
          <div className='mt-5'>
            <AddressForm control={control} errors={errors} />
          </div>

          <FormButtons isSubmitting={isSubmitting} resetForm={resetForm} />
        </form>
      </Card>
    </div>
  );
}
