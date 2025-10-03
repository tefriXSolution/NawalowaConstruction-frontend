import './App.css';
import { AdminDashboardLayout } from '@/layouts';
import { RouterProvider } from 'react-router';
import { router } from './routes/routes';
import { useState } from 'react'
import './App.css'
import { 
  AboutUsPage,
  AddProduct,
  HomePage, 
  LoginPage, 
  RentalInventory
} from './pages'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;