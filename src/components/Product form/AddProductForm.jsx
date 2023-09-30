import "./AddProductForm.css";
import { useState } from "react";
import axiosInstance from "../../axios";
import { toast, Toaster } from 'react-hot-toast';


const ProductForm = ({toFetch, setToFetch }) => {
    const [category, setCategory] = useState('general');
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [quantity, setQuantity] = useState('');
    const [unit, setUnit] = useState('g');
    const [description, setDescription] = useState('');
    const [imageFile, setImageFile] = useState(null);

    // sendToBackend function
    const sendToBackend = async (e) => {
        e.preventDefault();
        const sbFormData = new FormData();
        sbFormData.append('category', category);
        sbFormData.append('name', name);
        sbFormData.append('price', price);
        sbFormData.append('quantity', quantity);
        sbFormData.append('unit', unit);
        sbFormData.append('description', description);
        sbFormData.append('file', imageFile);

        try {
            await axiosInstance().post('/add-product', sbFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            }).then((res) => {
                // fetchSellerProducts();
                setToFetch(!toFetch)
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

    return (
        <>
            <div className='add-product-content'>
                <div className='modal-header'>
                    <h2>Add/Update Product:</h2>
                    <button className='close-modal-btn' onClick={() => {
                        document.getElementsByClassName('add-product-modal')[0].style.display = 'none';
                    }}>X</button>
                </div>
                <form className='add-product-form' onSubmit={sendToBackend}>
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
                        <input type="file" name='image' id="image" onChange={(e) => setImageFile(e.target.files[0])} required />
                    </div>
                    <button type="submit">Add Product</button>
                </form>
            </div>
            <Toaster />
        </>
    )
}

export default ProductForm;