import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/db.config';
import { ProductAttributes } from '../types/types';

interface ProductCreation extends Optional<ProductAttributes, 'id'> {}

export class Product extends Model<ProductAttributes, ProductCreation> implements ProductAttributes {
  public id!: number;
  public name!: string;
  public description!: string;
  public price!: number;
  public brandId!: number;
  public stock!: number;
}

Product.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    price: { type: DataTypes.FLOAT, allowNull: false },
    stock: { type: DataTypes.INTEGER, defaultValue: 0 },
    brandId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'product' }
);
