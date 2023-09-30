import "./AddToCart.scss"
import axiosInstance from "../../axios"
import { useState } from "react"
import { Toaster, toast } from "react-hot-toast"

const AddToCart = ({ productID }) => {
    const [quantity, setQuantity] = useState(1);
    const addToCart = () => {
        const reqBody = {
            product_id: productID,
            quantity: quantity,
        }
        axiosInstance().patch(`/add-to-cart/`, reqBody).then((res) => {
            toast.success(res.data.message, {
                position: "bottom-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });
        }).catch((err) => {
            toast.error(err.response.data.message, {
                position: "bottom-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        })
    }
    return (
        <>
            <div className="add-to-cart">
                <button className="add-to-crt-btn" onClick={() => {
                    addToCart()
                }}>Add to Cart</button>
                <select className="quantity-selector" onChange={(e) => { setQuantity(e.target.value) }}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                </select>
            </div>
            <Toaster />
        </>
    )
}

export default AddToCart;