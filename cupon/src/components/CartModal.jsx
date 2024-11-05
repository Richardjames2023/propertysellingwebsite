// CartModal.js
// import React from 'react';
// import { AiOutlineClose } from 'react-icons/ai';

// const CartModal = ({ cartItems, onClose, onIncrease, onDecrease }) => {
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-4 z-50 overflow-y-auto border-2 border-gray-300" >
//             <div className="flex justify-end">
//         <button onClick={onClose} className="text-red-500 text-2xl">
//           <AiOutlineClose />
//         </button>
//       </div>
//       <h2 className="text-3xl font-bold mb-4 text-green-700">Your Cart</h2>
//       {cartItems.map((item) => (
//         <div key={item.id} className="flex justify-between items-center mb-4 border-2 border-gray-300 p-3 shadow">
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p className="text-green-700">₦ {item.price.toFixed(2)}</p>
//           </div>
//           <div className="flex items-center space-x-2">
//             <button onClick={() => onDecrease(item.id)} className="px-2">-</button>
//             <span>{item.quantity}</span>
//             <button onClick={() => onIncrease(item.id)} className="px-2">+</button>
//           </div>
//         </div>
//       ))}
//       <div className="border-t mt-4 pt-2 text-lg font-bold">
//         Total: ₦ {calculateTotalPrice().toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default CartModal;

// import React from 'react';
// import { AiOutlineClose } from 'react-icons/ai';

// const CartModal = ({ cartItems, onClose, onIncrease, onDecrease }) => {
//   // Calculate total price, considering each item's discount if available
//   const calculateTotalPrice = () => {
//     return cartItems.reduce((total, item) => {
//       const itemTotal = item.price * item.quantity;
//       const discountAmount = item.discount ? (itemTotal * item.discount) / 100 : 0;
//       return total + (itemTotal - discountAmount);
//     }, 0);
//   };

//   return (
//     <div className="fixed right-0 top-0 h-full w-72 bg-white shadow-lg p-4 z-50 overflow-y-auto border-2 border-gray-300">
//       <div className="flex justify-between items-center mb-4">
//         <h2 className="text-2xl font-bold text-green-700">Your Cart</h2>
//         <button onClick={onClose} className="text-red-500">
//           <AiOutlineClose size={24} />
//         </button>
//       </div>

//       {/* Cart items */}
//       {cartItems.length > 0 ? (
//         cartItems.map((item) => (
//           <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
//             <div>
//               <p className="font-semibold">{item.name}</p>
//               <p className="text-green-700">₦ {item.price.toFixed(2)}</p>
//               {item.discount && (
//                 <p className="text-sm text-gray-500">
//                   Discount: {item.discount}%
//                 </p>
//               )}
//             </div>
//             <div className="flex items-center space-x-2">
//               <button onClick={() => onDecrease(item.id)} className="px-2">-</button>
//               <span>{item.quantity}</span>
//               <button onClick={() => onIncrease(item.id)} className="px-2">+</button>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className="text-gray-600 text-center">Your cart is empty.</p>
//       )}

//       {/* Total Price */}
//       <div className="border-t mt-4 pt-2 text-lg font-bold">
//         Total: ₦ {calculateTotalPrice().toFixed(2)}
//       </div>
//     </div>
//   );
// };

// export default CartModal;


// CartModal.js
import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ cartItems, onClose, onIncrease, onDecrease }) => {
  const navigate = useNavigate();

  // Calculate total price considering discounts
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemTotal = item.price * item.quantity;
      const discountAmount = item.discount ? (itemTotal * item.discount) / 100 : 0;
      return total + (itemTotal - discountAmount);
    }, 0);
  };

  const handleViewCart = () => {
    // Save cart data to local storage for retrieval on CartPage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    localStorage.setItem('cartTotal', calculateTotalPrice());
    navigate('/cart');
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
              <p className="text-green-700">₦ {item.price.toFixed(2)}</p>
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

      {/* Total Price and View Cart Button */}
      <div className="border-t mt-4 pt-2 text-lg font-bold">
        Total: ₦ {calculateTotalPrice().toFixed(2)}
      </div>
      <button
        onClick={handleViewCart}
        className="w-full bg-blue-500 text-white py-2 mt-4 rounded hover:bg-blue-600 transition"
      >
        View Cart
      </button>
    </div>
  );
};

export default CartModal;