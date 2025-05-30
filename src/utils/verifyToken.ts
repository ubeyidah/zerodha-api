import jwt from "jsonwebtoken";
import { JwtPayload } from "../types/auth";
import { env } from "./env";

export const verifyToken = (token: string): JwtPayload | null => {
  try {
    const decoded = jwt.verify(token, env("JWT_SECRET"));
    if (typeof decoded === "object" && "id" in decoded) {
      return decoded as JwtPayload;
    }
    return null;
  } catch (error) {
    return null;
  }
};
