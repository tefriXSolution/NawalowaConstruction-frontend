import { useState, useCallback, useEffect } from 'react';
import { whatsappService } from '@/services/whatsapp.service';
import {
  ServiceType,
  RentalType,
  WhatsAppResponse,
} from '@/types/whatsappTypes';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';
import { WHATSAPP_BUSINESS_CONFIG } from '@/config/whatsapp.config';

interface UseWhatsAppReturn {
  isLoading: boolean;
  error: string | null;
  lastResponse: WhatsAppResponse | null;
  sendServiceRequest: (
    serviceType: ServiceType | string,
    customerInfo?: {
      name?: string;
      phone?: string;
      email?: string;
      additionalMessage?: string;
    },
  ) => Promise<WhatsAppResponse>;
  sendRentalRequest: (
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
  ) => Promise<WhatsAppResponse>;
  sendQuickRequest: (
    serviceType: ServiceType | string,
  ) => Promise<WhatsAppResponse>;
  clearError: () => void;
  getBusinessInfo: () => any;
}

/**
 * React Hook for WhatsApp Business Integration
 * Provides a clean interface for components to send WhatsApp service requests
 */
export const useWhatsApp = (): UseWhatsAppReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastResponse, setLastResponse] = useState<WhatsAppResponse | null>(
    null,
  );

  // Get contact info from Redux store
  const { contactInfo, user } = useSelector((state: RootState) => state.auth);

  // Update WhatsApp service configuration when contact info changes
  useEffect(() => {
    if (contactInfo) {
      whatsappService.updateBusinessInfo({
        phoneNumber: contactInfo.phone,
        email: contactInfo.email || user?.email || WHATSAPP_BUSINESS_CONFIG.COMPANY_EMAIL,
        address: contactInfo.address,
        // If location is mapUrl, we might not use it directly in business info text but good to have
      });

      // Update the config for the phone number used for sending messages
      if (contactInfo.phone) {
        whatsappService.updateConfig({
          businessPhoneNumber: contactInfo.phone
        });
      }
    }
  }, [contactInfo, user]);

  const sendServiceRequest = useCallback(
    async (
      serviceType: ServiceType | string,
      customerInfo?: {
        name?: string;
        phone?: string;
        email?: string;
        additionalMessage?: string;
      },
    ): Promise<WhatsAppResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Ensure we are using the latest contact info from the service
        // (which was updated by the useEffect above)
        const response = await whatsappService.sendServiceRequest(
          serviceType,
          customerInfo,
        );
        setLastResponse(response);

        if (!response.success && response.error) {
          setError(response.error);
        }

        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to send WhatsApp message';
        setError(errorMessage);

        const errorResponse: WhatsAppResponse = {
          success: false,
          error: errorMessage,
        };

        setLastResponse(errorResponse);
        return errorResponse;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const sendRentalRequest = useCallback(
    async (
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
    ): Promise<WhatsAppResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await whatsappService.sendRentalRequest(
          rentalType,
          itemName,
          dailyRate,
          customerInfo,
        );
        setLastResponse(response);

        if (!response.success && response.error) {
          setError(response.error);
        }

        return response;
      } catch (err) {
        const errorMessage =
          err instanceof Error
            ? err.message
            : 'Failed to send WhatsApp rental request';
        setError(errorMessage);

        const errorResponse: WhatsAppResponse = {
          success: false,
          error: errorMessage,
        };

        setLastResponse(errorResponse);
        return errorResponse;
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  const sendQuickRequest = useCallback(
    async (serviceType: ServiceType | string): Promise<WhatsAppResponse> => {
      return sendServiceRequest(serviceType);
    },
    [sendServiceRequest],
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const getBusinessInfo = useCallback(() => {
    return whatsappService.getBusinessInfo();
  }, []);

  return {
    isLoading,
    error,
    lastResponse,
    sendServiceRequest,
    sendRentalRequest,
    sendQuickRequest,
    clearError,
    getBusinessInfo,
  };
};
