import { Router } from "express";
import { getPositions } from "../controllers/positionControllers.js";
import protectRoute from "../middlewares/protectMiddleware.js";
const router = Router();

router.get("/", protectRoute, getPositions);

export default router;
