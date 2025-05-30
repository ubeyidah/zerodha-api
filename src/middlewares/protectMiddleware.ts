import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../utils/verifyToken";
import User from "../models/userModel";

const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["zerodha-token"];
  if (!token) {
    res
      .status(401)
      .json({ message: "Unauthorized", success: false, data: null });
    return;
  }

  const decoded = verifyToken(token);
  if (decoded == null) {
    res
      .status(401)
      .json({ message: "Invalid token", success: false, data: null });
    return;
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    res
      .status(404)
      .json({ message: "User not found", success: false, data: null });
    return;
  }
  req.userId = String(user._id);
  next();
};

export default protectRoute;
