import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const Register = () => {
    const [values, setValues] = useState({
        first_name:'',
        last_name: '',
        email: '',
        phone:'',
        location:'',
        password: ''
    })
    const [errors, setErrors] = useState({});
    const navigate = useNavigate()

    const handleChanges = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }
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
        if (!values.location) newErrors.location = 'Location is required';
        if (!values.password) newErrors.password = 'Password is required';
        else if (values.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // Returns true if no errors
    };
    const handleSumbit = async (e) => {
        e.preventDefault()
        if (!validate()) return; // Only submit if validation passes
        try {
            const response = await axios.post('http://localhost:4001/api/register', values)
            if(response.status === 201) {
                navigate('/login')
            }
        } catch(err) {
            console.log(err.message)
        }
    }
  return (
    <div className='flex justify-center items-center h-screen'>
        <div className='shadow-lg px-8 py-5 border w-[90%] md:w-[35%]'>
            <h2 className='text-lg font-bold mb-4'>Register</h2>
            <form onSubmit={handleSumbit}>
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="">
                        <label htmlFor="name" className='block text-gray-700'>First Name</label>
                        <input type="text" placeholder='Enter your first name' className='w-full px-3 py-2 border'
                        name="first_name" onChange={handleChanges}/>
                         {errors.first_name && <p className='text-red-500'>{errors.first_name}</p>}
                    </div>
                    <div className="">
                        <label htmlFor="email" className='block text-gray-700'>Last Name</label>
                        <input type="text" placeholder='Enter last Name' className='w-full px-3 py-2 border'
                        name="last_name" onChange={handleChanges}/>
                        {errors.last_name && <p className='text-red-500'>{errors.last_name}</p>}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between mb-4">
                    <div className="mb-4">
                        <label htmlFor="email" className='block text-gray-700'>Email</label>
                        <input type="email" placeholder='Enter Email' className='w-full px-3 py-2 border'
                        name="email" onChange={handleChanges}/>
                        {errors.email && <p className='text-red-500'>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone" className='block text-gray-700'>Phone Number</label>
                        <input type="number" placeholder='Enter Email' className='w-full px-3 py-2 border'
                        name="phone" onChange={handleChanges}/>
                        {errors.phone && <p className='text-red-500'>{errors.phone}</p>}
                    </div>
                </div>
                <div className="mb-4">
                    <label htmlFor="location" className='block text-gray-700'>Location</label>
                    <input type="text" placeholder='Enter Email' className='w-full px-3 py-2 border'
                    name="location" onChange={handleChanges}/>
                    {errors.location && <p className='text-red-500'>{errors.location}</p>}
                </div>
                <div className="mb-4">
                    <label htmlFor="password" className='block text-gray-700'>Password</label>
                    <input type="password" placeholder='Enter Password' className='w-full px-3 py-2 border'
                    name="password" onChange={handleChanges}/>
                    {errors.password && <p className='text-red-500'>{errors.password}</p>}
                </div>
                <button className="w-full bg-green-600 text-white py-2 ">Submit</button>
            </form>
            <div className="text-center">
                <span>Already have account?</span>
                <Link to='/login' className='text-blue-500'>Login</Link>
            </div>
        </div>
    </div>
  )
}

export default Register