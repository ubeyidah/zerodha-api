import { Router } from "express";
import protectRoute from "../middlewares/protectMiddleware";
import { buy, getOrders, sell } from "../controllers/orderControllers";

const router = Router();

router.get("/", protectRoute, getOrders);

router.post("/buy", protectRoute, buy);

router.post("/sell", protectRoute, sell);

export default router;
