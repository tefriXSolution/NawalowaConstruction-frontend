import {
  WhatsAppConfig,
  ServiceRequest,
  RentalRequest,
  WhatsAppMessage,
  WhatsAppResponse,
  ServiceType,
  RentalType,
  MessageTemplate,
  WhatsAppBusinessInfo,
} from '@/types/whatsappTypes';
import {
  getWhatsAppConfig,
  getBusinessInfo,
  SERVICE_CATEGORIES,
  MESSAGE_TEMPLATES,
} from '@/config/whatsapp.config';

/**
 * Professional WhatsApp Business Integration Service
 * Handles service requests through WhatsApp with proper message formatting
 */
class WhatsAppService {
  private config: WhatsAppConfig;
  private businessInfo: WhatsAppBusinessInfo;

  constructor() {
    this.config = getWhatsAppConfig();
    this.businessInfo = getBusinessInfo();
  }

  /**
   * Generate a unique request ID for tracking
   */
  private generateRequestId(): string {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8);
    return `${MESSAGE_TEMPLATES.REQUEST_ID_PREFIX}-${timestamp}-${random}`.toUpperCase();
  }

  /**
   * Create professional message template for service requests
   */
  private createServiceRequestMessage(serviceRequest: ServiceRequest): string {
    const {
      serviceType,
      customerName,
      customerPhone,
      customerEmail,
      requestId,
    } = serviceRequest;

    const greeting = `*${this.businessInfo.companyName}* - Service Request`;

    const serviceDetails = `
*Service Requested:* ${serviceType}
*Request ID:* ${requestId}
*Date:* ${new Date().toLocaleDateString()}
*Time:* ${new Date().toLocaleTimeString()}`;

    const customerInfo =
      customerName || customerPhone || customerEmail
        ? `

*Customer Information:*
${customerName ? `• Name: ${customerName}` : ''}
${customerPhone ? `• Phone: ${customerPhone}` : ''}
${customerEmail ? `• Email: ${customerEmail}` : ''}`
        : '';

    const serviceDescription = this.getServiceDescription(serviceType);

    const contactInfo = `

*Next Steps:*
Our team will contact you within 2-4 business hours to discuss:
• Project scope and requirements
• Site inspection scheduling
• Detailed quotation
• Timeline and availability

*Business Hours:*
${this.businessInfo.workingHours}

*Email:* ${this.businessInfo.email}
*Website:* ${this.businessInfo.website}`;

    const footer = `
─────────────────────
*${this.businessInfo.companyName}*
Professional Construction Services
${MESSAGE_TEMPLATES.COMPANY_FOOTER}`;

    return [
      greeting,
      serviceDetails,
      customerInfo,
      serviceDescription,
      contactInfo,
      footer,
    ]
      .filter((section) => section.trim())
      .join('\n');
  }

  /**
   * Get detailed service description based on service type
   */
  private getServiceDescription(serviceType: string): string {
    // Find matching service category
    const serviceKey = Object.keys(SERVICE_CATEGORIES).find(
      (key) =>
        SERVICE_CATEGORIES[key as keyof typeof SERVICE_CATEGORIES].name ===
        serviceType,
    ) as keyof typeof SERVICE_CATEGORIES;

    if (serviceKey && SERVICE_CATEGORIES[serviceKey]) {
      const service = SERVICE_CATEGORIES[serviceKey];
      return `
🔧 *${service.name} Service Details:*
• ${service.description}
• Professional consultation included
• Quality materials and equipment
• Experienced certified technicians
• Warranty and follow-up support`;
    }

    return `
⚙️ *Custom Service Request:*
• Tailored construction solutions
• Professional consultation
• Specialized project requirements
• Custom quotes available`;
  }

  /**
   * Format phone number for WhatsApp API
   */
  private formatPhoneNumber(phoneNumber: string): string {
    // Remove all non-digit characters
    const cleaned = phoneNumber.replace(/\D/g, '');

    // Add country code if not present
    if (!cleaned.startsWith(this.config.countryCode.replace('+', ''))) {
      return `${this.config.countryCode.replace('+', '')}${cleaned}`;
    }

    return cleaned;
  }

  /**
   * Validate WhatsApp number format
   */
  private isValidWhatsAppNumber(phoneNumber: string): boolean {
    const cleaned = phoneNumber.replace(/\D/g, '');
    return cleaned.length >= 10 && cleaned.length <= 15;
  }

  /**
   * Send service request via WhatsApp Web API
   */
  public async sendServiceRequest(
    serviceType: ServiceType | string,
    customerInfo?: {
      name?: string;
      phone?: string;
      email?: string;
      additionalMessage?: string;
    },
  ): Promise<WhatsAppResponse> {
    try {
      const requestId = this.generateRequestId();

      const serviceRequest: ServiceRequest = {
        serviceType,
        customerName: customerInfo?.name,
        customerPhone: customerInfo?.phone,
        customerEmail: customerInfo?.email,
        message: customerInfo?.additionalMessage,
        timestamp: new Date(),
        requestId,
      };

      const message = this.createServiceRequestMessage(serviceRequest);
      const phoneNumber = this.formatPhoneNumber(
        this.config.businessPhoneNumber,
      );

      // In a production environment, you would integrate with WhatsApp Business API
      // For now, we'll use WhatsApp Web URL scheme
      const whatsappUrl = this.generateWhatsAppWebUrl(phoneNumber, message);

      // Log the request for analytics/tracking
      this.logServiceRequest(serviceRequest);

      // Open WhatsApp Web
      window.open(whatsappUrl, '_blank');

      return {
        success: true,
        messageId: requestId,
      };
    } catch (error) {
      console.error('WhatsApp service error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Generate WhatsApp Web URL
   */
  private generateWhatsAppWebUrl(phoneNumber: string, message: string): string {
    const encodedMessage = encodeURIComponent(message);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  }

  /**
   * Log service request for analytics and tracking
   */
  private logServiceRequest(serviceRequest: ServiceRequest): void {
    // In production, this would send to analytics service or backend
    console.log('Service Request Logged:', {
      requestId: serviceRequest.requestId,
      serviceType: serviceRequest.serviceType,
      timestamp: serviceRequest.timestamp,
      customerInfo: {
        hasName: !!serviceRequest.customerName,
        hasPhone: !!serviceRequest.customerPhone,
        hasEmail: !!serviceRequest.customerEmail,
      },
    });

    // Store in localStorage for session tracking (optional)
    const requests = JSON.parse(
      localStorage.getItem('whatsapp_requests') || '[]',
    );
    requests.push({
      requestId: serviceRequest.requestId,
      serviceType: serviceRequest.serviceType,
      timestamp: serviceRequest.timestamp.toISOString(),
    });
    localStorage.setItem(
      'whatsapp_requests',
      JSON.stringify(requests.slice(-10)),
    ); // Keep last 10 requests
  }

  /**
   * Quick service request without customer details
   */
  public async sendQuickServiceRequest(
    serviceType: ServiceType | string,
  ): Promise<WhatsAppResponse> {
    return this.sendServiceRequest(serviceType);
  }

  /**
   * Create professional message template for rental requests
   */
  private createRentalRequestMessage(rentalRequest: RentalRequest): string {
    const {
      rentalType,
      itemName,
      dailyRate,
      customerName,
      customerPhone,
      customerEmail,
      rentalDuration,
      requestId,
    } = rentalRequest;

    const greeting = `*${this.businessInfo.companyName}* - Equipment Rental Request`;

    const rentalDetails = `
*Equipment Requested:* ${itemName}
*Category:* ${rentalType}
*Daily Rate:* Rs.${dailyRate}/day
*Request ID:* ${requestId}
*Date:* ${new Date().toLocaleDateString()}
*Time:* ${new Date().toLocaleTimeString()}${
      rentalDuration ? `\n*Estimated Duration:* ${rentalDuration}` : ''
    }`;

    const customerInfo =
      customerName || customerPhone || customerEmail
        ? `

*Customer Information:*
${customerName ? `• Name: ${customerName}` : ''}
${customerPhone ? `• Phone: ${customerPhone}` : ''}
${customerEmail ? `• Email: ${customerEmail}` : ''}`
        : '';

    const rentalDescription = this.getRentalDescription(itemName, dailyRate);

    const contactInfo = `

*Next Steps:*
Our rental team will contact you within 2-4 business hours to confirm:
• Equipment availability
• Rental duration and pickup/delivery
• Payment terms and deposit
• Operating instructions and safety briefing

*Business Hours:*
${this.businessInfo.workingHours}

*Email:* ${this.businessInfo.email}
*Website:* ${this.businessInfo.website}`;

    const footer = `
─────────────────────
*${this.businessInfo.companyName}*
Professional Equipment Rental Services
Quality Equipment | Competitive Rates | Expert Support`;

    return [
      greeting,
      rentalDetails,
      customerInfo,
      rentalDescription,
      contactInfo,
      footer,
    ]
      .filter((section) => section.trim())
      .join('\n');
  }

  /**
   * Get rental description for equipment
   */
  private getRentalDescription(itemName: string, dailyRate: number): string {
    return `
🚧 *${itemName} Rental Details:*
• Professional-grade equipment
• Regular maintenance and safety checks
• Operating instructions provided
• Technical support available
• Flexible rental periods
• Competitive daily rate: Rs.${dailyRate}`;
  }

  /**
   * Send rental request via WhatsApp
   */
  public async sendRentalRequest(
    rentalType: RentalType | string,
    itemName: string,
    dailyRate: number,
    customerInfo?: {
      name?: string;
      phone?: string;
      email?: string;
      rentalDuration?: string;
      additionalMessage?: string;
    },
  ): Promise<WhatsAppResponse> {
    try {
      const requestId = this.generateRequestId();

      const rentalRequest: RentalRequest = {
        rentalType,
        itemName,
        dailyRate,
        customerName: customerInfo?.name,
        customerPhone: customerInfo?.phone,
        customerEmail: customerInfo?.email,
        rentalDuration: customerInfo?.rentalDuration,
        message: customerInfo?.additionalMessage,
        timestamp: new Date(),
        requestId,
      };

      const message = this.createRentalRequestMessage(rentalRequest);
      const phoneNumber = this.formatPhoneNumber(
        this.config.businessPhoneNumber,
      );

      // Generate WhatsApp Web URL
      const whatsappUrl = this.generateWhatsAppWebUrl(phoneNumber, message);

      // Log the request for analytics/tracking
      this.logRentalRequest(rentalRequest);

      // Open WhatsApp Web
      window.open(whatsappUrl, '_blank');

      return {
        success: true,
        messageId: requestId,
      };
    } catch (error) {
      console.error('WhatsApp rental service error:', error);
      return {
        success: false,
        error:
          error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Log rental request for analytics and tracking
   */
  private logRentalRequest(rentalRequest: RentalRequest): void {
    console.log('Rental Request Logged:', {
      requestId: rentalRequest.requestId,
      rentalType: rentalRequest.rentalType,
      itemName: rentalRequest.itemName,
      dailyRate: rentalRequest.dailyRate,
      timestamp: rentalRequest.timestamp,
      customerInfo: {
        hasName: !!rentalRequest.customerName,
        hasPhone: !!rentalRequest.customerPhone,
        hasEmail: !!rentalRequest.customerEmail,
      },
    });

    // Store in localStorage for session tracking
    const requests = JSON.parse(
      localStorage.getItem('whatsapp_rental_requests') || '[]',
    );
    requests.push({
      requestId: rentalRequest.requestId,
      rentalType: rentalRequest.rentalType,
      itemName: rentalRequest.itemName,
      dailyRate: rentalRequest.dailyRate,
      timestamp: rentalRequest.timestamp.toISOString(),
    });
    localStorage.setItem(
      'whatsapp_rental_requests',
      JSON.stringify(requests.slice(-10)),
    );
  }

  /**
   * Send detailed service request with customer information
   */
  public async sendDetailedServiceRequest(
    serviceType: ServiceType | string,
    customerName: string,
    customerPhone: string,
    customerEmail?: string,
    additionalMessage?: string,
  ): Promise<WhatsAppResponse> {
    return this.sendServiceRequest(serviceType, {
      name: customerName,
      phone: customerPhone,
      email: customerEmail,
      additionalMessage,
    });
  }

  /**
   * Get business configuration
   */
  public getBusinessInfo(): WhatsAppBusinessInfo {
    return { ...this.businessInfo };
  }

  /**
   * Update business configuration (for admin use)
   */
  public updateBusinessInfo(newInfo: Partial<WhatsAppBusinessInfo>): void {
    this.businessInfo = { ...this.businessInfo, ...newInfo };
  }
}

// Export singleton instance
export const whatsappService = new WhatsAppService();

// Export class for custom instances
export { WhatsAppService };

// Export utility functions
export const formatWhatsAppMessage = (
  serviceType: string,
  customerInfo?: any,
) => {
  return whatsappService.sendServiceRequest(serviceType, customerInfo);
};

export const sendQuickWhatsAppRequest = (serviceType: ServiceType) => {
  return whatsappService.sendQuickServiceRequest(serviceType);
};
