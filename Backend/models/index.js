//import User from '../models/user.js';
import Property from '../models/Property.js'
//import DiscountCode from '../models/DiscountCode.js'
import Purchase from '../models/Purchase.js'

// Define associations

// A User can have many Purchases
// User .hasMany(Purchase, {
//     foreignKey: 'userId',
//     onDelete: 'CASCADE', // If a user is deleted, their purchases will also be deleted
// });
// Purchase.belongsTo(User, {
//     foreignKey: 'userId',
// });

// // A Property can have many Purchases
// Property.hasMany(Purchase, {
//     foreignKey: 'propertyId',
//     onDelete: 'CASCADE', // If a property is deleted, associated purchases will also be deleted
// });
// Purchase.belongsTo(Property, {
//     foreignKey: 'propertyId',
// });

// // A DiscountCode can be used in many Purchases
// DiscountCode.hasMany(Purchase, {
//     foreignKey: 'discountCodeId',
//     onDelete: 'SET NULL', // If a discount code is deleted, the reference in purchases will be set to null
// });
// Purchase.belongsTo(DiscountCode, {
//     foreignKey: 'discountCodeId',
// });

// Define the relationships
// User.hasMany(Checkout);
// Checkout.belongsTo(User);

// Property.hasMany(Checkout);
// Checkout.belongsTo(Property);

// Checkout.hasOne(Purchase);
// Purchase.belongsTo(Checkout);

// export {
//     User,
//     Property,
//     Purchase,
// };

// Define relationships between models

// A User can have multiple Carts, and a Cart belongs to one User
// User.hasMany(Cart, { foreignKey: 'userId' });
// Cart.belongsTo(User, { foreignKey: 'userId' });

// // A Cart can have multiple Properties, and a Property can belong to multiple Carts (through a join table if needed)
// Cart.belongsToMany(Property, { through: 'CartProperties', foreignKey: 'cartId' });
// Property.belongsToMany(Cart, { through: 'CartProperties', foreignKey: 'propertyId' });

// // A User can have multiple Purchases, and each Purchase belongs to one User
// User.hasMany(Purchase, { foreignKey: 'userId' });
// Purchase.belongsTo(User, { foreignKey: 'userId' });

// // A Cart can have multiple Purchases if necessary, with each Purchase belonging to a single Cart
// Cart.hasMany(Purchase, { foreignKey: 'cartId' });
// Purchase.belongsTo(Cart, { foreignKey: 'cartId' });

// // A Property can have multiple Purchases, and each Purchase belongs to a single Property (for tracking items in purchases)
// Property.hasMany(Purchase, { foreignKey: 'propertyId' });
// Purchase.belongsTo(Property, { foreignKey: 'propertyId' });

// export {
//     User,
//     Property,
//     Cart,
//     Purchase,
// };