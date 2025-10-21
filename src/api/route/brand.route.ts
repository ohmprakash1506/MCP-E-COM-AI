import { Router } from "express";
import { BrandController } from "../controller/brand.controller";

const router = Router();
const brandController = new BrandController();

router.post("/", brandController.createBrand);           
router.get("/", brandController.getAllBrands);           
router.get("/:id", brandController.getBrandById);        
router.get("/admin/:adminId", brandController.getBrandsByAdmin);

export default router;