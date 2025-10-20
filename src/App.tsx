import './App.css';
import { RouterProvider } from 'react-router';
import './App.css'
import { router } from '@/routes';
import { useEffect } from 'react';
import { checkAndRefreshToken } from './utils';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/types';

function App() {

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user?.email) {
      checkAndRefreshToken(dispatch, user.email);
    }

    const interval = setInterval(() => {
        if (user?.email) {
            checkAndRefreshToken(dispatch, user.email);
        }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval); // Cleanup on component unmount

  }, [dispatch, user]); // Re-run if dispatch or user changes

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;