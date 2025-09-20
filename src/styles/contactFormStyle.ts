import { CSSProperties } from 'react';

// Define the type for the style object
interface ContactFormStyles {
  container: CSSProperties;
  heading: CSSProperties;
  formGroup: CSSProperties;
  label: CSSProperties;
  input: CSSProperties;
  emailInput: CSSProperties; // New style for the email field
  textarea: CSSProperties;
  submitButton: CSSProperties;
}

export const contactFormStyles: ContactFormStyles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '2rem',
    backgroundColor: 'white',
    borderRadius: '8px',
    maxWidth: '500px',
    margin: '2rem auto',
    fontFamily: 'Arial, sans-serif',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  heading: {
    color: 'var(--color-mainTheme-color)',
    fontSize: '1.5rem',
    marginBottom: '1.5rem',
  },
  formGroup: {
    marginBottom: '1.25rem',
  },
  label: {
    display: 'block',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  // New style for the email input
  emailInput: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderRadius: '0', // No rounded corners for the bottom line
    fontSize: '1rem',
  },
  textarea: {
    width: '100%',
    padding: '0.75rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
  },
  submitButton: {
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
};