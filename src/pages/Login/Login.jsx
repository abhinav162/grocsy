import React, { useState } from 'react';
import axiosInstance from '../../axios'; // Import the custom Axios instance
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const LoginPage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        axiosInstance().post('/login', { email, password }).then((res) => {
            const token = res.data.token;
            const name = res.data.user.name;
            localStorage.setItem("token", token);
            localStorage.setItem("name", name);
            localStorage.setItem("userType", res.data.user.userType);
            localStorage.setItem("userId", res.data.user._id);

            toast.success("Login successful!", {
                position: "bottom-right",
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            setTimeout(() => {
                setEmail("");
                setPassword("");
                navigate('/');
                window.location.reload();
            }, 1000);
        }).catch((err) => {
            console.log(err);
            alert('Login failed. Please check your email and password.');
        })
    };

    return (
        <div>
            <form onSubmit={handleLogin} className='login-form'>
                <h2>Login</h2>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
                <p>Dont have an account? <a href="/signup">Register</a></p>
            </form>
            <Toaster />
        </div>
    );
};

export default LoginPage;
