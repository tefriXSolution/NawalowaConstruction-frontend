// src/styles/addNewServiceStyle.ts

import { CSSProperties } from 'react';

export const addNewServiceStyles: { [key: string]: CSSProperties } = {
    pageContainer: {
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f5f5f5',
        minHeight: '100vh',
    },
    mainHeading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '2rem',
    },
    formCard: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
    },
    subHeading: {
        fontSize: '1.5rem',
        color: '#333',
        fontWeight: 'normal',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        border: 'none',
        color: '#999',
        cursor: 'pointer',
        fontSize: '1rem',
    },
    divider: {
        border: '0',
        borderTop: '1px solid #eee',
        margin: '1rem 0',
    },
    formGroup: {
        marginBottom: '1.5rem',
    },
    label: {
        display: 'block',
        fontWeight: 'bold',
        color: '#555',
        marginBottom: '0.5rem',
    },
    input: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
    },
    textarea: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        resize: 'vertical',
    },
    select: {
        width: '100%',
        padding: '0.75rem',
        border: '1px solid #ccc',
        borderRadius: '4px',
        fontSize: '1rem',
        cursor: 'pointer',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '2rem',
    },
    addCategoryButton: {
        backgroundColor: 'white',
        border: '1px solid var(--color-mainTheme-color)',
        color: 'var(--color-mainTheme-color)',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '1rem',
        transition: 'background-color 0.3s',
    },
    submitButton: {
        backgroundColor: 'var(--color-mainTheme-color)',
        border: 'none',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
};