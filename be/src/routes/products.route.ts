import { Router } from "express";
import { getProducts } from "../controllers/products.controller";
import { validateQuery } from "../middlewares";
import { getProductsSchema } from "../schemas/product.schema";

const router = Router();

router.get("/", validateQuery(getProductsSchema), getProducts);

export default router;
