// import React, { useState } from 'react';

// const generateDiscounts = () =>
//   Array.from({ length: 20 }, () => Math.floor(Math.random() * (8 - 3 + 1)) + 3); // Generate discounts from 3% to 8%

// const DiscountCards = ({ onSelect }) => {
//   const discounts = generateDiscounts();
//   const [selectedIndex, setSelectedIndex] = useState(null);

//   return (
//     <div className="absolute top-0 left-0 bg-white p-4 border rounded shadow-lg grid grid-cols-4 gap-2">
//       <h3 className="col-span-4 text-lg font-bold mb-2">Pick a Discount Card</h3>
//       {discounts.map((discount, index) => (
//         <button
//           key={index}
//           onClick={() => {
//             setSelectedIndex(index); // Set selected card index
//             onSelect(discount); // Pass selected discount to parent component
//           }}
//           className={`p-4 bg-green-200 rounded hover:bg-green-300 transition-transform duration-500 ${
//             selectedIndex === index ? 'bg-blue-200' : ''
//           }`}
//         >
//           {/* Show discount if selected, otherwise show "Pick Me!" */}
//           {selectedIndex === index ? `${discount}%` : 'Pick Me!'}
//         </button>
//       ))}
//     </div>
//   );
// };

// export default DiscountCards;


// import React from 'react';

// const generateDiscounts = () => Array.from({ length: 20 }, () => Math.floor(Math.random() * (8 - 3 + 1)) + 3); // Generate discounts from 3% to 8%

// const DiscountCards = ({ onSelect }) => {
//   const discounts = generateDiscounts();

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 border rounded shadow-lg grid grid-cols-4 gap-4">
//         <h3 className="col-span-4 text-lg font-bold mb-4 text-center">Pick a Discount Card</h3>
//         {discounts.map((discount, index) => (
//           <button
//             key={index}
//             onClick={() => onSelect(discount)}
//             className="p-4 bg-green-200 rounded-lg hover:bg-green-300"
//           >
//             {/* Hide the discount until selected */}
//             ?
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiscountCards;

// import React from 'react';

// const generateDiscounts = () => Array.from({ length: 20 }, () => Math.floor(Math.random() * (8 - 3 + 1)) + 3); // Generate discounts from 3% to 8%

// const DiscountCards = ({ onSelect }) => {
//   const discounts = generateDiscounts();

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="bg-white p-6 border rounded shadow-lg grid grid-cols-4 gap-4">
//         <h3 className="col-span-4 text-lg font-bold mb-4 text-center">Pick a Discount Card</h3>
//         {discounts.map((discount, index) => (
//           <button
//             key={index}
//             onClick={() => onSelect(discount)}
//             className="p-4 bg-green-200 rounded-lg hover:bg-green-300 text-center"
//           >
//             Pick Me
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DiscountCards;

import React, { useState } from 'react';

// Generate discount array
const generateDiscounts = () => Array.from({ length: 9 }, () => Math.floor(Math.random() * (8 - 3 + 1)) + 3);

const DiscountCards = ({ onSelect }) => {
  const discounts = generateDiscounts();
  const [revealed, setRevealed] = useState(Array(9).fill(false)); // Track revealed state for each card

  const handleCardClick = (index, discount) => {
    const newRevealed = [...revealed];
    newRevealed[index] = true;
    setRevealed(newRevealed);
    onSelect(discount);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg grid grid-cols-3 gap-4">
        <h3 className="col-span-3 text-lg font-bold text-center mb-4">Pick a Discount Card</h3>
        
        {discounts.map((discount, index) => (
          <div
            key={index}
            className="group relative w-[150px] h-[200px] perspective-1000"
            style={{ perspective: '1000px' }} // Set perspective on the card's direct parent
          >
            <div
              onClick={() => handleCardClick(index, discount)}
              className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
                revealed[index] ? 'rotate-y-180' : ''
              }`}
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Front of Card */}
              <div
                className="absolute inset-0 bg-blue-600 text-white flex items-center justify-center backface-hidden rounded-lg"
                style={{ backfaceVisibility: 'hidden' }}
              >
                <span className="text-xl font-semibold">Pick Me</span>
              </div>
              {/* Back of Card */}
              <div
                className="absolute inset-0 bg-green-500 text-white flex items-center justify-center backface-hidden rounded-lg transform rotate-y-180"
                style={{ backfaceVisibility: 'hidden' }}
              >
                {revealed[index] ? `${discount}% Discount!` : ''}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountCards;