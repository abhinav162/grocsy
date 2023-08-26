import axiosInstance from "../../axios"
import "./Cart.scss"
import { useEffect, useState } from "react"
import Card from "../../components/Card/Card"

const Cart = ({buyerId}) => {
    const [cartItems, setCartItems] = useState([])

    const fetchCartItems = async () => {
        axiosInstance().get('/get-cart').then((res) => {
            console.log(res.data);
            setCartItems(res.data)
            console.log(cartItems);
        }).catch((err) => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchCartItems()
    },[])

    return (
        <>
            <div className="cart">
                <h1>Cart</h1>
                <div className="cart-items">
                    {
                        cartItems.length > 0
                            ?
                            (
                                cartItems.map((item, i) => {
                                    return (
                                        <Card key={i} id={item.id} name={item.name} desc={item.description} price={item.price} imageUrl={item.imageUrl} quantity={item.quantity} unit={item.unit} category={item.category} />
                                    )
                                })
                            )
                            : <p>No items in cart</p>
                    }
                </div>
            </div>
            <h1>Cart</h1>
        </>
    )
}

export default Cart;