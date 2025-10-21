import { Request, Response } from "express";
import { Brand } from "../model/index";

export class BrandController {

  // Create a new brand
  public createBrand = async (req: Request, res: Response) => {
    try {
      const { name, description, adminId } = req.body;

      // Check if brand with same name already exists for this admin
      const existingBrand = await Brand.findOne({ where: { name, adminId } });
      if (existingBrand) {
        return res.status(400).json({ message: "Brand with this name already exists for this admin" });
      }

      const brand = await Brand.create({ name, description, adminId });
      res.status(201).json(brand);

    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get all brands
  public getAllBrands = async (_req: Request, res: Response) => {
    try {
      const brands = await Brand.findAll();
      res.status(200).json(brands);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get a brand by ID
  public getBrandById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const brand = await Brand.findByPk(id);
      if (!brand) {
        return res.status(404).json({ message: "Brand not found" });
      }
      res.status(200).json(brand);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get all brands owned by an admin
  public getBrandsByAdmin = async (req: Request, res: Response) => {
    try {
      const { adminId } = req.params;
      const brands = await Brand.findAll({ where: { adminId } });
      res.status(200).json(brands);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
