// models/Coupon.js
import { DataTypes } from 'sequelize';
import db from '../config/db.js';

const Coupon = db.define('Coupon', {
  code: { type: DataTypes.STRING, unique: true, allowNull: false },
  discountPercentage: { type: DataTypes.INTEGER, allowNull: false },
  isRedeemed: { type: DataTypes.BOOLEAN, defaultValue: false },
  userId: { type: DataTypes.INTEGER, allowNull: true }, // Nullable until redeemed by a user
}, {
  tableName: 'coupons',
  timestamps: true,
});

export default Coupon;