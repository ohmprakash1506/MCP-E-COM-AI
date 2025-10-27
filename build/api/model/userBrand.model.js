"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBrand = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = __importDefault(require("../config/db.config"));
class UserBrand extends sequelize_1.Model {
    userId;
    brandId;
}
exports.UserBrand = UserBrand;
UserBrand.init({
    userId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    brandId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
}, { sequelize: db_config_1.default, modelName: 'user_brand' });
