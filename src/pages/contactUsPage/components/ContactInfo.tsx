import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { contactInfoStyles } from '@/styles/contactInfoStyle';
import { useSelector } from 'react-redux';
import { RootState } from '@/types';

import { WHATSAPP_BUSINESS_CONFIG } from '@/config/whatsapp.config';

const ContactInfo: React.FC = () => {
  const { contactInfo, user } = useSelector((state: RootState) => state.auth);

  const handleWhatsappChat = () => {
    // Use the phone number from Redux or fallback
    const whatsappNumber = contactInfo?.phone || WHATSAPP_BUSINESS_CONFIG.BUSINESS_PHONE;
    const message = 'Hello, I would like to chat with you.';
    const sanitizedNumber = whatsappNumber.replace(/\D/g, '');
    window.open(`https://wa.me/${sanitizedNumber}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div style={contactInfoStyles.container}>
      <h2 style={contactInfoStyles.heading}>Get in Touch</h2>

      <div style={contactInfoStyles.infoItem}>
        <FaMapMarkerAlt style={contactInfoStyles.icon} />
        <div style={contactInfoStyles.textContainer}>
          <p style={contactInfoStyles.label}>Address</p>
          <p style={contactInfoStyles.text}>{contactInfo?.address || WHATSAPP_BUSINESS_CONFIG.COMPANY_ADDRESS}</p>
        </div>
      </div>

      <div style={contactInfoStyles.infoItem}>
        <FaPhone style={contactInfoStyles.icon} />
        <div style={contactInfoStyles.textContainer}>
          <p style={contactInfoStyles.label}>Phone</p>
          <p style={contactInfoStyles.text}>{contactInfo?.phone || WHATSAPP_BUSINESS_CONFIG.BUSINESS_PHONE}</p>
        </div>
      </div>

      <div style={contactInfoStyles.infoItem}>
        <FaEnvelope style={contactInfoStyles.icon} />
        <div style={contactInfoStyles.textContainer}>
          <p style={contactInfoStyles.label}>Email</p>
          <p style={contactInfoStyles.text}>{contactInfo?.email || user?.email || WHATSAPP_BUSINESS_CONFIG.COMPANY_EMAIL}</p>
        </div>
      </div>

      <h2 style={contactInfoStyles.heading}>Our Location</h2>
      <div style={contactInfoStyles.mapContainer}> {/* Use a new container for the iframe */}
        <iframe
          src={contactInfo?.location || ""}
          width="100%"
          height="100%"
          style={{ border: 0, borderRadius: '8px' }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps Location" // Add a title for accessibility
        ></iframe>
      </div>

      <button
        style={contactInfoStyles.whatsappButton}
        onClick={handleWhatsappChat}
      >
        <FaWhatsapp style={contactInfoStyles.whatsappIcon} />
        Chat on WhatsApp
      </button>
    </div>
  );
};

export default ContactInfo;