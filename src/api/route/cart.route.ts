import { Router } from "express";
import { CartController } from "../controller/cart.controller";

const router = Router();
const controller = new CartController();

router.post("/", controller.createCart);
router.get("/:userId", controller.getUserCart);
router.delete("/:userId", controller.deleteCart);

export default router;
