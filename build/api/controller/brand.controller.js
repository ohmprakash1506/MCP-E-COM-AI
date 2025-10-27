"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BrandController = void 0;
const index_1 = require("../model/index");
class BrandController {
    // Create a new brand
    createBrand = async (req, res) => {
        try {
            const { name, description, adminId } = req.body;
            // Check if brand with same name already exists for this admin
            const existingBrand = await index_1.Brand.findOne({ where: { name, adminId } });
            if (existingBrand) {
                return res.status(400).json({ message: "Brand with this name already exists for this admin" });
            }
            const brand = await index_1.Brand.create({ name, description, adminId });
            res.status(201).json(brand);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get all brands
    getAllBrands = async (_req, res) => {
        try {
            const brands = await index_1.Brand.findAll();
            res.status(200).json(brands);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get a brand by ID
    getBrandById = async (req, res) => {
        try {
            const { id } = req.params;
            const brand = await index_1.Brand.findByPk(id);
            if (!brand) {
                return res.status(404).json({ message: "Brand not found" });
            }
            res.status(200).json(brand);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
    // Get all brands owned by an admin
    getBrandsByAdmin = async (req, res) => {
        try {
            const { adminId } = req.params;
            const brands = await index_1.Brand.findAll({ where: { adminId } });
            res.status(200).json(brands);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    };
}
exports.BrandController = BrandController;
