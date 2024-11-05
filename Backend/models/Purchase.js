// models/Purchase.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

// Purchase model
const Purchase = db.define('Purchase', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users', // Name of the User table
            key: 'id'       // Key in the User table
        },
        onDelete: 'CASCADE' // If a user is deleted, their purchases will also be deleted
    },
    propertyId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Properties', // Name of the Property table
            key: 'id'           // Key in the Property table
        },
        onDelete: 'CASCADE' // If a property is deleted, associated purchases will also be deleted
    },
    discountCodeId: {
        type: DataTypes.INTEGER,
        allowNull: true, // This field can be null if no discount code is used
        references: {
            model: 'DiscountCodes', // Name of the DiscountCode table
            key: 'id'               // Key in the DiscountCode table
        },
        onDelete: 'SET NULL' // If a discount code is deleted, the reference in purchases will be set to null
    },
    purchaseDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW // Automatically set to the current date
    },
    finalPrice: {
        type: DataTypes.FLOAT,
        allowNull: false // The final price after applying any discounts
    }
}, {
    tableName: 'Purchases', // Specify the table name if it differs from model name
    timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Export the Purchase model
export default Purchase;