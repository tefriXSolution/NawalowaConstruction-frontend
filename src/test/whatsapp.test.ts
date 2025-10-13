import { whatsappService } from '@/services/whatsapp.service';
import { ServiceType } from '@/types/whatsappTypes';

// Test script to verify WhatsApp integration
console.log('🧪 Testing WhatsApp Integration...');

// Test 1: Service configuration
console.log('📋 Business Info:', whatsappService.getBusinessInfo());

// Test 2: Quick service request
console.log('🚀 Testing quick service request...');
whatsappService
  .sendQuickServiceRequest(ServiceType.SAND_BLASTING)
  .then((response) => {
    console.log('✅ Quick request test:', response);
  })
  .catch((error) => {
    console.error('❌ Quick request error:', error);
  });

// Test 3: Detailed service request
console.log('📝 Testing detailed service request...');
whatsappService
  .sendDetailedServiceRequest(
    ServiceType.STEEL_PAINTING,
    'John Doe',
    '+1-555-123-4567',
    'john@example.com',
    'Need urgent steel painting for warehouse project',
  )
  .then((response) => {
    console.log('✅ Detailed request test:', response);
  })
  .catch((error) => {
    console.error('❌ Detailed request error:', error);
  });

console.log(
  '🎯 WhatsApp integration tests completed! Check console for results.',
);

export {}; // Make this a module
