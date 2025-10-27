"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const order_model_1 = require("../model/order.model");
const user_model_1 = require("../model/user.model");
const brand_model_1 = require("../model/brand.model");
class OrderController {
    createOrder = async (req, res) => {
        try {
            const { userId, brandId, totalAmount } = req.body;
            const user = await user_model_1.User.findByPk(userId);
            if (!user)
                return res.status(404).json({ message: "User not found" });
            const brand = await brand_model_1.Brand.findByPk(brandId);
            if (!brand)
                return res.status(404).json({ message: "Brand not found" });
            const order = await order_model_1.Order.create({ userId, brandId, totalAmount, status: "pending" });
            res.status(201).json(order);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    getUserOrders = async (req, res) => {
        try {
            const { userId } = req.params;
            const orders = await order_model_1.Order.findAll({
                where: { userId },
                include: [{ model: brand_model_1.Brand, attributes: ["id", "name"] }]
            });
            res.status(200).json(orders);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    getBrandOrders = async (req, res) => {
        try {
            const { brandId } = req.params;
            const orders = await order_model_1.Order.findAll({
                where: { brandId },
                include: [{ model: user_model_1.User, attributes: ["id", "name", "email"] }]
            });
            res.status(200).json(orders);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    updateOrderStatus = async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body; // 'pending' | 'completed' | 'cancelled'
            const order = await order_model_1.Order.findByPk(id);
            if (!order)
                return res.status(404).json({ message: "Order not found" });
            order.status = status;
            await order.save();
            res.status(200).json({ message: "Order status updated", order });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    deleteOrder = async (req, res) => {
        try {
            const { id } = req.params;
            const order = await order_model_1.Order.findByPk(id);
            if (!order)
                return res.status(404).json({ message: "Order not found" });
            await order.destroy();
            res.status(200).json({ message: "Order deleted successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.OrderController = OrderController;
