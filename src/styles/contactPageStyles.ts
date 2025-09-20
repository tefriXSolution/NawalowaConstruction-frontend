import { CSSProperties } from 'react';

export const contactPageStyles: {
    container: CSSProperties;
    contactInfo: CSSProperties;
    contactForm: CSSProperties;
} = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        // Align children to the bottom to align the buttons
        alignItems: 'flex-end',
        gap: '2rem',
        padding: '2rem',
        flexWrap: 'wrap',
    },
    contactInfo: {
        flex: '1 1 30%',
        maxWidth: '400px',
    },
    contactForm: {
        flex: '1 1 60%',
        maxWidth: '600px',
    },
};