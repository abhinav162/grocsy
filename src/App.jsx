import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import './App.scss'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Cart from './pages/Cart/Cart'

function App() {
  return (
    <>
      <main>
        <div className='navbar'>
          <Navbar />
        </div>

        <div className='hero'>
          <div className='hero-content'>
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/login" Component={Login} />
              <Route path="/signup" Component={Signup} />
              {/* <Route path="*" Component={Login} /> */}
              <Route path="/cart" Component={Cart} />

              <Route path="/seller-dashboard" Component={SellerDashboard} />
            </Routes>
          </div>
        </div>

        <div className='footer'>
          <Footer />
        </div>
      </main>
    </>
  )
}

export default App
