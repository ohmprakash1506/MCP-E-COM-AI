import { DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/db.config";
import { UserAttributes } from "../types/types";

interface UserCreation extends Optional<UserAttributes, "id"> {}

export class User
  extends Model<UserAttributes, UserCreation>
  implements UserAttributes
{
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public role!: "super_admin" | "brand_admin" | "customer";
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: {
      type: DataTypes.ENUM("super_admin", "brand_admin", "customer"),
      allowNull: false,
      defaultValue: "customer",
    },
  },
  { sequelize, modelName: "user" }
);
