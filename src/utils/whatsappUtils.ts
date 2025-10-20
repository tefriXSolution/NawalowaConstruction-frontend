import { whatsappService } from '@/services/whatsapp.service';
import { ServiceType } from '@/types/whatsappTypes';

/**
 * Utility functions for sending different types of WhatsApp messages
 * These can be used anywhere in your application
 */

/**
 * Send a quick general inquiry message
 */
export const sendGeneralInquiry = async (message?: string) => {
  return whatsappService.sendServiceRequest('General Inquiry', {
    additionalMessage:
      message ||
      "Hi! I'm interested in your construction services. Can you provide more information?",
  });
};

/**
 * Send a quote request with customer details
 */
export const sendQuoteRequest = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  projectDetails?: string;
}) => {
  return whatsappService.sendServiceRequest('Quote Request', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `I would like to request a quote for my construction project. ${
      customerInfo.projectDetails
        ? `Project details: ${customerInfo.projectDetails}`
        : ''
    }`,
  });
};

/**
 * Send an emergency service request
 */
export const sendEmergencyRequest = async (
  urgencyLevel: 'low' | 'medium' | 'high' = 'medium',
  details?: string,
) => {
  const urgencyEmojis = {
    low: '⚠️',
    medium: '🚨',
    high: '🚨🚨🚨',
  };

  return whatsappService.sendServiceRequest('Emergency Service', {
    additionalMessage: `${
      urgencyEmojis[urgencyLevel]
    } EMERGENCY REQUEST - Urgency Level: ${urgencyLevel.toUpperCase()}. ${
      details
        ? `Details: ${details}`
        : 'Please contact me immediately for emergency construction assistance.'
    }`,
  });
};

/**
 * Send a consultation booking request
 */
export const sendConsultationRequest = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  preferredDate?: string;
  projectType?: string;
}) => {
  const message = `I would like to schedule a consultation for my construction project. ${
    customerInfo.projectType
      ? `Project type: ${customerInfo.projectType}. `
      : ''
  }${
    customerInfo.preferredDate
      ? `Preferred date: ${customerInfo.preferredDate}. `
      : ''
  }Please let me know your availability.`;

  return whatsappService.sendServiceRequest('Project Consultation', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: message,
  });
};

/**
 * Send a follow-up message for existing customers
 */
export const sendFollowUpMessage = async (
  customerName: string,
  projectId?: string,
  message?: string,
) => {
  return whatsappService.sendServiceRequest('Follow-up', {
    name: customerName,
    additionalMessage: `Follow-up message${
      projectId ? ` for project ${projectId}` : ''
    }. ${
      message ||
      'Checking in on your construction project. How can we assist you further?'
    }`,
  });
};

/**
 * Send a complaint or issue report
 */
export const sendComplaintMessage = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  issueType: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
}) => {
  const priorityEmojis = {
    low: '📝',
    medium: '⚠️',
    high: '🚨',
  };

  return whatsappService.sendServiceRequest('Customer Complaint', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `${
      priorityEmojis[customerInfo.priority]
    } COMPLAINT/ISSUE REPORT - Priority: ${customerInfo.priority.toUpperCase()}
        
Issue Type: ${customerInfo.issueType}
Description: ${customerInfo.description}

Please contact me to resolve this matter.`,
  });
};

/**
 * Send a service completion feedback request
 */
export const sendFeedbackRequest = async (
  customerName: string,
  projectId?: string,
) => {
  return whatsappService.sendServiceRequest('Feedback Request', {
    name: customerName,
    additionalMessage: `Thank you for choosing our construction services${
      projectId ? ` for project ${projectId}` : ''
    }! We would love to hear your feedback about our work. Your opinion helps us improve our services.`,
  });
};

/**
 * Send a maintenance service request
 */
export const sendMaintenanceRequest = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  serviceType: string;
  urgency: 'routine' | 'urgent';
  description?: string;
}) => {
  return whatsappService.sendServiceRequest('Maintenance Service', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `${
      customerInfo.urgency === 'urgent' ? '🚨' : '🔧'
    } MAINTENANCE REQUEST - ${customerInfo.urgency.toUpperCase()}
        
Service Type: ${customerInfo.serviceType}
${customerInfo.description ? `Description: ${customerInfo.description}` : ''}

Please schedule maintenance service at your earliest convenience.`,
  });
};

