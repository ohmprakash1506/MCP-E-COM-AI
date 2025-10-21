import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

export class CartItem extends Model {
  public id!: number;
  public cartId!: number;
  public productId!: number;
  public quantity!: number;
}

CartItem.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    cartId: { type: DataTypes.INTEGER, allowNull: false },
    productId: { type: DataTypes.INTEGER, allowNull: false },
    quantity: { type: DataTypes.INTEGER, defaultValue: 1 },
  },
  { sequelize, modelName: 'cart_item' }
);
