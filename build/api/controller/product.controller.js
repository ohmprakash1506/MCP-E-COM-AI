"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const product_model_1 = require("../model/product.model");
class ProductController {
    // Create a new product
    create = async (req, res) => {
        try {
            const { name, description, price, stock, brandId } = req.body;
            if (!name || !price || !brandId) {
                return res.status(400).json({ message: "Name, price, and brandId are required." });
            }
            const product = await product_model_1.Product.create({ name, description, price, stock, brandId });
            res.status(201).json(product);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get all products
    getAll = async (req, res) => {
        try {
            const products = await product_model_1.Product.findAll();
            res.status(200).json(products);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get a product by ID
    getById = async (req, res) => {
        try {
            const { id } = req.params;
            const product = await product_model_1.Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json(product);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Update a product
    update = async (req, res) => {
        try {
            const { id } = req.params;
            const [updated] = await product_model_1.Product.update(req.body, { where: { id } });
            if (updated === 0) {
                return res.status(404).json({ message: "Product not found" });
            }
            const updatedProduct = await product_model_1.Product.findByPk(id);
            res.status(200).json(updatedProduct);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Delete a product
    delete = async (req, res) => {
        try {
            const { id } = req.params;
            const deleted = await product_model_1.Product.destroy({ where: { id } });
            if (!deleted) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.status(200).json({ message: "Product deleted successfully" });
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get all products by brand
    getByBrand = async (req, res) => {
        try {
            const { brandId } = req.params;
            const products = await product_model_1.Product.findAll({ where: { brandId } });
            res.status(200).json(products);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.ProductController = ProductController;
