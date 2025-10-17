import React from 'react';

interface LoginFormProps {
  email: string;
  password: string;
  errorMsg: string;
  isLoading: boolean;
  isFormValid: boolean;
  isEmailValid: boolean;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onForgotPasswordClick: (e: React.MouseEvent) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({
  email,
  password,
  errorMsg,
  isLoading,
  isFormValid,
  isEmailValid,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onForgotPasswordClick,
}) => {
  return (
    <form onSubmit={onSubmit} className='space-y-3'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium login-title mb-1'
        >
          Email or Username
        </label>
        <input
          id='email'
          name='email'
          type='email'
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg login-input transition-all text-sm ${errorMsg && (!email.trim() || !isEmailValid)
              ? 'login-input-error'
              : ''
            }`}
          placeholder='admin@example.com'
          autoComplete='username email'
          disabled={isLoading}
          required
        />
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium login-title mb-1'
        >
          Password
        </label>
        <input
          id='password'
          name='password'
          type='password'
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
          className={`w-full px-3 py-2 border rounded-lg login-input transition-all text-sm ${errorMsg && !password.trim() ? 'login-input-error' : ''
            }`}
          placeholder='••••••••'
          autoComplete='current-password'
          disabled={isLoading}
          required
          minLength={6}
        />
      </div>

      <div className='text-center'>
        <a
          href='#'
          onClick={onForgotPasswordClick}
          className='text-sm login-link hover:underline'
        >
          Forgot password?
        </a>
      </div>

      {errorMsg && (
        <div className='login-error-message text-sm text-center p-2 rounded-lg border'>
          {errorMsg}
        </div>
      )}

      <div>
        <button
          type='submit'
          disabled={!isFormValid || isLoading}
          className={`w-full py-2 text-sm font-medium rounded-lg focus:outline-none transition-all transform login-button-primary ${!isFormValid || isLoading
              ? ''
              : 'hover:scale-[1.02] active:scale-[0.98]'
            }`}
        >
          {isLoading ? (
            <div className='flex items-center justify-center'>
              <svg
                className='animate-spin -ml-1 mr-3 h-4 w-4 text-white'
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
              Signing in...
            </div>
          ) : (
            'Log In'
          )}
        </button>
      </div>
    </form>
  );
};

export default LoginForm;
