// models/Property.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Property = db.define('Property', {
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, }, // Default to 1 if there’s a minimum quantity
  available: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, }, // Property is available by default
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW,},
  updatedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW,}
}, {
  tableName: 'properties',
  timestamps: true,
});

export default Property;