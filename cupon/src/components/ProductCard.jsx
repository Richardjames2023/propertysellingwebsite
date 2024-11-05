import React, { useState } from 'react';
import { useCart } from '../context/CartContext'; // Adjust the path as needed

const ProductCard = ({ product }) => {
  const { id, title, image, price } = product;
  const [quantity, setQuantity] = useState(1);
  const [modalOpen, setModalOpen] = useState(false);
  const { addToCart, cartItems } = useCart(); // Accessing cartItems and addToCart from context

  const handleAddToCartClick = () => {
    setModalOpen(true);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prevQuantity) => Math.max(prevQuantity + delta, 1));
  };

  const handleAddToCart = () => {
    // Retrieve current cart from localStorage or initialize an empty array
    let storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

    // Check if the product is already in the cart
    const existingProductIndex = storedCart.findIndex((item) => item.id === id);

    if (existingProductIndex !== -1) {
      // If product exists, update only the quantity and price
      storedCart[existingProductIndex].quantity += quantity;
      storedCart[existingProductIndex].price = price; // Update price in case it changes
    } else {
      // If the product is not in the cart, add it with full details
      storedCart.push({
        id,
        title,
        image,
        price,
        quantity,
      });
    }

    // Save the updated cart back to localStorage
    localStorage.setItem('cartItems', JSON.stringify(storedCart));

    // Optionally update global cart context
    addToCart(product, quantity);

    // Close the modal
    setModalOpen(false);
  };

  // Get the current cart count for this product from the localStorage
  const storedCart = JSON.parse(localStorage.getItem('cartItems')) || [];
  const productInCart = storedCart.find((item) => item.id === id);
  const cartCount = productInCart ? productInCart.quantity : 0;

  return (
    <div className="border rounded-lg overflow-hidden shadow-lg relative group">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-gray-700">Price: ${price}</p>

        {/* Display cart count if product has been added to the cart */}
        {cartCount > 0 && (
          <div className="text-green-600 font-bold mb-2">
            Added to Cart: {cartCount} {cartCount > 1 ? 'times' : 'time'}
          </div>
        )}

        <button
          onClick={handleAddToCartClick}
          className="mt-2 bg-blue-500 text-white py-1 px-4 rounded"
        >
          Add to Cart
        </button>
      </div>

      {/* Modal for selecting quantity */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded shadow-md w-80">
            <h2 className="text-lg font-bold mb-4">{title}</h2>
            <p className="mb-4">Price: ${price}</p>
            <div className="flex items-center mb-4">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="px-4 py-2 bg-gray-300 rounded-l"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-t border-b"
              />
              <button
                onClick={() => handleQuantityChange(1)}
                className="px-4 py-2 bg-gray-300 rounded-r"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full bg-blue-500 text-white py-2 rounded"
            >
              Confirm Add to Cart
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="w-full mt-2 bg-red-500 text-white py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;