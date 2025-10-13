// WhatsApp Business API Integration Types
export interface WhatsAppConfig {
  businessPhoneNumber: string;
  countryCode: string;
  supportNumber?: string;
}

export interface ServiceRequest {
  serviceType: string;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  message?: string;
  timestamp: Date;
  requestId: string;
}

export interface WhatsAppMessage {
  recipient: string;
  message: string;
  businessInfo?: {
    companyName: string;
    website?: string;
  };
}

export interface WhatsAppResponse {
  success: boolean;
  error?: string;
  messageId?: string;
}

// Service types for the construction company
export enum ServiceType {
  SAND_BLASTING = 'Sand Blasting',
  STEEL_PAINTING = 'Steel Painting',
  HOUSE_PAINTING = 'House Painting',
  CUSTOM_SERVICE = 'Custom Service',
}

// Message templates for different services
export interface MessageTemplate {
  greeting: string;
  serviceDetails: string;
  contactInfo: string;
  footer: string;
}

export interface WhatsAppBusinessInfo {
  companyName: string;
  website: string;
  email: string;
  phoneNumber: string;
  address?: string;
  workingHours?: string;
}
