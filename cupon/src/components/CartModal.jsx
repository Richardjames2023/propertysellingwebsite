
// CartModal.js
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuid for unique coupon code generation

const CartModal = ({ cartItems, onClose, onIncrease, onDecrease }) => {
  const navigate = useNavigate();

  // Function to calculate total price considering discounts
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const discountAmount = item.discount ? (itemTotal * item.discount) / 100 : 0;
      return total + (itemTotal - discountAmount);
    }, 0);
  };

  // Function to handle adding cart to database
  // const handleAddToCartAndSave = async () => {
  //   // Retrieve user info from local storage
  //   const userInfo = JSON.parse(localStorage.getItem('userId')); // Assuming user info is stored as 'userInfo' in local storage
  //   if (!userInfo) {
  //     console.error('User not logged in or user information not found in local storage.');
  //     return;
  //   }

  //   // Generate a unique coupon code
  //   const couponCode = uuidv4();

  //   // Prepare data for backend
  //   const cartData = {
  //     userId: userInfo.userId, // assuming userId is stored in local storage
  //     couponCode,
  //     cartItems: cartItems.map(item => ({
  //       id: item.id,
  //       name: item.name,
  //       price: item.price,
  //       quantity: item.quantity,
  //       discount: item.discount || 0,
  //     })),
  //     total: calculateTotalPrice(),
  //   };

  //   try {
  //     // Send data to the backend
  //     await axios.post('http://localhost:4001/api/getCart', cartData); // Adjust the endpoint as needed
  //     console.log('Cart saved successfully:', cartData);

  //     // Navigate to cart page after successful save
  //     navigate('/cart');
  //   } catch (error) {
  //     console.error('Error saving cart to the database:', error);
  //   }
  // };
  const handleAddToCartAndSave = async () => {
    // Retrieve user info from local storage
    const userInfo = JSON.parse(localStorage.getItem('userId'));
    if (!userInfo) {
      console.error('User not logged in or user information not found in local storage.');
      return;
    }
  
    // Generate a unique coupon code
    const couponCode = uuidv4();
  
    // Prepare data for backend with Cart model structure
    const cartData = cartItems.map(item => ({
      userId: userInfo.id,               // Retrieve `userId` from local storage
      propertyId: item.pid,             // `propertyId` corresponds to the `pid` in your Property model
      couponCode,                      // Unique code generated for each cart session
      quantity_purchased: item.quantity,
      discount_percentage: item.discount || 0, // Set discount if available
      payment_status: 'pending',       // Default payment status
    }));
  
    try {
      // Send each item to the backend
      await Promise.all(
        cartData.map(async (data) => {
          await axios.post('http://localhost:4001/api/getCart', data, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
        })
      );
  
      console.log('Cart saved successfully:', cartData);
  
      // Redirect to user dashboard after successful save
      navigate('/dashboard'); // Adjust this path to your user dashboard route
    } catch (error) {
      console.error('Error saving cart to the database:', error);
    }
  };

  return (
    <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-4 z-50 overflow-y-auto border-2 border-gray-300">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-green-700">Your Cart</h2>
        <button onClick={onClose} className="text-red-500">
          <AiOutlineClose size={24} />
        </button>
      </div>

      {/* Cart items */}
      {cartItems.length > 0 ? (
        cartItems.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-green-700">₦ {Number(item.price).toFixed(2)}</p>
              {item.discount && (
                <p className="text-sm text-gray-500">
                  Discount: {item.discount}%
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <button onClick={() => onDecrease(item.id)} className="px-2">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => onIncrease(item.id)} className="px-2">+</button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      )}

      {/* Total Price and Save Cart Button */}
      <div className="border-t mt-4 pt-2 text-lg font-bold">
        Total: ₦ {calculateTotalPrice().toFixed(2)}
      </div>
      <button
        onClick={handleAddToCartAndSave}
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartModal;