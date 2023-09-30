import './Navbar.scss';
import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Cart from '../../pages/Cart/Cart';
import axiosInstance from '../../axios';
import icon from '../../assets/icon.png'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation()
    const [currPage, setCurrPage] = useState("home")
    const [toFetchCart, setToFetchCart] = useState(false)  // to trigger cart fetch

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

    const handleClick = useCallback(async (id) => {
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
        else if (id == 'cart') {
            setToFetchCart(true)
            document.getElementById('cart-container').showModal();
        }
    }, [navigate])

    const token = localStorage.getItem('token');
    const userType = localStorage.getItem('userType')
    const name = localStorage.getItem('name')


    /// added cart component here temporaty 
    const [cartItems, setCartItems] = useState([])
    const [subtotal, setSubtotal] = useState(0)

    const fetchCartItems = async () => {
        axiosInstance().get('/get-cart').then((res) => {
            console.log(res.data);
            setCartItems(res.data)
            console.log(cartItems);
        }).catch((err) => {
            console.log(err);
        })
    }

    const calculateSubtotal = () => {
        let subtotal = 0;
        cartItems.forEach((item) => {
            subtotal += item.price * item.quantity;
        })

        setSubtotal(subtotal)
    }

    useEffect(() => {
        fetchCartItems()
    }, ['', toFetchCart])

    useEffect(() => {
        calculateSubtotal()
    }, [cartItems])

    const updateQuantity = (id, toIncrement, toDecrement, toDelete, currQuantity) => {

        var reqBody = {}

        if (toIncrement) {
            reqBody = {
                product_id: id,
                quantity: 1,
            }
        }

        if (toDecrement) {
            currQuantity == 1 ? reqBody = {
                product_id: id,
                quantity: 0,
                toDelete: true
            } : reqBody = {
                product_id: id,
                quantity: -1
            }
        }

        if (toDelete) {
            reqBody = {
                product_id: id,
                quantity: 0,
                toDelete: true
            }
        }

        axiosInstance().patch('/add-to-cart', reqBody).then((res) => {
            console.log(res.data);
            fetchCartItems()
        }).catch((err) => {
            console.log(err);
        })

        // end of cart components functions
    }

    return (
        <>
            <div className='logo'>
                <img src={icon}></img>
                <h1>Grocsy</h1>
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
                        <>
                            <button id='logout' onClick={() => {
                                handleClick("logout");
                            }}>Logout</button>
                        </>
                    ) : null
                }
            </div>
            <div className='login-signup'>
                {
                    token ? (
                        <>
                            <button id='cart' onClick={() => {
                                handleClick("cart");
                            }}><i className="fas fa-shopping-cart"></i></button>
                            <button className='profile-name'>{name}</button>
                            <div className='profile-image'></div>
                        </>
                    ) : (
                        <>
                            <button id='login' onClick={() => {
                                handleClick("login");
                            }}>Login</button>
                            <button id='signup' onClick={() => {
                                handleClick("signup");
                            }}>Sign Up</button>
                        </>
                    )
                }
            </div>

            <dialog id='cart-container'>
                {
                    <>
                        <h2>Cart <span id='close-cart' onClick={
                            () => {
                                setToFetchCart(false)
                                document.getElementById('cart-container').close();
                            }
                        }>x</span> </h2>
                        {/* <Cart /> */}

                        {/* Temporary added cart component in this file only */}
                        <div className="cart">
                            <div className="cart-items">
                                {
                                    cartItems.length > 0
                                        ?
                                        (
                                            cartItems.map((item, i) => {
                                                return (
                                                    <div className="cart-item" key={i}>
                                                        <img src={item.imageUrl} alt={item.name} />

                                                        <div className="cart-item-details">
                                                            <div className="cart-item-np">
                                                                <h3>{item.name}</h3>
                                                                <p><span>&#8377;</span>{item.price}</p>
                                                            </div>
                                                            <div className="cart-item-quantity">
                                                                <button onClick={() => {
                                                                    updateQuantity(item.product_id, false, true, false, item.quantity)
                                                                }} >-</button>
                                                                <p>{item.quantity}</p>
                                                                <button onClick={() => {
                                                                    updateQuantity(item.product_id, true, false, false, item.quantity)
                                                                }}>+</button>

                                                                {/* delete item button */}
                                                            </div>
                                                        </div>
                                                        <i className="fas fa-trash-alt delete-cart-item" onClick={() => {
                                                            updateQuantity(item.product_id, false, false, true, item.quantity)
                                                        }}></i>
                                                    </div>
                                                )
                                            })
                                        )
                                        : <p>No items in cart</p>
                                }
                            </div>
                            <div className="subtotal">
                                <h3>Subtotal<span><span>&#8377;</span>{subtotal}</span></h3>
                                <button>Checkout</button>
                            </div>
                        </div>

                        {/* end of cart component */}
                    </>
                }
            </dialog>
        </>
    )
}

export default Navbar;