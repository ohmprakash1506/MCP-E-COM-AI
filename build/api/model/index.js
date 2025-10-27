"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBrand = exports.Order = exports.CartItem = exports.Cart = exports.Product = exports.Brand = exports.User = exports.sequelize = void 0;
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
const brand_model_1 = require("./brand.model");
Object.defineProperty(exports, "Brand", { enumerable: true, get: function () { return brand_model_1.Brand; } });
const userBrand_model_1 = require("./userBrand.model");
Object.defineProperty(exports, "UserBrand", { enumerable: true, get: function () { return userBrand_model_1.UserBrand; } });
const product_model_1 = require("./product.model");
Object.defineProperty(exports, "Product", { enumerable: true, get: function () { return product_model_1.Product; } });
const cart_model_1 = require("./cart.model");
Object.defineProperty(exports, "Cart", { enumerable: true, get: function () { return cart_model_1.Cart; } });
const cartItem_model_1 = require("./cartItem.model");
Object.defineProperty(exports, "CartItem", { enumerable: true, get: function () { return cartItem_model_1.CartItem; } });
const order_model_1 = require("./order.model");
Object.defineProperty(exports, "Order", { enumerable: true, get: function () { return order_model_1.Order; } });
const db_config_1 = __importDefault(require("../config/db.config"));
exports.sequelize = db_config_1.default;
// User - Brand (Admin)
user_model_1.User.hasMany(brand_model_1.Brand, { foreignKey: 'adminId', as: 'ownedBrands' });
brand_model_1.Brand.belongsTo(user_model_1.User, { foreignKey: 'adminId', as: 'admin' });
// User - Brand (Many-to-Many: customers)
user_model_1.User.belongsToMany(brand_model_1.Brand, { through: userBrand_model_1.UserBrand, as: 'brands', foreignKey: 'userId' });
brand_model_1.Brand.belongsToMany(user_model_1.User, { through: userBrand_model_1.UserBrand, as: 'customers', foreignKey: 'brandId' });
// Brand - Product
brand_model_1.Brand.hasMany(product_model_1.Product, { foreignKey: 'brandId' });
product_model_1.Product.belongsTo(brand_model_1.Brand, { foreignKey: 'brandId' });
// User - Cart
user_model_1.User.hasOne(cart_model_1.Cart, { foreignKey: 'userId' });
cart_model_1.Cart.belongsTo(user_model_1.User, { foreignKey: 'userId' });
// Cart - CartItems
cart_model_1.Cart.hasMany(cartItem_model_1.CartItem, { foreignKey: 'cartId' });
cartItem_model_1.CartItem.belongsTo(cart_model_1.Cart, { foreignKey: 'cartId' });
// Product - CartItems
product_model_1.Product.hasMany(cartItem_model_1.CartItem, { foreignKey: 'productId' });
cartItem_model_1.CartItem.belongsTo(product_model_1.Product, { foreignKey: 'productId' });
// User - Order
user_model_1.User.hasMany(order_model_1.Order, { foreignKey: 'userId' });
order_model_1.Order.belongsTo(user_model_1.User, { foreignKey: 'userId' });
// Brand - Order
brand_model_1.Brand.hasMany(order_model_1.Order, { foreignKey: 'brandId' });
order_model_1.Order.belongsTo(brand_model_1.Brand, { foreignKey: 'brandId' });
