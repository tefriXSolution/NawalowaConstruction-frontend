import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
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
      {/* <HomePage/> */}
      {/* <AboutUsPage /> */}
      {/* <LoginPage /> */}
       {/* <AddProduct />  */}
      <RentalInventory />
    </>
  )
}

export default App
