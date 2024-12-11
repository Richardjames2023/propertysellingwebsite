// import DiscountCode from '../models/DiscountCode.js';

// function generateDiscountCode() {
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
//     let code = '';
//     for (let i = 0; i < 6; i++) {
//         code += characters.charAt(Math.floor(Math.random() * characters.length));
//     }
//     return code;
// }

// function generateDiscountPercentage() {
//     // Generate a random percentage discount between 5% and 30%
//     return Math.floor(Math.random() * (30 - 5 + 1)) + 5;
// }

// // Example of creating a discount code
//  generateDiscountCode();
// generateDiscountPercentage();

// //storing DiscountCodes
// //Sequelize Code to Create a Discount Code
// const createDiscountCodesForUser = async (userId) => {
//     const discountCodes = [];
//     for (let i = 0; i < 2; i++) {
//         const code = generateDiscountCode();
//         const percentage = generateDiscountPercentage();
//         const newDiscountCode = await DiscountCode.create({
//             code: code,
//             percentage: percentage,
//             isUsed: false
//         });
//         discountCodes.push(newDiscountCode);
//     }
//     return discountCodes;
// }
// //get all discountCode
// const getAllDiscountCard = async (req, res) => {
//     try {
//         const discountCodes = await DiscountCode.findAll({
//             where: { isUsed: false } // Ensure only unused codes are fetched
//         });
//         res.json(discountCodes);
//     } catch (error) {
//         res.status(500).json({ error: 'Error fetching discount codes' });
//     }
// };

// // Displaying Discount Codes(Code to Retrieve Discount Codes)

// const getAvailableDiscountCodes = async () => {
//     const discountCodes = await DiscountCode.findAll({
//         where: { isUsed: false } // Only get unused discount codes
//     });
//     return discountCodes;
// }

// //Applying a Discount Code(Code to Apply a Discount Code)

// const applyDiscountCode = async (userId, propertyId, discountCodeInput) => {
//     const discountCode = await DiscountCode.findOne({
//         where: {
//             code: discountCodeInput,
//             isUsed: false // Ensure it hasn't been used
//         }
//     });

//     if (!discountCode) {
//         throw new Error('Invalid or already used discount code');
//     }

//     // Proceed with the purchase
//     const property = await Property.findByPk(propertyId);
//     const discountAmount = (property.price * discountCode.percentage) / 100;
//     const finalPrice = property.price - discountAmount;

//     // Create a purchase record
//     await Purchase.create({
//         userId: userId,
//         propertyId: propertyId,
//         discountCodeId: discountCode.id // Link the discount code to the purchase
//     });

//     // Mark the discount code as used
//     discountCode.isUsed = true;
//     await discountCode.save();

//     return finalPrice; // Return the final price after discount
// }

// //Applying the Selected Discount Code
// const handleConfirmSelection = async () => {
//     try {
//         // Make an API call to apply the discount code
//         const response = await axios.post('/api/apply-discount', {
//             userId: currentUser .id, // Assuming you have the current user ID
//             propertyId: selectedProperty.id, // Assuming you have the selected property ID
//             discountCodeId: selectedCode.id // The ID of the selected discount code
//         });

//         // Assuming the response contains the final price after discount
//         const finalPrice = response.data.finalPrice;

//         // Show success message or update state with the final price
//         alert(`Discount applied! Your final price is $${finalPrice.toFixed(2)}`);
        
//         // Optionally, you can reset the selected code and percentage
//         setSelectedCode(null);
//         setFinalPercentage(null);
        
//         // Optionally, refresh the available discount codes or perform any other action
//         const updatedCodes = await axios.get('/api/discount-codes');
//         setDiscountCodes(updatedCodes.data);

//     } catch (error) {
//         // Handle error (e.g., invalid discount code, server error)
//         console.error('Error applying discount code:', error);
//         alert('Failed to apply discount code. Please try again.');
//     }
// };

// export default { createDiscountCodesForUser, getAllDiscountCard, getAvailableDiscountCodes, applyDiscountCode, handleConfirmSelection };