"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserBrandController = void 0;
const user_model_1 = require("../model/user.model");
const brand_model_1 = require("../model/brand.model");
const userBrand_model_1 = require("../model/userBrand.model");
class UserBrandController {
    // Subscribe a user to a brand
    subscribeBrand = async (req, res) => {
        try {
            const { userId, brandId } = req.body;
            // Check if mapping already exists
            const existing = await userBrand_model_1.UserBrand.findOne({ where: { userId, brandId } });
            if (existing) {
                return res.status(400).json({ message: "User already subscribed to this brand" });
            }
            const subscription = await userBrand_model_1.UserBrand.create({ userId, brandId });
            res.status(201).json(subscription);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Unsubscribe a user from a brand
    unsubscribeBrand = async (req, res) => {
        try {
            const { userId, brandId } = req.body;
            const subscription = await userBrand_model_1.UserBrand.findOne({ where: { userId, brandId } });
            if (!subscription) {
                return res.status(404).json({ message: "Subscription not found" });
            }
            await subscription.destroy();
            res.status(200).json({ message: "User unsubscribed successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get all brands subscribed by a user
    getSubscribedBrands = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await user_model_1.User.findByPk(userId, {
                include: [{ model: brand_model_1.Brand, as: "brands" }]
            });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            res.status(200).json(user.brands);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.UserBrandController = UserBrandController;
