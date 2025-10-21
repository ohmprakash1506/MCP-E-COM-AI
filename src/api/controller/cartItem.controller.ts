import { Request, Response } from "express";
import { CartItem } from "../model/cartItem.model";
import { Product } from "../model/product.model";
import { Cart } from "../model/cart.model";

export class CartItemController {
  // Add a product to cart
  public async addToCart(req: Request, res: Response) {
    try {
      const { cartId, productId, quantity } = req.body;

      if (!cartId || !productId) {
        return res.status(400).json({ message: "cartId and productId are required." });
      }

      const product = await Product.findByPk(productId);
      if (!product) return res.status(404).json({ message: "Product not found." });

      const cart = await Cart.findByPk(cartId);
      if (!cart) return res.status(404).json({ message: "Cart not found." });

      // Check if the item already exists in cart
      const existingItem = await CartItem.findOne({ where: { cartId, productId } });

      if (existingItem) {
        existingItem.quantity += quantity || 1;
        await existingItem.save();
        return res.status(200).json({ message: "Quantity updated.", item: existingItem });
      }

      const newItem = await CartItem.create({ cartId, productId, quantity: quantity || 1 });
      return res.status(201).json(newItem);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // Get all items in a specific cart
  public async getCartItems(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      const items = await CartItem.findAll({ where: { cartId }, include: [Product] });

      if (!items.length) {
        return res.status(404).json({ message: "No items found in this cart." });
      }

      res.status(200).json(items);
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // Update item quantity
  public async updateQuantity(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { quantity } = req.body;

      const item = await CartItem.findByPk(id);
      if (!item) return res.status(404).json({ message: "Cart item not found." });

      item.quantity = quantity;
      await item.save();

      res.status(200).json({ message: "Quantity updated successfully.", item });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // Remove a specific item from cart
  public async removeItem(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const deleted = await CartItem.destroy({ where: { id } });

      if (!deleted) return res.status(404).json({ message: "Item not found." });

      res.status(200).json({ message: "Item removed successfully." });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }

  // Clear all items in a cart
  public async clearCart(req: Request, res: Response) {
    try {
      const { cartId } = req.params;
      await CartItem.destroy({ where: { cartId } });
      res.status(200).json({ message: "Cart cleared successfully." });
    } catch (err) {
      res.status(500).json({ message: (err as Error).message });
    }
  }
}
