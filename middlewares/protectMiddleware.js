import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { env } from "../utils/env.js";

const protectRoute = async (req, res, next) => {
  const token = req.cookies["zerodha-token"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Unauthorized", success: false, data: null });
  }

  const decoded = jwt.verify(token, env("JWT_SECRET"));
  if (!decoded) {
    return res
      .status(401)
      .json({ message: "Invalid token", success: false, data: null });
  }
  const user = await User.findById(decoded.id);
  if (!user) {
    return res
      .status(404)
      .json({ message: "User not found", success: false, data: null });
  }
  req.userId = user._id;
  next();
};

export default protectRoute;
