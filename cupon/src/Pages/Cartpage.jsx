import React, { useEffect, useState } from 'react';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotal = parseFloat(localStorage.getItem('cartTotal')) || 0; // Ensure cartTotal is a number
    setCartItems(storedItems);
    setCartTotal(storedTotal);
  }, []);

  const handleCheckout = () => {
    // Generate PDF logic here, or call a function to generate and download PDF
    // Save the user's cart info to the database and clear local storage
    localStorage.setItem('purchasedCart', JSON.stringify(cartItems));
    localStorage.setItem('totalAmount', cartTotal);
    alert('Your cart has been saved!');
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p>₦ {item.price.toFixed(2)} x {item.quantity}</p>
            {item.discount && (
              <p className="text-sm text-gray-500">Discount: {item.discount}%</p>
            )}
          </div>
          <p>
            Subtotal: ₦ {(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}
          </p>
        </div>
      ))}
      <div className="border-t pt-4 mt-4 text-lg font-bold">
        Total: ₦ {cartTotal.toFixed(2)}
      </div>
      <button
        onClick={handleCheckout}
        className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 transition"
      >
        Checkout
      </button>
    </div>
  );
};

export default CartPage;