// import { useState } from 'react'
import React from 'react'
import Navbar from './Navbar'
import Layout from './Layout'
import SignIn from './Signin'
import Register from './Regist'
import ProductOverview from './POverview'
import ProductPage from './Productpage'
import Cart from './Cart'
import Checkout from './Checkout'
import Home from './Home'
import About from './About'
import Change from './Change'
import { BrowserRouter , Route,Router,Routes } from 'react-router-dom'
import MenPage from './Men'
import WomenPage from './women'
import Footer from './Footer'




function App() {

  return (
   <>
   <Navbar/>
   <Routes>
  
      <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/productpage' element={<ProductPage/>}/>
      <Route path='/productview/:id' element={<ProductOverview/>}/>
      <Route path='/men' element={<MenPage/>}/>
      <Route path='/women' element={<WomenPage/>}/>
      <Route path='/cart' element={<Cart/>}/>
      <Route path='/checkout' element={<Checkout/>}/>
      
    </Routes>
  
    <Footer/>
    
    </>
  )
}

export default App
