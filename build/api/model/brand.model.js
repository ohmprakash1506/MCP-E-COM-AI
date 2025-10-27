"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Brand = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Brand extends sequelize_1.Model {
    id;
    name;
    description;
    adminId;
}
exports.Brand = Brand;
Brand.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    name: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    description: { type: sequelize_1.DataTypes.STRING },
    adminId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: db_config_1.default, modelName: 'brand' });
