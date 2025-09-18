import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AboutUsPage, HomePage } from './pages'
import AdminLogin from './pages/loginpage/adminLogin'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <HomePage/> */}
      {/* <AboutUsPage /> */}
      <AdminLogin />
    </>
  )
}

export default App
