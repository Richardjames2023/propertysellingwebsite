import User from '../models/user.js';
import Property from '../models/Property.js'
import DiscountCode from '../models/DiscountCode.js'
import Purchase from '../models/Purchase.js'

// Define associations

// A User can have many Purchases
User .hasMany(Purchase, {
    foreignKey: 'userId',
    onDelete: 'CASCADE', // If a user is deleted, their purchases will also be deleted
});
Purchase.belongsTo(User, {
    foreignKey: 'userId',
});

// A Property can have many Purchases
Property.hasMany(Purchase, {
    foreignKey: 'propertyId',
    onDelete: 'CASCADE', // If a property is deleted, associated purchases will also be deleted
});
Purchase.belongsTo(Property, {
    foreignKey: 'propertyId',
});

// A DiscountCode can be used in many Purchases
DiscountCode.hasMany(Purchase, {
    foreignKey: 'discountCodeId',
    onDelete: 'SET NULL', // If a discount code is deleted, the reference in purchases will be set to null
});
Purchase.belongsTo(DiscountCode, {
    foreignKey: 'discountCodeId',
});

export {
    User,
    Property,
    DiscountCode,
    Purchase,
};