import axiosInstance from "../../axios";
import { useEffect, useState } from "react";

const Home = () => {
    const [products, setProducts] = useState([])

    const fetchProducts = async () => {
        const res = await axiosInstance().get('/products')
        console.log(res.data.products)
        setProducts(res.data.products)
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div>
            <h1>Home</h1>
            {
                products.length > 0
                    ?
                    (
                        products.map((product,i) => {
                            return (
                                <div key={i}>
                                    {/* <img src={product.imageUrl} alt={product.name} /> */}
                                    <h3>{product.name}</h3>
                                    <p>{product.description}</p>
                                    <p><span>&#8377;</span>{product.price}</p>
                                </div>
                            )
                        })
                    )
                    : <p>No products found</p>
            }
        </div>
    )
}

export default Home;