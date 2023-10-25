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
            {/* List of products added by the seller */}
            <div className='uploaded-products'>
                <h2>Seller Dashboard</h2>
                <h3>Your Products</h3>
                <table className='products-table'>
                    <thead>
                        <tr>
                            <th>S.No</th>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Unit</th>
                            <th>Category</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.length > 0 ?
                            (
                                products.map((product, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td><img src={product.imageUrl} style={{ height: "40px" }}></img></td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
                                        <td>{product.unit}</td>
                                        <td>{product.category}</td>
                                        <td>
                                            <button className='edit-btn' onClick={() => {
                                                modalHandler("open");
                                            }}>Edit</button>
                                            <button className='delete-btn' onClick={async () => {
                                                try {
                                                    const response = await axiosInstance().delete('/delete-product/' + product._id, {
                                                        headers: {
                                                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                                                        },
                                                    });

                                                    toast.success(response.data.message, {
                                                        duration: 2000,
                                                        position: 'bottom-right',
                                                        style: {
                                                            borderRadius: '10px',
                                                            background: '#333',
                                                            color: '#fff',
                                                        },
                                                    });
                                                    fetchSellerProducts();
                                                } catch (error) {
                                                    console.error(error);
                                                }
                                            }}>Delete</button>
                                        </td>
                                    </tr>
                                ))
                            ) :
                            (
                                <tr>
                                    <td colSpan='8'>No products listed yet</td>
                                </tr>
                            )}
                    </tbody>
                </table>
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
                <ProductForm toFetch={toFetch} setToFetch={setToFetch} />
            </div>
            <Toaster />
        </div>
    );
};

export default SellerDashboard;
