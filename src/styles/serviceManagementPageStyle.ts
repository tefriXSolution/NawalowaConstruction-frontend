// src/styles/serviceManagementPageStyle.ts

import { CSSProperties } from 'react';

export const serviceManagementPageStyles: { [key: string]: CSSProperties } = {
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
    contentContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap',
    },
    addNewServiceWrapper: {
        flex: '1 1 50%',
        maxWidth: '800px',
    },
    addNewCategoryWrapper: {
        flex: '1 1 30%',
        maxWidth: '400px',
        // The following styles align the category form below the service form, as shown in the UI.
        // To have them side by side, these styles might need adjustment.
    },
};