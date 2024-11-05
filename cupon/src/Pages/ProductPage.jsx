// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ProductCard from '../components/ProductCard'; // Import your product card component
// import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
// import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon from react-icons
// import { useCart } from '../context/CartContext'; // Import the cart context

// const ProductsPage = () => {
//   const [products, setProducts] = useState([]);
//   const { state } = useLocation();
//   const { location } = state; // Get location from the state
//   const navigate = useNavigate(); // Initialize useNavigate hook
//   const { cartItems } = useCart(); // Get cartItems from CartContext

//   // Calculate total quantity of items in the cart
//   const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

//   useEffect(() => {
//     // Fetch products based on location
//     const fetchProducts = async () => {
//       try {
//         const response = await axios.get(`http://localhost:3000/products?location=${location}`);
//         setProducts(response.data);
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     fetchProducts();
//   }, [location]);

//   const handleDiscountClick = () => {
//     // Navigate to the CouponGrid component when the button is clicked
//     navigate('/coupons'); // Adjust the route path according to your app's routing
//   };

//   return (
//     <div className="min-h-screen p-6">
//       <h2 className="text-2xl font-bold mb-6">Products available in {location}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
//         {products.map((product) => (
//           <ProductCard key={product.id} product={product} />
//         ))}
//       </div>

//       {/* Discount button with absolute floating cart button */}
//       <div className="relative flex justify-center mt-6"> {/* Relative container */}
//         <button 
//           className="bg-green-500 text-white py-2 px-6 rounded shadow-md hover:bg-green-600"
//           onClick={handleDiscountClick} // Handle button click to route to CouponGrid
//         >
//           Get a discount for your selected products
//         </button>

//         {/* Floating Cart Button - Centered at top-right corner */}
//         <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2"> {/* Adjusted positioning */}
//           <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
//             <FaShoppingCart size={20} /> {/* Cart Icon */}
            
//             {/* Display total quantity in a small circular container */}
//             {totalCartQuantity > 0 && (
//               <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                 {totalCartQuantity}
//               </span>
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProductsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard'; // Import your product card component
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FaShoppingCart } from 'react-icons/fa'; // Import the cart icon from react-icons
import { useCart } from '../context/CartContext'; // Import the cart context

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const { state } = useLocation();
  const { location } = state; // Get location from the state
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { cartItems, addItemToCart } = useCart(); // Get cartItems and addItemToCart from CartContext

  // Calculate total quantity of items in the cart
  const totalCartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    // Fetch products based on location
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:4001/products?location=${location}`);
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [location]);

  const addToCart = (product) => {
    // Add selected product to local storage
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = storedCart.findIndex((item) => item.id === product.id);

    // Check if product already exists in cart, if so, increase the quantity
    if (existingProductIndex !== -1) {
      storedCart[existingProductIndex].quantity += 1;
    } else {
      storedCart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(storedCart));
    addItemToCart({ ...product, quantity: 1 }); // Optionally add to global context as well

    // Save product details in local storage for discounts
    const productDetails = {
      name: product.title,
      image: product.image,
      pricePerUnit: product.price,
      quantityPerUnit: 1 // You can adjust this based on how you're managing quantities
    };

    localStorage.setItem('selectedProductDetails', JSON.stringify(productDetails));
  };

  const handleDiscountClick = () => {
    const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    // Save the selected products to localStorage (already handled in addToCart, but ensuring here)
    localStorage.setItem('selectedProducts', JSON.stringify(storedCart));

    // Navigate to the CouponGrid component when the button is clicked
    navigate('/coupons'); // Adjust the route path according to your app's routing
  };

  return (
    <div className="min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-6">Products available in {location}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} addToCart={addToCart} />
        ))}
      </div>

      {/* Discount button with absolute floating cart button */}
      <div className="relative flex justify-center mt-6">
        <button 
          className="bg-green-500 text-white py-2 px-6 rounded shadow-md hover:bg-green-600"
          onClick={handleDiscountClick} // Handle button click to route to CouponGrid
        >
          Get a discount for your selected products
        </button>

        {/* Floating Cart Button */}
        <div className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2">
          <button className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600">
            <FaShoppingCart size={20} /> {/* Cart Icon */}
            
            {/* Display total quantity in a small circular container */}
            {totalCartQuantity > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {totalCartQuantity}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;