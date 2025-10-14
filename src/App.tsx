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
    // This is the correct place to call the function
    // because useEffect runs within the component's lifecycle.
    if (user?.email) {
      // Call the utility and pass the dispatch and email from the Redux store
      checkAndRefreshToken(dispatch, user.email);
    }
    
    // You can also set up an interval to check periodically
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