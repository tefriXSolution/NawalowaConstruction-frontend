/// <reference types="vite/client" />

interface ImportMetaEnv {
  // WhatsApp Business Configuration
  readonly VITE_WHATSAPP_BUSINESS_PHONE: string;
  readonly VITE_WHATSAPP_COUNTRY_CODE: string;

  // Company Information
  readonly VITE_COMPANY_NAME: string;
  readonly VITE_COMPANY_EMAIL: string;
  readonly VITE_COMPANY_WEBSITE: string;
  readonly VITE_COMPANY_ADDRESS: string;

  // Business Operations
  readonly VITE_WORKING_HOURS: string;
  readonly VITE_RESPONSE_TIME: string;

  // Analytics
  readonly VITE_ENABLE_WHATSAPP_ANALYTICS: string;

  // API Configuration
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WHATSAPP_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
