import { Request, Response } from "express";
import { Order } from "../model/order.model";
import { User } from "../model/user.model";
import { Brand } from "../model/brand.model";

export class OrderController {
  
  public createOrder = async (req: Request, res: Response) => {
    try {
      const { userId, brandId, totalAmount } = req.body;

      const user = await User.findByPk(userId);
      if (!user) return res.status(404).json({ message: "User not found" });

      const brand = await Brand.findByPk(brandId);
      if (!brand) return res.status(404).json({ message: "Brand not found" });

      const order = await Order.create({ userId, brandId, totalAmount, status: "pending" });
      res.status(201).json(order);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public getUserOrders = async (req: Request, res: Response) => {
    try {
      const { userId } = req.params;

      const orders = await Order.findAll({
        where: { userId },
        include: [{ model: Brand, attributes: ["id", "name"] }]
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public getBrandOrders = async (req: Request, res: Response) => {
    try {
      const { brandId } = req.params;

      const orders = await Order.findAll({
        where: { brandId },
        include: [{ model: User, attributes: ["id", "name", "email"] }]
      });

      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public updateOrderStatus = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const { status } = req.body; // 'pending' | 'completed' | 'cancelled'

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      order.status = status;
      await order.save();

      res.status(200).json({ message: "Order status updated", order });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };

  public deleteOrder = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const order = await Order.findByPk(id);
      if (!order) return res.status(404).json({ message: "Order not found" });

      await order.destroy();
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  };
}
