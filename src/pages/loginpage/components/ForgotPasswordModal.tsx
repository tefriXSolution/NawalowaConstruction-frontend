import React from 'react';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  email: string;
  isLoading: boolean;
  isSuccess: boolean;
  error: string;
  isEmailValid: boolean;
  onEmailChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onClose: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  email,
  isLoading,
  isSuccess,
  error,
  isEmailValid,
  onEmailChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 bg-gray-100 bg-opacity-50 flex items-center justify-center p-4 z-50'>
      <div className='login-card rounded-xl p-6 w-full max-w-md'>
        {!isSuccess ? (
          <>
            <div className='text-center mb-6'>
              <h3 className='text-lg font-semibold login-title mb-2'>
                Reset Password
              </h3>
              <p className='login-subtitle text-sm'>
                Enter your email address and we'll send you a link to reset your
                password.
              </p>
            </div>

            <form onSubmit={onSubmit} className='space-y-4'>
              <div>
                <label
                  htmlFor='forgot-email'
                  className='block text-sm font-medium login-title mb-1'
                >
                  Email Address
                </label>
                <input
                  id='forgot-email'
                  name='forgot-email'
                  type='email'
                  value={email}
                  onChange={(e) => onEmailChange(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg login-input transition-all text-sm ${
                    error && (!email.trim() || !isEmailValid)
                      ? 'login-input-error'
                      : ''
                  }`}
                  placeholder='admin@example.com'
                  disabled={isLoading}
                  required
                />
              </div>

              {error && (
                <div className='login-error-message text-sm text-center p-2 rounded-lg border'>
                  {error}
                </div>
              )}

              <div className='flex gap-3'>
                <button
                  type='button'
                  onClick={onClose}
                  disabled={isLoading}
                  className='flex-1 py-2 text-sm font-medium rounded-lg border login-input hover:bg-gray-50 transition-colors'
                >
                  Cancel
                </button>
                <button
                  type='submit'
                  disabled={!isEmailValid || isLoading}
                  className='flex-1 py-2 text-sm font-medium rounded-lg focus:outline-none transition-all login-button-primary'
                >
                  {isLoading ? (
                    <div className='flex items-center justify-center'>
                      <svg
                        className='animate-spin -ml-1 mr-2 h-4 w-4 text-white'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        ></circle>
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                        ></path>
                      </svg>
                      Sending...
                    </div>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className='text-center'>
            <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                className='w-8 h-8 text-green-600'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='2'
                  d='M5 13l4 4L19 7'
                ></path>
              </svg>
            </div>
            <h3 className='text-lg font-semibold login-title mb-2'>
              Reset Link Sent!
            </h3>
            <p className='login-subtitle text-sm mb-6'>
              We've sent a password reset link to <strong>{email}</strong>.
              Please check your email and follow the instructions to reset your
              password.
            </p>
            <button
              onClick={onClose}
              className='w-full py-2 text-sm font-medium rounded-lg login-button-primary'
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
