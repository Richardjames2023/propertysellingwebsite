
import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from '../models/user.js';

const Property = db.define('Property', {
  pid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
  },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: true },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  quantity: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 1, }, // Default to 1 if there’s a minimum quantity
  available: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true, }, // Property is available by default
  imageUrl: { type: DataTypes.STRING, allowNull: true },
  createdAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW,},
  updatedAt: {type: DataTypes.DATE, defaultValue: DataTypes.NOW,},
});

User.hasMany(Property, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });
Property.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE', onUpdate: 'CASCADE' });


export default Property;