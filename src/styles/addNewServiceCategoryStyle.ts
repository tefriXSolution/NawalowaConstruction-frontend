// src/styles/addNewServiceCategoryStyle.ts

import { CSSProperties } from 'react';

export const addNewServiceCategoryStyles: { [key: string]: CSSProperties } = {
    container: {
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        maxWidth: '500px',
        margin: '2rem auto',
        fontFamily: 'Arial, sans-serif',
    },
    heading: {
        fontSize: '1.5rem',
        fontWeight: 'normal',
        color: '#333',
        marginBottom: '1rem',
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
    buttonContainer: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: '2rem',
    },
    cancelButton: {
        backgroundColor: 'transparent',
        border: '1px solid #ccc',
        color: '#555',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '1rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    },
    addButton: {
        backgroundColor: 'var(--color-mainTheme-color)',
        border: 'none',
        color: 'white',
        padding: '0.75rem 1.5rem',
        borderRadius: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'background-color 0.3s',
    },
};