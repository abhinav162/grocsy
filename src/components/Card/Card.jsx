import './Card.css'
import axiosInstance from '../../axios';
import { useEffect, useState, useCallback } from 'react';
import { toast, Toaster } from 'react-hot-toast';
import ProductForm from '../Product form/AddProductForm';
import AddToCart from '../AddToCart/AddToCart';

const Card = ({ id, name, desc, price, imageUrl, quantity, unit, category, showBtn }) => {
    return (
        <div className="product" id={id}>
            <div className='product-image'>
                <img src={imageUrl} alt={name} />
            </div>
            <div className='product-details'>
                <h3>{name}</h3>
                {price ? <p><span><b>{quantity}</b>{unit}</span> -- <span>&#8377;</span>{price}</p> : null}
            </div>
            {
                showBtn != false ? ( price ? <AddToCart productID={id}/> : <button>Read More</button> ) : null 
            }
        </div>
    );
}

export const Hcard = ({ id, name, desc, price, imageUrl, quantity, unit, category, fetchSellerProducts }) => {
    return (
        <div className="h-product" id={id}>
            <div className='h-product-image'>
                <img src={imageUrl} alt={name} />
            </div>
            <div className='product-details'>
                <h3>{name}</h3>
                <p>{desc}</p>
                <p>{quantity}{unit}</p>
                <p>{category}</p>
                <p><span>&#8377;</span>{price}</p>
            </div>
            <div>
                <button type="button" onClick={() => {
                    <ProductForm />
                }}>Edit</button>
                <button type="button" onClick={async () => {
                    try {
                        await axiosInstance().delete('/delete-product/' + id).then((res) => {
                            setTimeout(() => {
                                fetchSellerProducts();
                                toast.success(res.data.message, {
                                    position: "bottom-right",
                                    style: {
                                        borderRadius: '10px',
                                        background: '#333',
                                        color: '#fff',
                                    },
                                });
                            }, 1000);
                        });
                    }
                    catch (err) {
                        console.error(err);
                        toast.error(err.response.data.error || 'An error occurred. Please try again.')
                    }
                }}>Delete</button>
            </div>
            <Toaster />
        </div>
    );
}

export default Card;