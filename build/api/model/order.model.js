"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class Order extends sequelize_1.Model {
    id;
    userId;
    brandId;
    totalAmount;
    status;
}
exports.Order = Order;
Order.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    brandId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    totalAmount: { type: sequelize_1.DataTypes.FLOAT, allowNull: false },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'completed', 'cancelled'),
        defaultValue: 'pending',
    },
}, { sequelize: db_config_1.default, modelName: 'order' });
