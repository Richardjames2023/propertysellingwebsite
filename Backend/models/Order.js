// models/Order.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from './User.js';
import Property from './Property.js';

const Order = db.define('Order', {
  userId: { type: DataTypes.INTEGER, allowNull: false, references: { model: User, key: 'id' }},
  propertyId: { type: DataTypes.INTEGER, allowNull: false, references: { model: Property, key: 'id' }},
  totalAmount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  discountApplied: { type: DataTypes.INTEGER, allowNull: true }, // Discount percentage applied
}, {
  tableName: 'orders',
  timestamps: true,
});

export default Order;