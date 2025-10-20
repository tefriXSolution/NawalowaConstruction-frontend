// src/pages/contactUsPage/components/ContactInfo.tsx

import React from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { contactInfoStyles } from '@/styles/contactInfoStyle';

const ContactInfo: React.FC = () => {
  const handleWhatsappChat = () => {
    // Replace with your WhatsApp number and message
    const whatsappNumber = '+94 77 1234 567';
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
          <p style={contactInfoStyles.text}>105, Desiland watta, kirindigalla, Ibbagamuwa</p>
        </div>
      </div>

      <div style={contactInfoStyles.infoItem}>
        <FaPhone style={contactInfoStyles.icon} />
        <div style={contactInfoStyles.textContainer}>
          <p style={contactInfoStyles.label}>Phone</p>
          <p style={contactInfoStyles.text}>077 388 8328</p>
           <p style={contactInfoStyles.text}>071 151 8785</p>
          <p style={contactInfoStyles.text}>070 102 2111</p>
        </div>
      </div>

      <div style={contactInfoStyles.infoItem}>
        <FaEnvelope style={contactInfoStyles.icon} />
        <div style={contactInfoStyles.textContainer}>
          <p style={contactInfoStyles.label}>Email</p>
          <p style={contactInfoStyles.text}>chamindapiyankara005@gmail.com</p>
        </div>
      </div>

      <h2 style={contactInfoStyles.heading}>Our Location</h2>
      <div style={contactInfoStyles.mapContainer}> {/* Use a new container for the iframe */}
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15820.746719312252!2d80.46576424161269!3d7.554613379344867!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae349ca14a3258f%3A0xde3c3da93d47eb84!2sKirindigalla!5e0!3m2!1sen!2slk!4v1758205101042!5m2!1sen!2slk"
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