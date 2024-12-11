
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [values, setValues] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        password: '',
    });
    
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChanges = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!values.first_name) newErrors.first_name = 'First name is required';
        if (!values.last_name) newErrors.last_name = 'Last name is required';
        if (!values.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            newErrors.email = 'Email is invalid';
        }
        if (!values.phone) newErrors.phone = 'Phone number is required';
        if (!values.password) {
            newErrors.password = 'Password is required';
        } else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };

    const handleSumbit = async (e) => {
        e.preventDefault();
        if (!validate()) return; // Only submit if validation passes
    
        try {
            const response = await axios.post('http://localhost:4001/api/auth/register', values);
            console.log("Registration Successful:", response.data);
            
            if (response.status === 201) {
                //const { refreshToken, newUser } = response.data;
                const { accessToken, refreshToken, user } = response.data;
                
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('userId', user.id);
    
                // Redirect to login page or a secure area as needed
                navigate('/dashboard');
            }
        } catch (error) {
            if(error.response && error.response.status === 400){
                setPopupMessage("this email already exist"); //backend response message (error.response.data.mesasage)
                setShowPopup(true);
            }else{
                console.error("Error in registerUser:", error); // console.error or handle any other error
            }
        }
    };

    const handlePopupClose = () => {
        setShowPopup(false);
        setTimeout(() => navigate('/login'), 300); // Delay to allow transition to complete
    };

    return (
        <div className='flex justify-center items-center bg-white text-black'>
            <div className='shadow-lg px-8 py-5 border'>
                <h2 className='text-lg font-bold mb-4'>Register</h2>
                <form onSubmit={handleSumbit}>
                    <div className="mb-4">
                        <label htmlFor="first_name" className='block text-gray-700'>First Name</label>
                        <input type="text" id="first_name" name="first_name" placeholder='Enter your first name' className='w-full px-3 py-2 border'
                        onChange={handleChanges}/>
                        {errors.first_name && <p className='text-red-500'>{errors.first_name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="last_name" className='block text-gray-700'>Last Name</label>
                        <input type="text" id="last_name" name="last_name" placeholder='Enter last Name' className='w-full px-3 py-2 border'
                        onChange={handleChanges}/>
                        {errors.last_name && <p className='text-red-500'>{errors.last_name}</p>}
                    </div>
                
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input type="email" id="email" name="email" placeholder='Enter Email' className='w-full px-3 py-2 border'
                        onChange={handleChanges}/>
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className='block text-gray-700'>Phone Number</label>
                        <input type="tel" id="phone" name="phone" placeholder='Enter Phone Number' className='w-full px-3 py-2 border'
                        onChange={handleChanges}/>
                        {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className='block text-gray-700'>Password</label>
                        <input type="password" id="password" name="password" placeholder='Enter Password' className='w-full px-3 py-2 border'
                        onChange={handleChanges}/>
                        {errors.password && <p className='text-red-500'>{errors.password}</p>}
                    </div>
                    <button type="submit" className="w-full bg-green-600 text-white py-2 ">Submit</button>
                </form>

          {/* Popup with smooth transition */}
          {showPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center transform transition-all duration-300 scale-100 opacity-100">
                        <h2 className="text-lg font-semibold mb-4">Registration Error</h2>
                        <p className="text-gray-700 mb-4">{popupMessage}</p>
                        <button
                            onClick={handlePopupClose}
                            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none"
                        >
                            Go to Login
                        </button>
                    </div>
                </div>
            )}

                <div className="text-center">
                    <span>Already have an account?</span>
                    <Link to='/login' className='text-blue-500'>Login</Link>
                </div>
            </div>
        </div>
    );
};

export default Register;