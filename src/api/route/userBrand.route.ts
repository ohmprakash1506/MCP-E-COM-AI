import { Router } from "express";
import { UserBrandController } from "../controller/userBrand.controller";

const router = Router();
const controller = new UserBrandController();

router.post("/subscribe", controller.subscribeBrand); 
router.post("/unsubscribe", controller.unsubscribeBrand);   
router.get("/user/:userId", controller.getSubscribedBrands); 

export default router;
