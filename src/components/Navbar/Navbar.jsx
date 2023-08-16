import './Navbar.css';
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

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
        window.location.reload();
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

const Navbar = () => {
    <div className='navbar'>
        <div className='curr-path'>
            <p>g.{currPage}</p>
        </div>
        <div className='nav-btns'>
            <button id='home' className='active' onClick={() => {
                handleClick("home");
            }}>Home</button>

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
}

export default Navbar;