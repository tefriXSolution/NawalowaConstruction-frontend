import { useState, useCallback } from 'react';
import { whatsappService } from '@/services/whatsapp.service';
import {
  ServiceType,
  RentalType,
  WhatsAppResponse,
} from '@/types/whatsappTypes';

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
