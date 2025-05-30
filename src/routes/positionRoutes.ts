import { Router } from "express";
import { getPositions } from "../controllers/positionControllers";
import protectRoute from "../middlewares/protectMiddleware";
const router = Router();

router.get("/", protectRoute, getPositions);

export default router;
