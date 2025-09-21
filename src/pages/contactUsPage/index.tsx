import React from 'react';
import { ContactForm } from './components/ContactForm';
import ContactInfo from './components/ContactInfo';
import { contactPageStyles } from '@/styles/contactPageStyles';

export const ContactUsPage = () => {
    return (
        <div style={contactPageStyles.container}>
            <div style={contactPageStyles.contactInfo}>
                <ContactInfo />
            </div>
            <div style={contactPageStyles.contactForm}>
                <ContactForm />
            </div>
        </div>
    );
};