import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';

const Login = () => {
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4001/api/auth/login', values);
            const { accessToken, refreshToken, user, redirectUrl } = response.data;
            console.log('Response data:', response.data);
            if (!accessToken || !user.id) throw new Error('Authentication failed');

            // Save tokens and user ID in local storage
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', JSON.stringify(user));

            // Redirect based on the user's role URL
            navigate(redirectUrl || '/dashboard');
        } catch (error) {
            console.error('Login failed:', error.response?.data?.message);
        }
    };

    // Function to get a new access token if expired
    const refreshAccessToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        if (!refreshToken) throw new Error('No refresh token available');

        const response = await axios.post('http://localhost:4001/api/auth/refresh-token', { token: refreshToken });
        localStorage.setItem('accessToken', response.data.accessToken);
    };

    // Axios interceptor to automatically refresh token
    axios.interceptors.response.use(
        (response) => response,
        async (error) => {
            if (error.response.status === 401 && !error.config._retry) {
                error.config._retry = true;
                await refreshAccessToken();
                error.config.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
                return axios(error.config);
            }
            return Promise.reject(error);
        }
    );

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    return (
        <div className='shadow-lg px-8 py-5 border w-[30%] bg-white text-black'>
            <h2 className='text-lg font-bold mb-4'>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="email" className='block text-gray-700'>Email</label>
                    <input
                        type="email"
                        placeholder='Enter Email'
                        className='w-full px-3 py-2 border'
                        name="email"
                        onChange={handleChanges}
                    />
                </div>
                <div className="mb-4 relative">
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='Enter Password'
                        className='w-full px-3 py-2 border pr-10'
                        name="password"
                        onChange={handleChanges}
                    />
                    <span
                        onClick={togglePasswordVisibility}
                        className='absolute right-3 top-10 transform -translate-y-1/2 cursor-pointer text-gray-500'
                    >
                        {showPassword ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </span>
                </div>
                <button className="w-full bg-green-600 text-white py-2">Submit</button>
            </form>
            <div className="text-center">
                <span>Don't Have Account?</span>
                <Link to='/register' className='text-blue-500'>Signup</Link>
            </div>
        </div>
    );
};

export default Login;