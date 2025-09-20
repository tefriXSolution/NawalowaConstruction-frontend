import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import {
  settingsSchema,
  SettingsFormData,
} from '@/pages/adminPages/settingsPage/validation/settingsSchema';

export const useSettingsForm = () => {
  const [profileImage, setProfileImage] = useState<string>(
    '/placeholder-profile.jpg',
  );
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
    defaultValues: {
      name: 'John Doe',
      phoneNumber: '+94771234567',
      email: 'john.doe@example.com',
      mapUrl: 'https://maps.google.com/?q=your-location',
      newPassword: '',
      confirmPassword: '',
      address: 'Street Address, City, Postal Code',
    },
  });

  // TODO: Fetch admin profile data on component mount

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
      setProfileImageFile(file);

      // TODO: Image upload API integration
    }
  };

  const handleRemoveImage = () => {
    setProfileImage('/placeholder-profile.jpg');
    setProfileImageFile(null);

    // TODO: Image removal API integration
  };

  const onSubmit = async (data: SettingsFormData) => {
    try {
      // TODO: Profile update API integration

      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log('Form data to send to backend:', {
        ...data,
        profileImageFile: profileImageFile ? profileImageFile.name : null,
      });

      toast.success('Settings saved successfully!');
    } catch (err) {
      toast.error('Failed to save settings. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    reset();
    setProfileImage('/placeholder-profile.jpg');
    setProfileImageFile(null);
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    profileImage,
    profileImageFile,
    handleImageUpload,
    handleRemoveImage,
    onSubmit,
    resetForm,
  };
};
