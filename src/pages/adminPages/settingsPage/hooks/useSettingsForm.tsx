import {useEffect, useState} from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import {
  settingsSchema,
  SettingsFormData,
} from '@/pages/adminPages/settingsPage/validation/settingsSchema';
import {useSelector} from "react-redux";
import {AppDispatch, ContactInfo, RootState} from "@/types";
import {apiClient} from "@/api/apis.config";
import {updateContactInfo, updateUserData} from "@/redux/slices/user.slice";

export const useSettingsForm = (dispatch:AppDispatch) => {
  const [profileImage, setProfileImage] = useState<string>(
    '/placeholder-profile.jpg',
  );

  const {user, contactInfo} = useSelector((state: RootState) => state.auth);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    mode: 'onChange',
    defaultValues: {
      name: user?.fname+" "+user?.lname,
      phoneNumber: contactInfo?.phone,
      email: user?.email,
      mapUrl: contactInfo?.location,
      newPassword: '',
      confirmPassword: '',
      address: contactInfo?.address,
    },
  });

    const onSubmit = async (data: SettingsFormData) => {
      const fullName = data.name;
      const [firstName, lastName] = fullName.split(' ');
    try {
        const result1 = await apiClient.post('/users/change-user-details',{
            fname:firstName,
            lname:lastName,
            email:data.email,
            password:data.newPassword,
            confirmPassword:data.confirmPassword,
        })
        const result2 = await apiClient.post('/users/change-contact-details',{
            location:data.mapUrl,
            phone:data.phoneNumber,
            address:data.address,
        })
        const newUser = {
            ...user,
            fname:result1.data.data.fname,
            lname:result1.data.data.lname,
        }
        if(data.newPassword==null || data.newPassword?.length>=8 || data.newPassword==""){
            dispatch(updateContactInfo(result2.data.data))
            dispatch(updateUserData(newUser))
            toast.success('Settings saved successfully!');
        }else{
            toast.error('Password must be at least 8 characters. Please try again.');
        }
    } catch (err) {
      toast.error('Failed to save settings. Please try again.');
      console.error(err);
    }
  };

  const resetForm = () => {
    reset();
    setProfileImage('/placeholder-profile.jpg');
  };

  return {
    control,
    handleSubmit,
    errors,
    isSubmitting,
    profileImage,
    onSubmit,
    resetForm,
  };
};