/**
 * Send a project progress inquiry
 */
export const sendProgressInquiry = async (
  customerName: string,
  projectId: string,
) => {
  return whatsappService.sendServiceRequest('Progress Inquiry', {
    name: customerName,
    additionalMessage: `Hi! I would like to get an update on the progress of my construction project (ID: ${projectId}). Could you please provide the current status and expected completion timeline?`,
  });
};

/**
 * Send a payment inquiry message
 */
export const sendPaymentInquiry = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  invoiceNumber?: string;
  inquiryType:
    | 'payment_methods'
    | 'invoice_status'
    | 'payment_schedule'
    | 'other';
}) => {
  const inquiryMessages = {
    payment_methods:
      'I would like to know about available payment methods for my construction project.',
    invoice_status: `I need to check the status of my invoice${
      customerInfo.invoiceNumber ? ` #${customerInfo.invoiceNumber}` : ''
    }.`,
    payment_schedule:
      'I would like to discuss the payment schedule for my project.',
    other: 'I have a payment-related inquiry.',
  };

  return whatsappService.sendServiceRequest('Payment Inquiry', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `💳 PAYMENT INQUIRY: ${
      inquiryMessages[customerInfo.inquiryType]
    }`,
  });
};

/**
 * Send a material/equipment inquiry
 */
export const sendMaterialInquiry = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  materialType: string;
  quantity?: string;
  specifications?: string;
}) => {
  return whatsappService.sendServiceRequest('Material Inquiry', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `🏗️ MATERIAL/EQUIPMENT INQUIRY

Material Type: ${customerInfo.materialType}
${customerInfo.quantity ? `Quantity: ${customerInfo.quantity}` : ''}
${
  customerInfo.specifications
    ? `Specifications: ${customerInfo.specifications}`
    : ''
}

Please provide availability and pricing information.`,
  });
};

/**
 * Send a warranty service request
 */
export const sendWarrantyRequest = async (customerInfo: {
  name: string;
  phone: string;
  email?: string;
  projectId: string;
  issueDescription: string;
  completionDate?: string;
}) => {
  return whatsappService.sendServiceRequest('Warranty Service', {
    name: customerInfo.name,
    phone: customerInfo.phone,
    email: customerInfo.email,
    additionalMessage: `🛡️ WARRANTY SERVICE REQUEST

Project ID: ${customerInfo.projectId}
${
  customerInfo.completionDate
    ? `Project Completion Date: ${customerInfo.completionDate}`
    : ''
}
Issue Description: ${customerInfo.issueDescription}

This appears to be covered under warranty. Please arrange for inspection and repair.`,
  });
};

/**
 * Helper function to format phone numbers
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');

  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(
      6,
    )}`;
  }

  // Return original if not a standard format
  return phone;
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Get business hours for display
 */
export const getBusinessHours = () => {
  return whatsappService.getBusinessInfo().workingHours;
};

/**
 * Check if currently within business hours
 */
export const isBusinessHours = (): boolean => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentDay = now.getDay(); // 0 = Sunday, 1 = Monday, etc.

  // Monday-Friday: 8 AM - 6 PM, Saturday: 9 AM - 4 PM, Sunday: Closed
  if (currentDay >= 1 && currentDay <= 5) {
    // Monday to Friday
    return currentHour >= 8 && currentHour < 18;
  } else if (currentDay === 6) {
    // Saturday
    return currentHour >= 9 && currentHour < 16;
  }

  return false; // Sunday or outside hours
};

/**
 * Get next business day message
 */
export const getNextBusinessDayMessage = (): string => {
  const isWithinHours = isBusinessHours();

  if (isWithinHours) {
    return "We're currently online and will respond shortly!";
  }

  const now = new Date();
  const currentDay = now.getDay();

  if (currentDay === 0) {
    // Sunday
    return "We're currently closed. We'll respond first thing Monday morning.";
  } else if (currentDay === 6) {
    // Saturday after hours
    return "We're currently closed. We'll respond on Monday morning.";
  } else {
    return "We're currently closed. We'll respond during business hours.";
  }
};
