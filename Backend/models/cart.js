import { DataTypes } from 'sequelize';
import db from '../config/db.js';
import User from '../models/user.js';
import Property from '../models/Property.js';

const Cart = db.define('Cart', {
  id: {
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
  propertyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Property,
      key: 'pid',
    },
  },
  couponCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  quantity_purchased: DataTypes.INTEGER,
  discount_percentage: DataTypes.FLOAT,
  payment_status: { type: DataTypes.STRING, defaultValue: 'pending' },
}, {
  modelName: 'Cart',
  tableName: 'carts',
  timestamps: false,
  indexes: [
    {
      unique: true,
      fields: ['userId', 'propertyId', 'couponCode'], // Composite unique constraint
    },
  ],
});

User.hasMany(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

Property.hasMany(Cart, { foreignKey: 'propertyId' });
Cart.belongsTo(Property, { foreignKey: 'propertyId' });

export default Cart;