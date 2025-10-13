export { validateToken } from '@/utils/jwtTokenUtil';

export {
  sendGeneralInquiry,
  sendQuoteRequest,
  sendEmergencyRequest,
  sendConsultationRequest,
  sendFollowUpMessage,
  sendComplaintMessage,
  sendFeedbackRequest,
  sendMaintenanceRequest,
  sendProgressInquiry,
  sendPaymentInquiry,
  sendMaterialInquiry,
  sendWarrantyRequest,
  formatPhoneNumber,
  isValidEmail,
  getBusinessHours,
  isBusinessHours,
  getNextBusinessDayMessage,
} from '@/utils/whatsappUtils';
