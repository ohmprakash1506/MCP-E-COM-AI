"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartItemController = void 0;
const cartItem_model_1 = require("../model/cartItem.model");
const product_model_1 = require("../model/product.model");
const cart_model_1 = require("../model/cart.model");
class CartItemController {
    // Add a product to cart
    async addToCart(req, res) {
        try {
            const { cartId, productId, quantity } = req.body;
            if (!cartId || !productId) {
                return res.status(400).json({ message: "cartId and productId are required." });
            }
            const product = await product_model_1.Product.findByPk(productId);
            if (!product)
                return res.status(404).json({ message: "Product not found." });
            const cart = await cart_model_1.Cart.findByPk(cartId);
            if (!cart)
                return res.status(404).json({ message: "Cart not found." });
            // Check if the item already exists in cart
            const existingItem = await cartItem_model_1.CartItem.findOne({ where: { cartId, productId } });
            if (existingItem) {
                existingItem.quantity += quantity || 1;
                await existingItem.save();
                return res.status(200).json({ message: "Quantity updated.", item: existingItem });
            }
            const newItem = await cartItem_model_1.CartItem.create({ cartId, productId, quantity: quantity || 1 });
            return res.status(201).json(newItem);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // Get all items in a specific cart
    async getCartItems(req, res) {
        try {
            const { cartId } = req.params;
            const items = await cartItem_model_1.CartItem.findAll({ where: { cartId }, include: [product_model_1.Product] });
            if (!items.length) {
                return res.status(404).json({ message: "No items found in this cart." });
            }
            res.status(200).json(items);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // Update item quantity
    async updateQuantity(req, res) {
        try {
            const { id } = req.params;
            const { quantity } = req.body;
            const item = await cartItem_model_1.CartItem.findByPk(id);
            if (!item)
                return res.status(404).json({ message: "Cart item not found." });
            item.quantity = quantity;
            await item.save();
            res.status(200).json({ message: "Quantity updated successfully.", item });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // Remove a specific item from cart
    async removeItem(req, res) {
        try {
            const { id } = req.params;
            const deleted = await cartItem_model_1.CartItem.destroy({ where: { id } });
            if (!deleted)
                return res.status(404).json({ message: "Item not found." });
            res.status(200).json({ message: "Item removed successfully." });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
    // Clear all items in a cart
    async clearCart(req, res) {
        try {
            const { cartId } = req.params;
            await cartItem_model_1.CartItem.destroy({ where: { cartId } });
            res.status(200).json({ message: "Cart cleared successfully." });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}
exports.CartItemController = CartItemController;
