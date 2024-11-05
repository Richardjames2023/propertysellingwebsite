// ProductPage2.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
// import ProductList from '../components/ProductList';
// import CartModal from '../components/CartModal';
// import backgroundImage from '../assets/pexels-nextvoyage-3051551.jpg';
// import './ProductPage2.css'

// const ProductPage2 = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   const navigate = useNavigate()
//   const fetchUser = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await axios.get('http://localhost:4001/api/mainpage', {
//         headers: { "Authorization": `Bearer ${token}` }
//       });
//       if (response.status === 200) {
//         // Optionally set user data
//       }
//     } catch (err) {
//       console.error(err);
//       navigate('/login');
//     }
//   };

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   const handleAddToCart = (product) => {
//     setCartItems((prevItems) => {
//       const itemExists = prevItems.find((item) => item.id === product.id);
//       if (itemExists) {
//         return prevItems.map((item) =>
//           item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//         );
//       }
//       return [...prevItems, { ...product, quantity: 1 }];
//     });
//     setIsCartOpen(true);
//   };

//   const handleIncreaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id ? { ...item, quantity: item.quantity + 1 } : item
//       )
//     );
//   };

//   const handleDecreaseQuantity = (id) => {
//     setCartItems((prevItems) =>
//       prevItems.map((item) =>
//         item.id === id && item.quantity > 1
//           ? { ...item, quantity: item.quantity - 1 }
//           : item
//       )
//     );
//   };

//   const closeCart = () => {
//     setIsCartOpen(false);
//   };

//   return (
//     <div className="product-page-container">
//       <div
//         className="relative h-80 flex items-center justify-center bg-cover bg-center text-white"
//         style={{ backgroundImage: `url(${backgroundImage})` }}
//       >
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <h1 className="relative z-10 text-4xl font-bold typing-effect shadow-text">
//           Get up to <span className="text-green-600">50%</span> off for Buying any Properties with us Today
//         </h1>
//       </div>

//       <div className="mt-8">
//         <ProductList onAddToCart={handleAddToCart} />
//       </div>

//       {isCartOpen && (
//         <CartModal
//           cartItems={cartItems}
//           onClose={closeCart}
//           onIncrease={handleIncreaseQuantity}
//           onDecrease={handleDecreaseQuantity}
//         />
//       )}
//     </div>
//   );
// };

// export default ProductPage2;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';
import CartModal from '../components/CartModal';
import backgroundImage from '../assets/pexels-nextvoyage-3051551.jpg';
import './ProductPage2.css';

const ProductPage2 = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [products, setProducts] = useState([]); // Define state for products
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      return navigate('/login');
    }

    try {
      const response = await axios.get('http://localhost:4001/api/mainpage', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.status === 200) {
        setUser(response.data.user);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      navigate('/login');
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (!user) {
    return <div>Loading...</div>;
  }

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((item) => item.id === product.id);
      if (itemExists) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
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
    <div className="product-page-container">
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
        <ProductList products={products} onAddToCart={handleAddToCart} /> {/* Pass products as props */}
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