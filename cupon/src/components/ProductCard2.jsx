
// import React, { useState } from 'react';
// import DiscountCards from './DiscountCards'; // Import DiscountCards component (explained below)

// const ProductCard2 = ({ property, cartProductIds, onAddToCart }) => {
//   const isInCart = cartProductIds.includes(property.pid);
  
//   const [quantity, setQuantity] = useState(1);
//   const [showDiscountCards, setShowDiscountCards] = useState(false); // Track if discount cards are shown

//   const handleAddToCart = () => {
//     setShowDiscountCards(true); // Show discount cards after adding to cart
//   };

//   const handleDiscountSelection = (discount) => {
//     setShowDiscountCards(false); // Hide discount cards after selection
//     onAddToCart({ ...property, quantity, discount }); // Pass discount info along with product details
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden ">
//       <diV className="transition-transform transform duration-300 ease-out hover:scale-105">
//       <div
//         className="product-image h-56 bg-cover bg-center"
//         style={{ backgroundImage: `url(${property.imageUrl})` }}
//       ></div>
//       </diV>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{property.name}</h3>
//         <p className="text-sm text-gray-600">{property.description}</p>
//         <p className="text-xl font-semibold my-2">
//           <span className="text-2xl font-bold text-green-600">₦ </span>
//           {property.price}
//         </p>

//         <div className="flex items-center space-x-2 my-4">
//           <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">-</button>
//           <span className="text-lg font-semibold">{quantity}</span>
//           <button onClick={() => setQuantity(prev => prev + 1)} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">+</button>
//         </div>

//         <button
//           disabled={isInCart}
//           onClick={handleAddToCart}
//           className={`w-[100%] text-white px-4 py-2 rounded transition-colors ${
//             isInCart ? 'bg-red-500 hover:bg-red-600 cursor-not-allowed' : 'bg-green-500 hover:bg-green-700'
//           }`}
//         >
//           {isInCart ? 'Already in Cart' : 'Add to Cart'}
//         </button>
//       </div>

//       {showDiscountCards && <DiscountCards onSelect={handleDiscountSelection} />}
//     </div>
//   );
// };

// export default ProductCard2;

import React, { useState } from 'react';
//import { FaTimes } from 'react-icons/fa'; // Import close icon
import { AiOutlineClose } from 'react-icons/ai';
import DiscountCards from './DiscountCards'; // Import DiscountCards component

const ProductCard2 = ({ property, cartProductIds, onAddToCart }) => {
  const isInCart = cartProductIds.includes(property.pid);

  const [quantity, setQuantity] = useState(1);
  const [showDiscountCards, setShowDiscountCards] = useState(false); // Track if discount cards are shown

  const handleAddToCart = () => {
    setShowDiscountCards(true); // Show discount cards after adding to cart
  };

  const handleDiscountSelection = (discount) => {
    setShowDiscountCards(false); // Hide discount cards after selection
    onAddToCart({ ...property, quantity, discount }); // Pass discount info along with product details
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="transition-transform transform duration-300 ease-out hover:scale-105">
        <div
          className="product-image h-56 bg-cover bg-center"
          style={{ backgroundImage: `url(${property.imageUrl})` }}
        ></div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{property.name}</h3>
        <p className="text-sm text-gray-600">{property.description}</p>
        <p className="text-xl font-semibold my-2">
          <span className="text-2xl font-bold text-green-600">₦ </span>
          {property.price}
        </p>

        <div className="flex items-center space-x-2 my-4">
          {/* Decrease Quantity */}
          <button
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            -
          </button>
          <span className="text-lg font-semibold">{quantity}</span>

          {/* Increase Quantity */}
          <button
            onClick={() =>
              setQuantity((prev) => Math.min(property.quantity, prev + 1))
            }
            className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          disabled={isInCart}
          onClick={handleAddToCart}
          className={`w-[100%] text-white px-4 py-2 rounded transition-colors ${
            isInCart
              ? 'bg-red-500 hover:bg-red-600 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-700'
          }`}
        >
          {isInCart ? 'Already in Cart' : 'Add to Cart'}
        </button>
      </div>

      {showDiscountCards && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-4 relative w-[90%] max-w-md">
            {/* Close Button */}
            <button
              onClick={() => setShowDiscountCards(false)}
              className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
              style={{
                zIndex: 10, // Ensure it is above other modal elements
              }}
            >
              {/* <FaTimes size={24} /> */}
              <AiOutlineClose size={24} />
            </button>

            {/* DiscountCards Component */}
            <DiscountCards onSelect={handleDiscountSelection} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard2;