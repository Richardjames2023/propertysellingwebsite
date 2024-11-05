
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define('User', {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    // unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},{
  tableName: 'users', // optional, defines the table name
  timestamps: false, // optional, disables `createdAt` and `updatedAt` fields
});

export default User;