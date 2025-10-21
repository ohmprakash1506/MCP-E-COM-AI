import { Request, Response } from "express";
import { Product } from "../model/product.model";

export class ProductController {
  // Create a new product
  public create = async (req: Request, res: Response) => {
    try {
      const { name, description, price, stock, brandId } = req.body;

      if (!name || !price || !brandId) {
        return res.status(400).json({ message: "Name, price, and brandId are required." });
      }

      const product = await Product.create({ name, description, price, stock, brandId });
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get all products
  public getAll = async (req: Request, res: Response) => {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get a product by ID
  public getById = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id);

      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json(product);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Update a product
  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const [updated] = await Product.update(req.body, { where: { id } });

      if (updated === 0) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updatedProduct = await Product.findByPk(id);
      res.status(200).json(updatedProduct);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Delete a product
  public delete = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const deleted = await Product.destroy({ where: { id } });

      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }

      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get all products by brand
  public getByBrand = async (req: Request, res: Response) => {
    try {
      const { brandId } = req.params;
      const products = await Product.findAll({ where: { brandId } });

      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
