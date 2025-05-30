import { Router } from "express";
import { signup, login, logout, profile } from "../controllers/authControllers";
import protectRoute from "../middlewares/protectMiddleware";

const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", protectRoute, profile);

export default router;
