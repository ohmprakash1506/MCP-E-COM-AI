import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";
import { BrandAttributes } from "../types/types";

interface BrandCreation extends Optional<BrandAttributes, 'id'> {}

export class Brand extends Model<BrandAttributes, BrandCreation> implements BrandAttributes {
  public id!: number;
  public name!: string;
  public description?: string;
  public adminId!: number;
}

Brand.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    adminId: { type: DataTypes.INTEGER, allowNull: false },
  },
  { sequelize, modelName: 'brand' }
);