import { Request, Response } from "express";
import { Cart } from "../model/cart.model";
import { User } from "../model/user.model";

export class CartController {

  public createCart = async (req: Request, res: Response) => {
    try {
      const { userId } = req.body;

      const existingCart = await Cart.findOne({ where: { userId } });
      if (existingCart) {
        return res.status(400).json({ message: "Cart already exists for this user" });
      }

      const cart = await Cart.create({ userId });
      res.status(201).json(cart);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public getUserCart = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const cart = await Cart.findOne({
        where: { userId },
        include: [{ model: User, attributes: ["id", "name", "email"] }]
      });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found for this user" });
      }

      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public deleteCart = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;
      const cart = await Cart.findOne({ where: { userId } });

      if (!cart) {
        return res.status(404).json({ message: "Cart not found" });
      }

      await cart.destroy();
      res.status(200).json({ message: "Cart deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
