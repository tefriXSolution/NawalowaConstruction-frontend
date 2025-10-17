// src/pages/contactUsPage/components/ContactForm.tsx
import React, { useState } from 'react';
import { createContactMessageApi } from '@/api';
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
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(null);
        try {
            const res = await createContactMessageApi({
                name: formData.name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim() || undefined,
                message: formData.message.trim(),
            });
            if (res.error) {
                throw new Error(res.errorMessage || res.message || 'Failed to send message');
            }
            setSubmitSuccess(res.message || 'Message sent successfully');
            setFormData({ name: '', email: '', phone: '', message: '' });
        } catch (err: any) {
            setSubmitError(err?.message || 'Failed to send message');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div style={contactFormStyles.container}>
            <h2 style={contactFormStyles.heading}>Send us a Message</h2>
            <form onSubmit={handleSubmit}>
                {submitError && (
                    <div style={{
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: 8,
                        border: '1px solid #fecaca',
                        background: '#fef2f2',
                        color: '#b91c1c',
                        fontSize: 14,
                    }}>
                        {submitError}
                    </div>
                )}
                {submitSuccess && (
                    <div style={{
                        marginBottom: '1rem',
                        padding: '0.75rem',
                        borderRadius: 8,
                        border: '1px solid #bbf7d0',
                        background: '#f0fdf4',
                        color: '#166534',
                        fontSize: 14,
                    }}>
                        {submitSuccess}
                    </div>
                )}
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
                        placeholder="+94 77 1234 567"
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
                <button type="submit" style={contactFormStyles.submitButton} disabled={submitting}>
                    {submitting ? 'Sending…' : 'Send Message'}
                </button>
            </form>
        </div>
    );
};

