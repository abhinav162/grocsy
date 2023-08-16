import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../axios';
import { toast, Toaster } from 'react-hot-toast';
import { Hcard } from '../../components/Card/Card';
import './SellerDashboard.css';
import axios from 'axios';

const SellerDashboard = () => {
    const [category, setCategory] = useState('general');
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('g');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);
    const [publicId, setPublicId] = useState('');

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

    useEffect(() => {
        fetchSellerProducts();
    }, []);
    console.log(products);

    const sendToBackend = async () => {
        // e.preventDefault();
        const sbFormData = new FormData();
        sbFormData.append('category', category);
        sbFormData.append('name', name);
        sbFormData.append('price', price);
        sbFormData.append('quantity', quantity);
        sbFormData.append('unit', unit);
        sbFormData.append('description', description);
        sbFormData.append('imageUrl', imageUrl);
        sbFormData.append('publicId', publicId);

        // this is to convert FormData object to JSON object so that we can display the image in the card without having to refresh the page
        const productObj = {}
        sbFormData.forEach((value, key) => {
            productObj[key] = value
        })
        console.log(imageUrl)
        productObj.imageUrl = imageUrl;
        try {
            await axiosInstance().post('/add-product', sbFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((res) => {
                setTimeout(() => {
                    setProducts([...products, productObj]);
                }, 1000);
                toast.success(res.data.message, {
                    position: "bottom-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    },
                });

                // Reset form fields
                setName('');
                setPrice('');
                setDescription('');
                setQuantity('');
                setUnit('');
                setImageUrl(null);
            }).catch((err) => {
                toast.error("Error", {
                    position: "bottom-right",
                    style: {
                        borderRadius: '10px',
                        background: '#333',
                        color: '#fff',
                    }
                });
            });

        } catch (error) {
            console.error(error);
            toast.error(error.response.data.error);
        }
    }

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();

        const cloudinaryData = new FormData();
        cloudinaryData.append('file', image);
        cloudinaryData.append('upload_preset', 'grocsy');

        const AxiosInst = axios.create();
        await AxiosInst.post('https://api.cloudinary.com/v1_    1/grocsy-uploads/image/upload', cloudinaryData).then((res) => {
            setImageUrl(res.data.secure_url);
            setPublicId(res.data.public_id);
        }).catch((err) => {
            console.error(err);
        })
    };

    useEffect(() => {
        if (imageUrl) {
            sendToBackend();
        }
    }, [imageUrl])

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
                    document.getElementsByClassName('add-product-modal')[0].style.display = 'block';
                }}>Add Product</button>
            </div>

            {/* Option to add new product */}
            <div className='add-product-modal' onClick={(e) => {
                if (e.target.classList.contains('add-product-modal')) {
                    document.getElementsByClassName('add-product-modal')[0].style.display = 'none';
                }
            }}>
                <div className='add-product-content'>
                    <div className='modal-header'>
                        <h2>Add/Update Product:</h2>
                        <button className='close-modal-btn' onClick={() => {
                            document.getElementsByClassName('add-product-modal')[0].style.display = 'none';
                        }}>X</button>
                    </div>
                    <form className='add-product-form' onSubmit={handleAddOrUpdateProduct}>
                        <div>
                            <label htmlFor="category">Product category:</label>
                            <select name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="general">General</option>
                                <option value="fruits">Fruits</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="dairy">Dairy</option>
                                <option value="soft-drinks">Soft Drinks</option>
                                <option value="meat">Meat</option>
                                <option value="seafood">Seafood</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="name">Product Name:</label>
                            <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="price">Price:</label>
                            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required min={1} />
                        </div>
                        <div>
                            <label htmlFor="quantity">Quantity | Unit:</label>
                            <span className='quantity-unit-container'>
                                <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required min={1} />

                                <select name="unit" id="unit" value={unit} onChange={(e) => setUnit(e.target.value)}>
                                    <option value="g">g</option>
                                    <option value="kg">kg</option>
                                    <option value="ml">ml</option>
                                    <option value="l">l</option>
                                </select>
                            </span>
                        </div>
                        <div>
                            <label htmlFor="description">Description:</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                        </div>
                        <div>
                            <label htmlFor="image">Image:</label>
                            <input type="file" name='grocsy-product-images' id="image" onChange={(e) => setImage(e.target.files[0])} required />
                        </div>
                        <button type="submit">Add Product</button>
                    </form>
                </div>
            </div>
            <Toaster />
        </div>
    );
};

export default SellerDashboard;
