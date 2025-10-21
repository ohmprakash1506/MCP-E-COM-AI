import { Router } from "express";
import { UserController } from "../controller/user.controller";

const router = Router();
const userController = new UserController();

router.post("/register", userController.register);
router.get("/", userController.getAll);

export default router;
