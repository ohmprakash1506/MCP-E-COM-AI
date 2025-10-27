"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Product extends sequelize_1.Model {
    id;
    name;
    description;
    price;
    brandId;
    stock;
}
exports.Product = Product;
Product.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING },
    price: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    stock: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    brandId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: db_config_1.default, modelName: 'product' });
