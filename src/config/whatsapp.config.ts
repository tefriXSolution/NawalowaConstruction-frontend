/**
 * WhatsApp Business Configuration
 *
 * IMPORTANT: Update these values with your actual business information
 * For production deployment, use environment variables instead of hardcoded values
 */

export const WHATSAPP_BUSINESS_CONFIG = {
  // Your WhatsApp Business number (without + or spaces)
  // Example: If your number is +1-555-123-4567, enter: "15551234567"
  BUSINESS_PHONE: '1234567890',

  // Your country code (with +)
  COUNTRY_CODE: import.meta.env.VITE_WHATSAPP_COUNTRY_CODE || '+1',

  // Company Information
  COMPANY_NAME: import.meta.env.VITE_COMPANY_NAME || 'Nawalowa Construction',
  COMPANY_EMAIL:
    import.meta.env.VITE_COMPANY_EMAIL || 'info@nawalowaconstruction.com',
  COMPANY_WEBSITE:
    import.meta.env.VITE_COMPANY_WEBSITE || 'https://nawalowaconstruction.com',
  COMPANY_ADDRESS:
    import.meta.env.VITE_COMPANY_ADDRESS ||
    '123 Construction Ave, City, State, ZIP',

  // Business Hours
  WORKING_HOURS:
    import.meta.env.VITE_WORKING_HOURS ||
    'Monday - Friday: 8:00 AM - 6:00 PM, Saturday: 9:00 AM - 4:00 PM',

  // Response Time Promise
  RESPONSE_TIME: import.meta.env.VITE_RESPONSE_TIME || '2-4 business hours',

  // Analytics/Tracking
  ENABLE_ANALYTICS: import.meta.env.VITE_ENABLE_WHATSAPP_ANALYTICS === 'true',

  // Development/Production URLs
  WHATSAPP_WEB_URL: 'https://wa.me',
  WHATSAPP_API_URL:
    import.meta.env.VITE_WHATSAPP_API_URL || 'https://graph.facebook.com/v18.0',
};

/**
 * Service Categories Configuration
 * Define your service types and their descriptions
 */
export const SERVICE_CATEGORIES = {
  SAND_BLASTING: {
    name: 'Sand Blasting',
    description:
      'Professional surface preparation with industrial-grade equipment',
    keywords: [
      'surface preparation',
      'rust removal',
      'paint removal',
      'metal restoration',
    ],
  },
  STEEL_PAINTING: {
    name: 'Steel Painting',
    description: 'Industrial steel coating solutions with corrosion protection',
    keywords: [
      'steel coating',
      'corrosion protection',
      'industrial painting',
      'structural steel',
    ],
  },
  HOUSE_PAINTING: {
    name: 'House Painting',
    description:
      'Interior and exterior painting with premium quality materials',
    keywords: [
      'house painting',
      'interior painting',
      'exterior painting',
      'residential',
    ],
  },
  CUSTOM_SERVICE: {
    name: 'Custom Service',
    description: 'Tailored construction solutions for specific requirements',
    keywords: ['custom construction', 'specialized services', 'consultation'],
  },
};

/**
 * Message Templates Configuration
 * Customize the message formats sent via WhatsApp
 */
export const MESSAGE_TEMPLATES = {
  GREETING_EMOJI: '🏗️',
  REQUEST_ID_PREFIX: 'REQ',
  COMPANY_FOOTER: 'Quality • Reliability • Excellence',
};

/**
 * Validation Rules
 */
export const VALIDATION_RULES = {
  PHONE_MIN_LENGTH: 10,
  PHONE_MAX_LENGTH: 15,
  PHONE_REGEX: /^\+?[\d\s\-\(\)]{10,}$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NAME_MIN_LENGTH: 2,
  NAME_MAX_LENGTH: 50,
};

/**
 * Get configuration with environment variable fallbacks
 */
export const getWhatsAppConfig = () => ({
  businessPhoneNumber: WHATSAPP_BUSINESS_CONFIG.BUSINESS_PHONE,
  countryCode: WHATSAPP_BUSINESS_CONFIG.COUNTRY_CODE,
  supportNumber: WHATSAPP_BUSINESS_CONFIG.BUSINESS_PHONE,
});

export const getBusinessInfo = () => ({
  companyName: WHATSAPP_BUSINESS_CONFIG.COMPANY_NAME,
  website: WHATSAPP_BUSINESS_CONFIG.COMPANY_WEBSITE,
  email: WHATSAPP_BUSINESS_CONFIG.COMPANY_EMAIL,
  phoneNumber: `${WHATSAPP_BUSINESS_CONFIG.COUNTRY_CODE}-${WHATSAPP_BUSINESS_CONFIG.BUSINESS_PHONE}`,
  address: WHATSAPP_BUSINESS_CONFIG.COMPANY_ADDRESS,
  workingHours: WHATSAPP_BUSINESS_CONFIG.WORKING_HOURS,
});
