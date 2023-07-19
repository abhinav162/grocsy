import React, { useState, useEffect } from 'react';
import axiosInstance from '../../axios';

const SellerDashboard = () => {
    const [products, setProducts] = useState([]);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    // Fetch seller's products from the server when the component mounts
    useEffect(() => {
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

        fetchSellerProducts();
    }, []);

    const handleAddOrUpdateProduct = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        console.log(formData)
        formData.append('name', name);
        formData.append('price', price);
        formData.append('description', description);
        formData.append('image', image);
        console.log(formData)

        try {
            // Replace 'YOUR_ADD_OR_UPDATE_PRODUCT_API_ENDPOINT' with the actual API endpoint for adding or updating a product
            await axiosInstance().post('/add-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            // Fetch seller's products again after adding or updating a product
            // const updatedProducts = await axiosInstance().get('/add-product', {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem('token')}`,
            //     },
            // });

            // setProducts(updatedProducts.data.products);
            setProducts(...products, formData)

            // Reset form fields
            setName('');
            setPrice('');
            setDescription('');
            setImage(null);

            alert('Product added/updated successfully');
        } catch (error) {
            console.error(error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div>
            <h2>Seller Dashboard</h2>
            <div>
                <h3>Your Products:</h3>
                {products.length > 0 ? (
                    <ul>
                        {products.map((product) => (
                            <li key={product._id}>
                                <h4>{product.name}</h4>
                                <p>Price: ${product.price}</p>
                                <p>Description: {product.description}</p>
                                {product.imageUrl && <img src={`http://localhost:3000/${product.imageUrl}`} alt={product.name} />}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No products listed yet</p>
                )}
            </div>
            <div>
                <h3>Add/Update Product:</h3>
                <form onSubmit={handleAddOrUpdateProduct}>
                    <div>
                        <label htmlFor="name">Product Name:</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="price">Price:</label>
                        <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="description">Description:</label>
                        <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
                    </div>
                    <div>
                        <label htmlFor="image">Image:</label>
                        <input type="file" id="image" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default SellerDashboard;
