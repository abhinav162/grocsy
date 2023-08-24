import { useState, useEffect, useCallback } from 'react'
import { useNavigate, Navigate, useLocation } from 'react-router-dom'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Login from './pages/Login/Login'
import Signup from './pages/Signup/Signup'
import SellerDashboard from './pages/SellerDashboard/SellerDashboard'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'

function App() {
  const navigate = useNavigate();
  const location = useLocation()
  const [currPage, setCurrPage] = useState("home")

  useEffect(() => {
    const currentPathname = location.pathname.split('/')[1];

    if (currentPathname === '') {
      setCurrPage('home');
    }
    else {
      setCurrPage(currentPathname);
    }
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
      window.location.reload();
    }
    else if (id == "signup") {
      navigate('/signup')
    }
    else if (id == "login") {
      navigate('/login')
      // window.location.reload();
    }
    else if (id == "seller-dashboard") {
      navigate('/seller-dashboard')
    }
    else if (id == 'orders') {
      navigate('/orders')
    }
  }, [navigate])

  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('userType')
  const name = localStorage.getItem('name')

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
