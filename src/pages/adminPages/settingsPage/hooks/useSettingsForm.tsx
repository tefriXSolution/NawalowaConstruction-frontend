import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-toastify';

import {
  settingsSchema,
  SettingsFormData,
} from '@/pages/adminPages/settingsPage/validation/settingsSchema';
import {useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/types";
import {apiClient} from "@/api/apis.config";
import {updateUserData} from "@/redux/slices/user.slice";


export const useSettingsForm = (dispatch:AppDispatch) => {
  const [profileImage, setProfileImage] = useState<string>(
    '/placeholder-profile.jpg',
  );
  // const [profileImageFile, setProfileImageFile] = useState<File | null>(null);

  const {user} = useSelector((state: RootState) => state.auth);

  // const retriveUserDetails = async () => {
  //     try{
  //         const result = apiClient.get(`/users/user-details/${user?.id??""}`);
  //     }catch(err){
  //         console.log(err)
  //     }
  // }

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
      phoneNumber: user?.phone,
      email: user?.email,
      mapUrl: 'https://maps.google.com/?q=your-location',
      newPassword: '',
      confirmPassword: '',
      address: 'Street Address, City, Postal Code',
    },
  });
  const onSubmit = async (data: SettingsFormData) => {
      const fullName = data.name;
      const [firstName, lastName] = fullName.split(' ');
    try {
        console.log(firstName)
        console.log(lastName)
        const result = await apiClient.post('/users/change-user-details',{
            fname:firstName,
            lname:lastName,
            email:data.email,
        })
        const newUser = {
            ...user,
            fname:result.data.data.fname,
            lname:result.data.data.lname,
        }
        dispatch(updateUserData(newUser))
      toast.success('Settings saved successfully!');
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
