import jwt from "jsonwebtoken";
import { env } from "../utils/env.js";

export const genAndSetToken = (id, res) => {
  const token = jwt.sign({ id }, env("JWT_SECRET"), {
    expiresIn: "30d",
  });

  res.cookie("zerodha-token", token, {
    httpOnly: true,
    secure: env("NODE_ENV") === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
  });
};
