import { Control, FieldErrors } from 'react-hook-form';
import { SettingsFormData } from '../validation/settingsSchema';

export interface FormComponentProps {
  control: Control<SettingsFormData>;
  errors: FieldErrors<SettingsFormData>;
}

export interface ProfileImageProps {
  profileImage: string;
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleRemoveImage: () => void;
}

export interface FormButtonsProps {
  isSubmitting: boolean;
  resetForm: () => void;
}
