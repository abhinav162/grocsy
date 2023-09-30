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

    const categoryArray = [
        {
            name: "Vegitables",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/a136osnwjhpjuqfvezf0"
        },
        {
            name: "Fruits",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/myaxzhkilmrqcdjc1jk2"
        },
        {
            name: "Dairy",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/fcvquyiassig8sipm9zu"
        },
        {
            name: "Soft Drinks",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/inoyaehxwpuggromfe8n"
        },
        {
            name: "Meat",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/mybfwlcis2yezk1fqrii"
        },
        {
            name: "Sea Food",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/f_auto,q_auto/v1/grocsy-products/uphkfls2wio6zmtftrex"
        }
    ]

    const featuresArray = [
        {
            name: "Fresh and Organic",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/v1692870361/grocsy-products/hbfipm6dbd9gubzslvyk.png"
        },
        {
            name: "Free Delivery",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/v1692871129/grocsy-products/phlgbr96qqqj1fjuy6xa.png"
        },
        {
            name: "Easy Payments",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/v1692871179/grocsy-products/ate6svdzy6lzgcjbv6oc.png"
        },
        {
            name: "24/7 Support",
            imageUrl: "https://res.cloudinary.com/grocsy-uploads/image/upload/v1692891411/grocsy-products/od0nnsuq0hzso9bcc26d.png"
        }
    ]

    return (
        <>
            <div className="home">
                <div className="home-banner">
                    <div className="banner-content">
                        <h2>fresh <span>grocery</span> products for your daily needs</h2>
                        <h3>healthy food healthy life</h3>
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
                        {
                            categoryArray.map((category, i) => {
                                return (
                                    <div key={i} className="category">
                                        <Card name={category.name} imageUrl={category.imageUrl} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                {/* <h2>Why Grocsy?</h2> */}
                <div className="features">
                    <h1 className="features-heading">
                        <span>Why Grocsy?</span>
                    </h1>
                    <div className="features-list">
                        {
                            featuresArray.map((feature, i) => {
                                return (
                                    <div key={i} className="feature">
                                        <Card name={feature.name} imageUrl={feature.imageUrl} showBtn={false} />
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home;