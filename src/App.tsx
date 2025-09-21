import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { 
  AboutUsPage,

  HomePage, 
  LoginPage, 
  ProductMgtPage, 
  
} from './pages'

function App() {
  return (
    <>
      {/* <HomePage/> */}
      {/* <AboutUsPage /> */}
      {/* <LoginPage /> */}
       {/* <AddProduct />  */}
      <ProductMgtPage />
    </>
  )
}

export default App
