// src/pages/contactUsPage/components/ContactForm.tsx
import React, { useState } from 'react';
import { contactFormStyles } from '@/styles/contactFormStyle';

interface FormData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

export const ContactForm: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Form data submitted:', formData);
        // Add your API call or other submission logic here
    };

    return (
        <div style={contactFormStyles.container}>
            <h2 style={contactFormStyles.heading}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
                <div style={contactFormStyles.formGroup}>
                    <label style={contactFormStyles.label} htmlFor="name">Name</label>
                    <input
                        style={contactFormStyles.input} // Uses the general input style
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Your Full Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={contactFormStyles.formGroup}>
                    <label style={contactFormStyles.label} htmlFor="email">Email</label>
                    <input
                        style={contactFormStyles.emailInput} // Uses the specific email input style
                        type="email"
                        id="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div style={contactFormStyles.formGroup}>
                    <label style={contactFormStyles.label} htmlFor="phone">Phone (Optional)</label>
                    <input
                        style={contactFormStyles.input} // Uses the general input style
                        type="tel"
                        id="phone"
                        name="phone"
                        placeholder="+1 (555) 987-6543"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>
                <div style={contactFormStyles.formGroup}>
                    <label style={contactFormStyles.label} htmlFor="message">Message</label>
                    <textarea
                        style={contactFormStyles.textarea}
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Type your message here..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" style={contactFormStyles.submitButton}>
                    Send Message
                </button>
            </form>
        </div>
    );
};

