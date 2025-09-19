import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { AboutUsPage, ContactUsPage, HomePage } from '@/pages'
import { AdminDashboardLayout } from '@/layouts'
import { RouterProvider } from 'react-router'
import { router } from './routes/routes'

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
