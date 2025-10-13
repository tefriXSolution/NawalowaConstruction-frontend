import './App.css';
import { RouterProvider } from 'react-router';
import './App.css'
import { router } from '@/routes';
import { useEffect } from 'react';
import { checkAndRefreshToken } from './utils';

function App() {

  useEffect(() => {
    // Run immediately and then every 9 minutes
    checkAndRefreshToken();
    const interval = setInterval(checkAndRefreshToken, 9 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;