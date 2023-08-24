import axiosInstance from "../../axios";
import { useEffect, useState } from "react";
import './Home.css'
import Card from "../../components/Card/Card";

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';

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
        <>
            <div className="home">
                <div className="home-banner">
                    <div className="banner-content">
                        <h2>fresh and <span>organic</span> products for your daily needs</h2>
                        <h3>healthy food healthy life</h3>
                        <button>Apply for free sample</button>
                    </div>
                </div>

                {/* <h2 className="product-heading">Products <span></span></h2> */}
                <h1 className="heading">
                    <span>Shop Now</span>
                </h1>
                <div className="home-products">
                    {
                        products.length > 0
                            ?
                            (
                                products.map((product, i) => {
                                    return (
                                        <div key={i}>
                                            <Card id={product._id} name={product.name} desc={product.description} price={product.price} imageUrl={product.imageUrl} quantity={product.quantity} unit={product.unit} category={product.category} />
                                        </div>
                                    )
                                })
                            )
                            : <p>No products found</p>
                    }
                </div>

                <div>
                    <h1 className="heading">
                        <span>Shop by Category</span>
                    </h1>
                </div>

                <div className="categories">
                    <div className="categories-list">
                        <div className="category">
                            <Card name="Vegitables" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/a136osnwjhpjuqfvezf0" />
                        </div>
                        <div className="category">
                            <Card name="Fruits" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/myaxzhkilmrqcdjc1jk2" />
                        </div>
                        <div className="category">
                            <Card name="Dairy" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/fcvquyiassig8sipm9zu" />
                        </div>
                        <div className="category">
                            <Card name="Soft Drinks" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/inoyaehxwpuggromfe8n" />
                        </div>
                        <div className="category">
                            <Card name="Meat" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/mybfwlcis2yezk1fqrii" />
                        </div>
                        <div className="category">
                            <Card name="Sea Food" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/uphkfls2wio6zmtftrex" />
                        </div>
                    </div>
                </div>

                {/* <h2>Why Grocsy?</h2> */}
                <div className="features">
                    <h1 className="features-heading">
                        <span>Why Grocsy?</span>
                    </h1>
                    <div className="features-list">
                        <div className="feature">
                            <Card name="Fresh and Organic" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/v1692870361/grocsy-products/hbfipm6dbd9gubzslvyk.png" showBtn={false} />
                        </div>
                        <div className="feature">
                            <Card name="Free Delivery" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/v1692871129/grocsy-products/phlgbr96qqqj1fjuy6xa.png" showBtn={false} />
                        </div>
                        <div className="feature">
                            <Card name="Easy Payments" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/v1692871179/grocsy-products/ate6svdzy6lzgcjbv6oc.png" showBtn={false} />
                        </div>
                        <div className="feature">
                            <Card name="24/7 Support" imageUrl="https://res.cloudinary.com/grocsy-uploads/image/upload/v1692891411/grocsy-products/od0nnsuq0hzso9bcc26d.png" showBtn={false} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Home;