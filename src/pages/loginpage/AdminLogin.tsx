import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginApi } from '@/api';
import { Credentials } from '@/types';
import { LoginHeader, LoginForm, ForgotPasswordModal } from './components';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Forgot password modal states
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  // Form validation
  const isFormValid = Boolean(email.trim() && password.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isForgotEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
    forgotEmail.trim(),
  );

  const handleLogin = async () => {
    setErrorMsg('');

    // Client-side validation
    if (!email.trim()) {
      setErrorMsg('Email is required');
      return;
    }

    if (!isEmailValid) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    if (!password.trim()) {
      setErrorMsg('Password is required');
      return;
    }

    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const credentials: Credentials = { email: email.trim(), password };
      console.log('Sending login request with:', {
        email: email.trim(),
        password: '***',
      });

      const response = await loginApi(credentials);

      const { token, user } = response;
      console.log('Login success:', user);

      localStorage.setItem('adminToken', token ?? '');

      navigate('/dashboard');
    } catch (error: unknown) {
      console.error('Login error:', error);

      if (typeof error === 'object' && error !== null && 'response' in error) {
        const axiosError = error as any;

        const backendMessage =
          axiosError.response?.data?.message ||
          axiosError.response?.data?.error;
        if (backendMessage) {
          setErrorMsg(backendMessage);
        } else if (axiosError.response?.status === 400) {
          setErrorMsg(
            'Invalid email or password. Please check your credentials.',
          );
        } else {
          setErrorMsg('Login failed. Please try again.');
        }
      } else if (error instanceof Error) {
        setErrorMsg(error.message);
      } else {
        setErrorMsg('Login failed. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
    setForgotPasswordSuccess(false);
    setForgotPasswordError('');
    setForgotEmail('');
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotEmail.trim()) {
      setForgotPasswordError('Email is required');
      return;
    }

    if (!isForgotEmailValid) {
      setForgotPasswordError('Please enter a valid email address');
      return;
    }

    setForgotPasswordLoading(true);
    setForgotPasswordError('');

    try {
      // Forgot password API
      // await forgotPasswordApi({ email: forgotEmail.trim() });

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setForgotPasswordSuccess(true);
    } catch (error) {
      setForgotPasswordError('Failed to send reset email. Please try again.');
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPasswordModal(false);
    setForgotPasswordSuccess(false);
    setForgotPasswordError('');
    setForgotEmail('');
  };

  return (
    <>
      <div className='min-h-screen login-container flex items-center justify-center py-4 px-2'>
        <div className='max-w-sm w-full login-card rounded-xl p-5'>
          <LoginHeader />
          <LoginForm
            email={email}
            password={password}
            errorMsg={errorMsg}
            isLoading={isLoading}
            isFormValid={isFormValid}
            isEmailValid={isEmailValid}
            onEmailChange={setEmail}
            onPasswordChange={setPassword}
            onSubmit={handleSubmit}
            onForgotPasswordClick={handleForgotPasswordClick}
          />
        </div>
      </div>

      <ForgotPasswordModal
        isOpen={showForgotPasswordModal}
        email={forgotEmail}
        isLoading={forgotPasswordLoading}
        isSuccess={forgotPasswordSuccess}
        error={forgotPasswordError}
        isEmailValid={isForgotEmailValid}
        onEmailChange={setForgotEmail}
        onSubmit={handleForgotPasswordSubmit}
        onClose={closeForgotPasswordModal}
      />
    </>
  );
};

export default AdminLogin;
