import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const [currPage, setCurrPage] = useState("home")

  useEffect(() => {
    const currentPathname = location.pathname.split('/')[1];

    setCurrPage(currentPathname || 'home');
  }, [location]);

  useEffect(() => {
    if (currPage !== 'login' && currPage !== 'register' && currPage !== 'update-contact') {
      document.getElementsByClassName('active')[0].classList.remove('active');
      document.getElementById(currPage).classList.add('active');
    }
  }, [currPage])

  const handleClick = useCallback((id) => {
    if (id === "home") {
      navigate('/')
    }
    else if (id === "logout") {
      localStorage.removeItem('token')
      navigate('/');
    }
    else if (id == "signup") {
      navigate('/signup')
    }
    else if (id == "login") {
      navigate('/login')
    }
    else if(id == "seller-dashboard")
    {
      navigate('/seller-dashboard')
    }
    else if(id == 'orders')
    {
      navigate('/orders')
    }
  }, [navigate])

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType')

  return (
    <>
      <Routes>
        <Route path="/" Component={() => {
          return (
            token ? <Home /> :
              <>
                <div className='home-login-container'>
                  <p>Log in or Register</p>
                  <button id='login' onClick={() => {
                    handleClick('login');
                  }}>Login</button>
                  <button id='signup' onClick={() => {
                    handleClick("signup")
                  }}>Register</button>
                </div>
              </>
          )
        }} />

        <Route path="/login" Component={() => {
          return token ? <Home /> : <Login />
        }} />
        <Route path="/signup" Component={Signup} />
        <Route path="*" Component={Login} />

        <Route path="/seller-dashboard" Component={SellerDashboard} />
      </Routes>

      <div className='navbar'>
        <div className='curr-path'>
          <p>g.{currPage}</p>
        </div>
        <div className='nav-btns'>
          <button id='home' className='active' onClick={() => {
            handleClick("home");
          }}>Home</button>

          {
            (token && localStorage.getItem('userType' === 'buyer')) ? (
              <button id='Orders' onClick={() => {
                handleClick("Orders");
              }}>Orders</button>
            ) : null
          }

          {
            (token && localStorage.getItem('userType' == 'seller')) ? (
              <button id='seller-dashboard' onClick={() => {
                handleClick("seller-dashboard");
              }}>Seller Dashboard</button>
            ) : null
          }

          {
            token ? (
              userType === 'seller' ? 
              (
                <button id='seller-dashboard' onClick={() => {
                  handleClick("seller-dashboard")
                }}>Seller Dashboard</button>
              ) : 
              (
                <button id='orders' onClick={() => {
                  handleClick('orders')
                }}>Orders</button>
              )
            ) : null
          }

          {
            token ? (
              <button id='logout' onClick={() => {
                handleClick("logout");
              }}>Logout</button>
            ) : null
          }

          {
            token ? null : (
              <button id='signup' onClick={() => {
                handleClick("signup");
              }
              }>Sign Up</button>
            )
          }
        </div>
      </div>
    </>
  )
}

export default App
