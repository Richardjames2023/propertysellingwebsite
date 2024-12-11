// import React, { useEffect, useState } from 'react';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const storedTotal = parseFloat(localStorage.getItem('cartTotal')) || 0; // Ensure cartTotal is a number
//     setCartItems(storedItems);
//     setCartTotal(storedTotal);
//   }, []);

//   const handleCheckout = () => {
//     // Generate PDF logic here, or call a function to generate and download PDF
//     // Save the user's cart info to the database and clear local storage
//     localStorage.setItem('purchasedCart', JSON.stringify(cartItems));
//     localStorage.setItem('totalAmount', cartTotal);
//     alert('Your cart has been saved!');
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
//       {cartItems.map((item) => (
//         <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p>₦ {Number(item.price).toFixed(2)} x {item.quantity}</p>
//             {item.discount && (
//               <p className="text-sm text-gray-500">Discount: {item.discount}%</p>
//             )}
//           </div>
//           <p>
//             Subtotal: ₦ {(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}
//           </p>
//         </div>
//       ))}
//       <div className="border-t pt-4 mt-4 text-lg font-bold">
//         Total: ₦ {cartTotal.toFixed(2)}
//       </div>
//       <button
//         onClick={handleCheckout}
//         className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 transition"
//       >
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default CartPage;


//Sending the data to the database 

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState([]);
//   const [cartTotal, setCartTotal] = useState(0);

//   useEffect(() => {
//     const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
//     const storedTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
//     setCartItems(storedItems);
//     setCartTotal(storedTotal);
//   }, []);

//   const handleCheckout = async () => {
//     try {
//       // Send cart items and total to the backend
//       const response = await axios.post('http://localhost:4001/api/purchase', {
//         items: cartItems,
//         totalAmount: cartTotal,
//       });

//       if (response.status === 200) {
//         // Clear local storage and notify user on successful checkout
//         localStorage.setItem('purchasedCart', JSON.stringify(cartItems));
//         localStorage.setItem('totalAmount', cartTotal);
//         localStorage.removeItem('cartItems');
//         localStorage.removeItem('cartTotal');
//         alert('Your cart has been successfully checked out!');
//       }
//     } catch (error) {
//       console.error('Error during checkout:', error);
//       alert('There was an issue with your checkout. Please try again.');
//     }
//   };

//   return (
//     <div className="p-4 max-w-3xl mx-auto">
//       <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
//       {cartItems.map((item) => (
//         <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
//           <div>
//             <p className="font-semibold">{item.name}</p>
//             <p>₦ {Number(item.price).toFixed(2)} x {item.quantity}</p>
//             {item.discount && (
//               <p className="text-sm text-gray-500">Discount: {item.discount}%</p>
//             )}
//           </div>
//           <p>
//             Subtotal: ₦ {(item.price * item.quantity * (1 - (item.discount || 0) / 100)).toFixed(2)}
//           </p>
//         </div>
//       ))}
//       <div className="border-t pt-4 mt-4 text-lg font-bold">
//         Total: ₦ {cartTotal.toFixed(2)}
//       </div>
//       <button
//         onClick={handleCheckout}
//         className="w-full bg-green-500 text-white py-2 mt-4 rounded hover:bg-green-600 transition"
//       >
//         Checkout
//       </button>
//     </div>
//   );
// };

// export default CartPage;


import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Install 'uuid' package
import axios from 'axios';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [userId, setUserId] = useState();

  useEffect(() => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    const storedTotal = parseFloat(localStorage.getItem('cartTotal')) || 0;
    const UserId = localStorage.getItem('userId');

    console.log('Retrieved UserId:', UserId); // Check if UserId is as expected

    setCartItems(storedItems);
    setCartTotal(storedTotal);
    setUserId(UserId);
  }, []);

  const generateUniqueCode = () => uuidv4(); // Use UUID for unique transaction and receipt codes

  const handleCheckout = async () => {

    const transactionId = generateUniqueCode();
    const receiptCode = generateUniqueCode();

  // Prepare each item in the required structure
  const purchaseData = cartItems.map(item => ({
    userId: userId,
    propertyId: item.id,          // Assuming `item.id` is the property ID
    finalPrice: item.price * item.quantity * (1 - (item.discount || 0) / 100),
    name: item.name,
    price: item.price,
    quantity: item.quantity,
    discount: item.discount || 0,  // Default to 0 if discount is not provided
    transactionId,
    receiptCode
  }));

  console.log(purchaseData);

    try {
      // Send cart items, total, and generated codes to the backend
      const response = await axios.post('http://localhost:4001/api/createPurchase', {
        purchasedItems: purchaseData  // Send the array of purchase data
      });

      if (response.status === 200) {
        // Clear local storage and notify user on successful checkout
        localStorage.setItem('purchasedCart', JSON.stringify(cartItems));
        localStorage.setItem('totalAmount', cartTotal);
        localStorage.removeItem('cartItems');
        localStorage.removeItem('cartTotal');
        alert(`Your cart has been successfully checked out! Receipt: ${receiptCode}`);
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      alert('There was an issue with your checkout. Please try again.');
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-4">Your Cart</h2>
      {cartItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4 border-b pb-2">
          <div>
            <p className="font-semibold">{item.name}</p>
            <p>₦ {Number(item.price).toFixed(2)} x {item.quantity}</p>
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