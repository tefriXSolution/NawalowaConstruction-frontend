import { CSSProperties } from 'react';

interface ContactInfoStyles {
    container: CSSProperties;
    heading: CSSProperties;
    infoItem: CSSProperties;
    icon: CSSProperties;
    textContainer: CSSProperties;
    label: CSSProperties;
    text: CSSProperties;
    mapContainer: CSSProperties;
    whatsappButton: CSSProperties;
    whatsappIcon: CSSProperties;
}

export const contactInfoStyles: ContactInfoStyles = {
    container: {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        maxWidth: '500px',
        margin: '2rem auto',
    },
    heading: {
        color: 'var(--color-mainTheme-color)',
        fontSize: '1.5rem',
        marginBottom: '1.5rem',
    },
    infoItem: {
        display: 'flex',
        alignItems: 'flex-start',
        marginBottom: '1.5rem',
    },
    icon: {
        color: 'var(--color-mainTheme-color)',
        fontSize: '1.5rem',
        marginRight: '1rem',
        marginTop: '0.2rem',
    },
    textContainer: {
        display: 'flex',
        flexDirection: 'column',
    },
    label: {
        fontWeight: 'bold',
        color: '#333',
        margin: 0,
    },
    text: {
        color: '#666',
        margin: '0.2rem 0 0 0',
    },
    // Adjusted height to make the map smaller
    mapContainer: {
        width: '100%',
        height: '250px', // The new, smaller height
        borderRadius: '8px',
        overflow: 'hidden',
        marginBottom: '1.5rem',
    },
    whatsappButton: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: '1rem',
        border: 'none',
        borderRadius: '4px',
        backgroundColor: 'var(--color-mainTheme-color)',
        color: 'white',
        fontSize: '1rem',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
    whatsappIcon: {
        marginRight: '0.5rem',
        fontSize: '1.25rem',
    },
};