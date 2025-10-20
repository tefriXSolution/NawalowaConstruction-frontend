import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '@/types';
import { LoginHeader, LoginForm, ForgotPasswordModal } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/types';
import { loginUser } from '@/redux/thunks/user.thunk';
import { unwrapResult } from '@reduxjs/toolkit';

const AdminLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const { loading, message, error, refreshToken } = useSelector((state: RootState) => state.auth);

  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState('');

  const isFormValid = Boolean(email.trim() && password.trim());
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isForgotEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim());

   useEffect(() => {
    if (refreshToken) {
      navigate('/dashboard');
    }
  }, [refreshToken, navigate]);

  const handleLogin = async () => {
    if (!isEmailValid) {
      setErrorMsg('Please enter a valid email address');
      return;
    }
    if (password.length < 8) {
      setErrorMsg('Password must be at least 8 characters long');
      return;
    }
    setErrorMsg('');
    try {
      const credentials: Credentials = { email: email.trim(), password };
      const resultAction = await dispatch(loginUser(credentials));
      unwrapResult(resultAction);
      navigate('/dashboard');
      if (!error) {
        navigate('/dashboard');
        window.location.reload();
      }else{
        setErrorMsg(message);
      }
    } catch (rejectedValue) {
      const errorMessage = (rejectedValue as { message?: string })?.message || 'Login failed. Please try again.';
      setErrorMsg(errorMessage);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin();
  };

  const handleForgotPasswordClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowForgotPasswordModal(true);
  };

  const handleForgotPasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isForgotEmailValid) {
      setForgotPasswordError('Please enter a valid email address');
      return;
    }
    setForgotPasswordLoading(true);
    setForgotPasswordError('');
    try {
<<<<<<< Updated upstream
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setForgotPasswordSuccess(true);
    } catch (error) {
      setForgotPasswordError('Failed to send reset email. Please try again.');
=======
      const response = await apiClient.post('/users/forgot-password', {email:forgotEmail});

      console.log(response);
      setForgotPasswordSuccess(true);
    } catch (error) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
        setForgotPasswordError(error.response?.data?.message || 'Failed to send reset email. Please try again.');
>>>>>>> Stashed changes
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
            errorMsg={error? message:errorMsg}
            isLoading={loading}
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

