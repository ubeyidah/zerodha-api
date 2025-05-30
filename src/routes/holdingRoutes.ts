import { Router } from "express";
import { getHoldings } from "../controllers/holdingControllers";
import protectRoute from "../middlewares/protectMiddleware";
const router = Router();

router.get("/", protectRoute, getHoldings);

export default router;
