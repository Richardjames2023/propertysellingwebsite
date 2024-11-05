import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Hero Carousel Component
const HeroCarousel = ({ images, interval = 5000 }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, interval);

    return () => clearInterval(slideInterval);
  }, [images.length, interval]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {images.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-[2000ms] ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
      ))}
    </div>
  );
};

// User Registration/Login Component
const UserRegistrationLogin = () => {
  const [isRegistering, setIsRegistering] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!username) newErrors.username = 'Username is required';
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password should be at least 6 characters long';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Enter a valid email';
    }
    const phoneRegex = /^\d{10,15}$/;
    if (!phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(phone)) {
      newErrors.phone = 'Enter a valid phone number (10-15 digits)';
    }
    if (isRegistering && !location) newErrors.location = 'Location is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const endpoint = isRegistering ? '/api/register' : '/api/login';
    try {
      const response = await axios.post(endpoint, {
        username,
        password,
        email,
        phone,
        ...(isRegistering && { location })
      });
      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        navigate('/products');
      } else {
        console.error('Login/Register failed:', response.data.message);
      }
    } catch (error) {
      console.error('Error with form submission:', error);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-lg shadow-lg w-80 z-10">
      <h2 className="text-center text-2xl font-bold mb-4">
        {isRegistering ? 'Register' : 'Login'}
      </h2>
      <form onSubmit={handleFormSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="input-field p-2 border rounded"
        />
        {errors.username && <p className="text-red-500 text-xs">{errors.username}</p>}

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="input-field p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}

        {isRegistering && (
          <>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field p-2 border rounded"
            />
            {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}

            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              className="input-field p-2 border rounded"
            />
            {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}

            <input
              type="text"
              placeholder="Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
              className="input-field p-2 border rounded"
            />
            {errors.location && <p className="text-red-500 text-xs">{errors.location}</p>}
          </>
        )}

        <button type="submit" className="btn bg-blue-500 text-white p-2 rounded">
          {isRegistering ? 'Register' : 'Login'}
        </button>
      </form>

      <button
        onClick={() => setIsRegistering(!isRegistering)}
        className="text-center text-sm text-blue-500 mt-4"
      >
        {isRegistering ? 'Already have an account? Login' : 'New user? Register here'}
      </button>
    </div>
  );
};

// Combined Component
const CombinedPage = () => {
  const images = [
    'pexels-stuthnagyniki-1694360.jpg',
    'pexels-binyaminmellish-1396132.jpg',
    'pexels-michaelgaultphotos-6422928.jpg',
    'pexels-nextvoyage-3051551.jpg',
  ];

  return (
    <div className="relative">
      <HeroCarousel images={images} />
      <UserRegistrationLogin />
    </div>
  );
};

export default CombinedPage;