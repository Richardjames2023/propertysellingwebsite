import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const User = db.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
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
      //unique: true, // Keep only a unique constraint for `email`
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true, // Optional, no unique constraint
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user', // Default role remains 'user'
      validate: {
        isIn: [['user', 'admin', 'superadmin']], // Add 'superadmin' as a valid role
      },
    },
    refreshToken: DataTypes.STRING,
  },
  {
    tableName: 'users',
    timestamps: false,
  }
);

export default User;