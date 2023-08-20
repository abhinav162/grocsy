import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios';
import { toast, Toaster } from 'react-hot-toast';
import { Hcard } from '../../components/Card/Card';
import ProductForm from '../../components/Product form/AddProductForm';
import './SellerDashboard.css';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [toFetch, setToFetch] = useState(false);

    // Fetch seller's products from the server when the component mounts
    const fetchSellerProducts = async () => {
        try {
            const sellerId = localStorage.getItem('userId');

            const response = await axiosInstance().get('/all-products/' + sellerId, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            setProducts(response.data.products);
        } catch (error) {
            console.error(error);
        }
    };

    // Modal handler function to open and close the modal to add/edit product
    const modalHandler = (action) => {
        if (action === 'open') {
            document.getElementsByClassName('add-product-modal')[0].style.display = 'block';
        }
        else if (action === 'close') {
            document.getElementsByClassName('add-product-modal')[0].style.display = 'none';
            fetchSellerProducts();
        }
    }

    // Fetch seller's products from the server when the component mounts
    useEffect(() => {
        fetchSellerProducts();
    }, []);
    console.log(products);

    // fetch products when a new product is added
    useEffect(() => {
        if (toFetch)
            fetchSellerProducts();
    }, [toFetch]);


    return (
        <div className='seller-dashboard'>
            <h2>Seller Dashboard</h2>
            {/* List of products added by the seller */}
            <div>
                <h3>Your Products:</h3>
                {products.length > 0 ?
                    (
                        products.map((product, i) => (
                            <div key={i}>
                                <Hcard id={product._id} name={product.name} desc={product.description} price={product.price} imageUrl={product.imageUrl} quantity={product.quantity} unit={product.unit} category={product.category} fetchSellerProducts={fetchSellerProducts} />
                            </div>
                        ))
                    ) :
                    (
                        <p>No products listed yet</p>
                    )}

                <button className='add-product-btn' onClick={() => {
                    modalHandler("open");
                }}>Add Product</button>
            </div>

            {/* Option to add new product */}
            <div className='add-product-modal' onClick={(e) => {
                if (e.target.classList.contains('add-product-modal')) {
                    modalHandler("close");
                }
            }}>
                <ProductForm toFetch={toFetch} setToFetch={setToFetch}/>
            </div>
            <Toaster />
        </div>
    );
};

export default SellerDashboard;
