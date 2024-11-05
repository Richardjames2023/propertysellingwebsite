// ProductCard2.js
// import React, { useState } from 'react';

// const ProductCard2 = ({ product, onAddToCart }) => {
//   const [quantity, setQuantity] = useState(1);

//   const handleAddToCart = () => {
//     onAddToCart({ ...product, quantity }); // Call the function with product details and quantity
//   };

//   const increaseQuantity = () => setQuantity((prev) => prev + 1);
//   const decreaseQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden">
//       <div
//         className="product-image h-56 bg-cover bg-center"
//         style={{ backgroundImage: `url(${product.image})` }}
//       ></div>
//       <div className="p-4">
//         <h3 className="text-lg font-bold">{product.name}</h3>
//         <p className="text-sm text-gray-600">{product.description}</p>
//         <p className="text-xl font-semibold my-2">
//           <span className="text-2xl font-bold text-green-600">₦ </span>
//           {product.price}
//         </p>

//         {/* Quantity controls */}
//         <div className="flex items-center space-x-2 my-4">
//           <button onClick={decreaseQuantity} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
//             -
//           </button>
//           <span className="text-lg font-semibold">{quantity}</span>
//           <button onClick={increaseQuantity} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">
//             +
//           </button>
//         </div>

//         {/* Add to Cart button */}
//         <button
//           onClick={handleAddToCart} // Use handleAddToCart here
//           className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
//         >
//           Add to Cart
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ProductCard2;

import React, { useState } from 'react';
import DiscountCards from './DiscountCards'; // Import DiscountCards component (explained below)

const ProductCard2 = ({ product, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [showDiscountCards, setShowDiscountCards] = useState(false); // Track if discount cards are shown

  const handleAddToCart = () => {
    setShowDiscountCards(true); // Show discount cards after adding to cart
  };

  const handleDiscountSelection = (discount) => {
    setShowDiscountCards(false); // Hide discount cards after selection
    onAddToCart({ ...product, quantity, discount }); // Pass discount info along with product details
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div
        className="product-image h-56 bg-cover bg-center"
        style={{ backgroundImage: `url(${product.image})` }}
      ></div>
      <div className="p-4">
        <h3 className="text-lg font-bold">{product.name}</h3>
        <p className="text-sm text-gray-600">{product.description}</p>
        <p className="text-xl font-semibold my-2">
          <span className="text-2xl font-bold text-green-600">₦ </span>
          {product.price}
        </p>

        <div className="flex items-center space-x-2 my-4">
          <button onClick={() => setQuantity(prev => Math.max(1, prev - 1))} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">-</button>
          <span className="text-lg font-semibold">{quantity}</span>
          <button onClick={() => setQuantity(prev => prev + 1)} className="w-10 h-10 bg-gray-200 px-2 py-1 rounded hover:bg-gray-300">+</button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
        >
          Add to Cart
        </button>
      </div>

      {showDiscountCards && <DiscountCards onSelect={handleDiscountSelection} />}
    </div>
  );
};

export default ProductCard2;