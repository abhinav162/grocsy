import axiosInstance from "../../axios"
import "./Cart.scss"
import { useEffect, useState } from "react"

const Cart = ({ cItem }) => {
    const [cartItems, setCartItems] = useState(cItem)
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
    }, [''])

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
    }

    return (
        <>
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
                    <button type="submit" className="checkout-btn">Checkout</button>
                </div>
            </div>
        </>
    )
}

export default Cart;