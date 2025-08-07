import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppLayout from './App.jsx'
import './index.css'



createRoot(document.getElementById('root')).render(
  
     <BrowserRouter>
  <StrictMode>
      

    <AppLayout />
  </StrictMode>
  </BrowserRouter>
 
)
