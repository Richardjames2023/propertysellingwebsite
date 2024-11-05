// DiscountCode model
import { DataTypes } from 'sequelize';
import db from '../config/db.js';


const DiscountCode = db.define('DiscountCode', {
    code: {type: DataTypes.STRING, allowNull: false, unique: true,},
    percentage: {type: DataTypes.DECIMAL(5, 2), allowNull: false,},
    isUsed: {type: DataTypes.BOOLEAN, defaultValue: false,}
}, {
    tableName: 'DiscountCode',
    timestamps: true,
  });

  export default DiscountCode;