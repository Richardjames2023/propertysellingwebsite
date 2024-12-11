
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSidebar } from '../components/UserLayout'; // import useSidebar hook
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import backgroundImage from '../assets/image/pexels-nextvoyage-3051551.jpg';
import './ProductPage2.css';

const ProductPage2 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [properties, setProperties] = useState([]); // Define state for products
  const [cartProductIds, setCartProductIds] = useState([]); // State for cart product IDs
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  const { isOpen } = useSidebar(); // access isOpen here
  const userId = JSON.parse(localStorage.getItem('userId'))?.id;

  useEffect(() => {
    // Fetch properties and cartProductIds from the backend
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/api/getAvailableProducts/${userId}`);
        console.log(response.data);
        setProperties(response.data.products); // Update to use products field
        setCartProductIds(response.data.cartProductIds); // Update to use cartProductIds field
      } catch (error) {
        setError('Error fetching properties');
        console.error('Error fetching properties:', error);
      }
    };

    fetchProperties();
  }, [userId]);

  const navigate = useNavigate();
  const handleAddToCart = (properties) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.pid === properties.pid);
      if (itemExists) {
        return prevItems.map((item) =>
          item.pid === properties.pid ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...properties, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleIncreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  return (
    <div className={`product-page-container flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
      <div
        className="relative h-80 flex items-center justify-center bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <h1 className="relative z-10 text-4xl font-bold typing-effect shadow-text">
          Get up to <span className="text-green-600">50%</span> off for Buying any Properties with us Today
        </h1>
      </div>

      <div className="mt-8">
        <ProductList
          properties={properties}
          cartProductIds={cartProductIds} // Pass cartProductIds as prop
          onAddToCart={handleAddToCart}
        />
      </div>

      {isCartOpen && (
        <CartModal
          cartItems={cartItems}
          onClose={closeCart}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
        />
      )}
    </div>
  );
};

export default ProductPage2;