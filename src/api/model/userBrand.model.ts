import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db.config';

export class UserBrand extends Model {
  public userId!: number;
  public brandId!: number;
}

UserBrand.init(
  {
    userId: { type: DataTypes.INTEGER, allowNull: false },
    brandId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'user_brand' }
);
