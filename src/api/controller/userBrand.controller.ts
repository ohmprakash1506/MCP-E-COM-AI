import { Request, Response } from "express";
import { User } from "../model/user.model";
import { Brand } from "../model/brand.model";
import { UserBrand } from "../model/userBrand.model";

export class UserBrandController {

  // Subscribe a user to a brand
  public subscribeBrand = async (req: Request, res: Response) => {
    try {
      const { userId, brandId } = req.body;

      // Check if mapping already exists
      const existing = await UserBrand.findOne({ where: { userId, brandId } });
      if (existing) {
        return res.status(400).json({ message: "User already subscribed to this brand" });
      }

      const subscription = await UserBrand.create({ userId, brandId });
      res.status(201).json(subscription);

    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Unsubscribe a user from a brand
  public unsubscribeBrand = async (req: Request, res: Response) => {
    try {
      const { userId, brandId } = req.body;

      const subscription = await UserBrand.findOne({ where: { userId, brandId } });
      if (!subscription) {
        return res.status(404).json({ message: "Subscription not found" });
      }

      await subscription.destroy();
      res.status(200).json({ message: "User unsubscribed successfully" });

    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  // Get all brands subscribed by a user
  public getSubscribedBrands = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const user: any = await User.findByPk(userId, {
        include: [{ model: Brand, as: "brands" }]
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(user.brands);

    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
