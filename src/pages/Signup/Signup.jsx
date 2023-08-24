import React, { useState } from 'react';
import axiosInstance from '../../axios'; // Import the custom Axios instance
import { Toaster, toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setUserType] = useState('buyer');

    const handleSignup = async (e) => {
        e.preventDefault();

        axiosInstance().post('/register', { name, email, password, userType }).then((res) => {
            toast.success("Registered Successfully!", {
                position: "bottom-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            setTimeout(() => {
                setName("");
                setEmail("");
                setPassword("");
                setUserType("buyer");
                navigate('/login');
            }, 1000);
        }).catch((err) => {
            toast.error(err.data.message)
        })
    };

    return (
        <div>
            <form onSubmit={handleSignup} className='register-form'>
                <h2>Signup</h2>
                <div>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' placeholder='Enter Name' value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder='Create your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Create account as:</label>
                    <select value={userType} onChange={(e) => setUserType(e.target.value)}>
                        <option value="buyer">Buyer</option>
                        <option value="seller">Seller</option>
                    </select>
                </div>
                <button type="submit">Signup</button>
                <p>Already have an account? <a href="/login">Login</a></p>
            </form>

            <Toaster />
        </div>
    );
};

export default Signup;