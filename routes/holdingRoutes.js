import { Router } from "express";
import { getHoldings } from "../controllers/holdingControllers.js";
import protectRoute from "../middlewares/protectMiddleware.js";
const router = Router();

router.get("/", protectRoute, getHoldings);

export default router;
