// models/Purchase.js
// import { DataTypes } from 'sequelize';
// import db from '../config/db.js';

// import Checkout from '../models/checkout.js'; //adjust path as needed

// Purchase model
// const Purchase = db.define('Purchase', {
//     userId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Users', // Name of the User table
//             key: 'id'       // Key in the User table
//         },
//         onDelete: 'CASCADE' // If a user is deleted, their purchases will also be deleted
//     },
//     propertyId: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: 'Properties', // Name of the Property table
//             key: 'id'           // Key in the Property table
//         },
//         onDelete: 'CASCADE' // If a property is deleted, associated purchases will also be deleted
//     },
//     discountCodeId: {
//         type: DataTypes.INTEGER,
//         allowNull: true, // This field can be null if no discount code is used
//         references: {
//             model: 'DiscountCodes', // Name of the DiscountCode table
//             key: 'id'               // Key in the DiscountCode table
//         },
//         onDelete: 'SET NULL' // If a discount code is deleted, the reference in purchases will be set to null
//     },
//     purchaseDate: {
//         type: DataTypes.DATE,
//         allowNull: false,
//         defaultValue: Sequelize.NOW // Automatically set to the current date
//     },
//     finalPrice: {
//         type: DataTypes.FLOAT,
//         allowNull: false // The final price after applying any discounts
//     }
// }, {
//     tableName: 'Purchases', // Specify the table name if it differs from model name
//     timestamps: true, // Adds createdAt and updatedAt timestamps
// });

// // Export the Purchase model
// export default Purchase;

// const Purchase = db.define('Purchase', {
//     purchaseId: {
//         type: Sequelize.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     checkoutId: {
//         type: Sequelize.INTEGER,
//         references: {
//             model: Checkout,
//             key: 'checkoutId'
//         }
//     },
//     paymentStatus: Sequelize.STRING,
//     transactionId: Sequelize.STRING,
//     receiptCode: Sequelize.STRING,
//     timestamp: Sequelize.DATE
// });


import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from '../models/User.js'; // Import User model to reference

const Purchase = db.define('Purchase', {
    purchaseId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // checkoutId: {
    //     type: DataTypes.INTEGER,
    //     references: {
    //         model: 'Checkout', // Adjust this if the model name is different
    //         key: 'checkoutId'
    //     }
    // },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: User, // References the User model
            key: 'id'
        },
        allowNull: false // Ensures each purchase is linked to a user
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    discount: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    paymentStatus: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
    },
    transactionId: {
        type: DataTypes.STRING,
        allowNull: true,
       // unique: true // Ensures each transaction ID is unique
    },
    receiptCode: {
        type: DataTypes.STRING,
        allowNull: true,
        //unique: true // Ensures each receipt code is unique
    },
    timestamp: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    }
}, {
    tableName: 'purchase', // optional, defines the table name
    timestamps: false // optional, disables `createdAt` and `updatedAt` fields
});

export default Purchase;