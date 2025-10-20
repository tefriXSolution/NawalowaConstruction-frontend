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

// Rental types for equipment
export enum RentalType {
  PAINTING_MACHINE = 'Painting Machine',
  SAND_BLASTING_EQUIPMENT = 'Sand Blasting Equipment',
  SCAFFOLDING = 'Scaffolding',
  CONCRETE_MIXER = 'Concrete Mixer',
  POWER_TOOLS = 'Power Tools',
  CUSTOM_EQUIPMENT = 'Custom Equipment',
}

export interface RentalRequest {
  rentalType: string;
  itemName: string;
  dailyRate: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
  rentalDuration?: string;
  message?: string;
  timestamp: Date;
  requestId: string;
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
