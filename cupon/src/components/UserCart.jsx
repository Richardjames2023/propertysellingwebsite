
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSidebar } from '../components/UserLayout'; // import useSidebar hook
import { useNavigate } from 'react-router-dom';
import { FaPrint } from 'react-icons/fa'; // Print icon from react-icons
import Navbar from '../components/AdminComponents/Navbar'

const UserCart = () => {
    const { isOpen } = useSidebar(); // access isOpen here
  const [cartItems, setCartItems] = useState([]);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem('userId')); // Retrieve userId from local storage

// Make sure to access the correct property if userId is an object
const actualUserId = userId?.id || userId;


  // Fetch cart items for the user
  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:4001/api/getUserCartItems/${actualUserId}`)
        .then(response => {
          setCartItems(response.data.cartItems);
        })
        .catch(error => {
          console.error('Error fetching cart items:', error);
        });
    } else {
      console.error('User not logged in');
    }
  }, [userId]);

  // Function to open the modal
  const handlePrint = (item) => {
    setSelectedCartItem(item);
    setShowModal(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedCartItem(null);
  };

  // Redirect if user is not logged in
  if (!userId) {
    navigate('/login');
    return null;
  }

  return (
    <div className={`product-page-container flex-1 p-6 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        {/* <Navbar/> */}
    {/* <div className="container mx-auto p-4"> */}
      <h1 className="text-2xl font-bold mb-4 text-center">Your Cart</h1>
      
      {/* Check if there are cart items */}
      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="border p-4 rounded-lg shadow-lg relative transition-transform transform duration-300 ease-out hover:scale-105">
              <img
                src={item.Property.imageUrl}
                alt={item.Property.name}
                className="w-full h-40 object-cover mb-4 rounded"
              />
              <h2 className="text-xl font-semibold">{item.Property.name}</h2>
              <p className="text-gray-700">Location: {item.Property.location}</p>
              <p className="text-gray-700">Quantity: {item.quantity_purchased}</p>
              <p className="text-gray-700">Price: ₦{Number(item.Property.price).toFixed(2)}</p>
              {item.discount_percentage > 0 && (
                <p className="text-green-600">Discount: {item.discount_percentage}%</p>
              )}
              <p className="text-lg font-bold mt-2">
                Total: ₦{(item.Property.price * item.quantity_purchased * (1 - item.discount_percentage / 100)).toFixed(2)}
              </p>
              <p className="text-gray-700">Coupon Code: {item.couponCode}</p>
              <p className={`text-sm ${item.payment_status === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                Payment Status: {item.payment_status}
              </p>

              {/* Print icon with tooltip */}
              <div className="tooltip-container absolute top-2 right-2 text-2xl text-gray-600 cursor-pointer hover:text-gray-800 transition-colors" onClick={() => handlePrint(item)}>
                <FaPrint />
                <span className="tooltip-text text-sm text-white bg-gray-800 rounded p-1 absolute -top-6 right-0">Click to Print</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">Your cart is empty.</p>
      )}

      {/* Modal for printing or sending details */}
      {showModal && selectedCartItem && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative transition-transform duration-300">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-2xl text-gray-600 hover:text-gray-800 transition-colors print-hidden"
            >
              X
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Product Details</h2>
            
            {/* Product Information */}
            <img src={selectedCartItem.Property.imageUrl} alt={selectedCartItem.Property.name} className="w-full h-40 object-cover mb-4 rounded" />
            <p><strong>Name:</strong> {selectedCartItem.Property.name}</p>
            <p><strong>Location:</strong> {selectedCartItem.Property.location}</p>
            <p><strong>Quantity:</strong> {selectedCartItem.quantity_purchased}</p>
            <p><strong>Price:</strong> ₦{Number(selectedCartItem.Property.price).toFixed(2)}</p>
            {selectedCartItem.discount_percentage > 0 && (
              <p><strong>Discount:</strong> {selectedCartItem.discount_percentage}%</p>
            )}
            <p><strong>Total:</strong> ₦{(selectedCartItem.Property.price * selectedCartItem.quantity_purchased * (1 - selectedCartItem.discount_percentage / 100)).toFixed(2)}</p>
            <p><strong>Coupon Code:</strong> {selectedCartItem.couponCode}</p>
            <p className="mb-4"><strong>Payment Status:</strong> {selectedCartItem.payment_status}</p>

            {/* Actions */}
            <div className="flex justify-center gap-4 print-hidden">
              <button
                onClick={() => window.print()} // Temporary for print
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Print
              </button>
              <button
                onClick={() => alert("Email sent!")} // Replace with email function
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
              >
                Send to Email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserCart;