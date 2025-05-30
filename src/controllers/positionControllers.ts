import { Request, Response } from "express";
import Position from "../models/positionModel";

export const getPositions = async (req: Request, res: Response) => {
  const positions = await Position.find();
  res.status(200).json({
    message: "Positions fetched successfully",
    data: positions,
    success: true,
  });
};
