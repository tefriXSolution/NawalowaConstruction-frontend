import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '@/assets/img/logo.png';
import styles from './NotFoundPage.module.css';
import { FaHome } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.notFoundCard}>
        {/* Logo */}
        <div className={styles.logoContainer}>
          <div className={styles.logoWrapper}>
            <img
              src={logo}
              alt='Nawalowa Constructions Logo'
              className={styles.logo}
            />
          </div>
        </div>

        {/* Company Name */}
        <h1 className={styles.companyName}>Nawalowa Constructions</h1>

        {/* 404 Error */}
        <div className={styles.errorSection}>
          <div className={styles.errorNumber}>404</div>
          <h2 className={styles.errorTitle}>Page Not Found</h2>
          <p className={styles.errorDescription}>
            The page you're looking for doesn't exist. It might have been moved
            or deleted.
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className={styles.buttonContainer}>
          <button
            onClick={handleGoHome}
            className={`${styles.primaryButton} ${styles.iconButton}`}
          >
            <FaHome className={styles.icon} />
            <span>Go to Homepage</span>
          </button>

          <button
            onClick={handleGoBack}
            className={`${styles.secondaryButton} ${styles.iconButton}`}
          >
            <FaArrowLeft className={styles.icon} />
            <span>Go Back</span>
          </button>
        </div>

        {/* Quick Links */}
        <div className={styles.quickLinksSection}>
          <p className={styles.quickLinksTitle}>Quick Links:</p>
          <div className={styles.quickLinksContainer}>
            <button
              onClick={() => navigate('/login')}
              className={styles.quickLink}
            >
              Admin Login
            </button>
            <span className={styles.separator}>•</span>
            <button
              onClick={() => navigate('/contactUs')}
              className={styles.quickLink}
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
