import { store } from '@/redux/store';

export type { NavBarLink } from '@/types/navBarTypes';
export type { FooterLink } from '@/types/footerTypes';
export type { OurStory, CoreValue } from '@/types/aboutUsTypes';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type{
    Credentials,
    User,
    NewUser,
    Role,
    LoginResponse,
    LoginAPIResponse,
    LogOutResponse,
} from '@/types/userTypes'

export type {
  WhatsAppConfig,
  ServiceRequest,
  WhatsAppMessage,
  WhatsAppResponse,
  MessageTemplate,
  WhatsAppBusinessInfo,
} from '@/types/whatsappTypes';

export type {
    RentalItem
} from '@/types/rentalItemTypes'

export { ServiceType } from '@/types/whatsappTypes';
