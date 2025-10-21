import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { OrderAttributes } from '../types/types';

interface OrderCreation extends Optional<OrderAttributes, 'id'> {}

export class Order extends Model<OrderAttributes, OrderCreation> implements OrderAttributes {
  public id!: number;
  public userId!: number;
  public brandId!: number;
  public totalAmount!: number;
  public status!: 'pending' | 'completed' | 'cancelled';
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    brandId: { type: DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: DataTypes.FLOAT, allowNull: false },
    status: {
      type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
  },
  { sequelize, modelName: 'order' }
);
