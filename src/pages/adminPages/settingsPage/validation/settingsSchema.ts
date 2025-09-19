import { z } from 'zod';

export const settingsSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z
      .string()
      .min(1, 'Phone number is required')
      .refine(
        (phone) => {
          if (!phone) return false;
          const pattern1 = /^\+94\d{9}$/;
          const pattern2 = /^0\d{9}$/;
          return pattern1.test(phone) || pattern2.test(phone);
        },
        {
          message:
            'Please enter a valid Sri Lankan phone number (+94765226321 or 0765226321)',
        },
      ),
    email: z.string().email('Please enter a valid email address'),
    mapUrl: z
      .string()
      .url('Please enter a valid URL')
      .or(z.string().length(0))
      .optional(),
    address: z.string().min(1, 'Address is required'),
    newPassword: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.newPassword && data.newPassword !== data.confirmPassword) {
        return false;
      }
      return true;
    },
    {
      message: "Passwords don't match",
      path: ['confirmPassword'],
    },
  );

export type SettingsFormData = z.infer<typeof settingsSchema> & {
  profileImageFile?: File;
};
