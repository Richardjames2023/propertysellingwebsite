// import { DataTypes } from 'sequelize';
// import db from '../config/db.js';
// import users from '../models/user.js'
// import property from '../models/Property.js'

// const Checkout = db.define('Checkout', {
//     checkoutId: {
//         type: DataTypes.INTEGER,
//         primaryKey: true,
//         autoIncrement: true
//     },
//     userId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: users,
//             key: 'userId'   

//         }
//     },
//     propertyId: {
//         type: DataTypes.INTEGER,
//         references: {
//             model: property,
//             key: 'propertyId'
//         }
//     },
//     quantity: DataTypes.INTEGER,
//     totalPrice: DataTypes.DECIMAL,
//     discountApplied: DataTypes.DECIMAL,
//     timestamp: DataTypes.DATE
// }, {
//     tableName: 'checkout', // optional, defines the table name
//     timestamps: false, // optional, disables `createdAt` and `updatedAt` fields
//   });
// export default Checkout