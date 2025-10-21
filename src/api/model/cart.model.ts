import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { CartAttributes } from '../types/types';

interface CartCreation extends Optional<CartAttributes, 'id'> {}

export class Cart extends Model<CartAttributes, CartCreation> implements CartAttributes {
  public id!: number;
  public userId!: number;
}

Cart.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'cart' }
);
