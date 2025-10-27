"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartController = void 0;
const cart_model_1 = require("../model/cart.model");
const user_model_1 = require("../model/user.model");
class CartController {
    createCart = async (req, res) => {
        try {
            const { userId } = req.body;
            const existingCart = await cart_model_1.Cart.findOne({ where: { userId } });
            if (existingCart) {
                return res.status(400).json({ message: "Cart already exists for this user" });
            }
            const cart = await cart_model_1.Cart.create({ userId });
            res.status(201).json(cart);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    getUserCart = async (req, res) => {
        try {
            const { userId } = req.params;
            const cart = await cart_model_1.Cart.findOne({
                where: { userId },
                include: [{ model: user_model_1.User, attributes: ["id", "name", "email"] }]
            });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found for this user" });
            }
            res.status(200).json(cart);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    deleteCart = async (req, res) => {
        try {
            const { userId } = req.params;
            const cart = await cart_model_1.Cart.findOne({ where: { userId } });
            if (!cart) {
                return res.status(404).json({ message: "Cart not found" });
            }
            await cart.destroy();
            res.status(200).json({ message: "Cart deleted successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.CartController = CartController;
