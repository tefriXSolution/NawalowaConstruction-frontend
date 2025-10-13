import React from 'react';
import logo from '@/assets/img/logo.png';

const LoginHeader = () => {
  return (
    <div className='text-center'>
      <div className='flex justify-center mb-2'>
        <div className='w-20 h-20 rounded-lg grid place-items-center'>
          <img src={logo} alt='Logo' className='w-full h-full object-contain' />
        </div>
      </div>

      <h1 className='text-xl font-semibold login-title mb-3'>
        Nawalowa Constructions
      </h1>
      <h2 className='text-lg font-bold login-title mb-1'>Admin Login</h2>
      <p className='login-subtitle text-sm mb-4 leading-snug'>
        Welcome back! Sign in to access your dashboard.
      </p>
    </div>
  );
};

export default LoginHeader;
