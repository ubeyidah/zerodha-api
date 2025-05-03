import { Router } from "express";
import protectRoute from "../middlewares/protectMiddleware.js";
import { getOrders } from "../controllers/orderControllers.js";

const router = Router();

router.get("/", protectRoute, getOrders);

export default router;
