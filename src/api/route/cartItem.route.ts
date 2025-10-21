import { Router } from "express";
import { CartItemController } from "../controller/cartItem.controller"

const router = Router();
const cartItemController = new CartItemController();

router.post("/", cartItemController.addToCart);
router.get("/:cartId", cartItemController.getCartItems);
router.put("/:id", cartItemController.updateQuantity);
router.delete("/:id", cartItemController.removeItem);
router.delete("/clear/:cartId", cartItemController.clearCart);

export default router;
