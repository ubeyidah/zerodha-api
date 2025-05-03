import { Router } from "express";
import {
  signup,
  login,
  logout,
  profile,
} from "../controllers/authControllers.js";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.get("/profile", profile);

export default router;
