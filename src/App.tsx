import { useState } from 'react'
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
