import { Request, Response } from "express";
import Holding from "../models/holdingModel";

export const getHoldings = async (req: Request, res: Response) => {
  const userHoldings = await Holding.find({ userId: req.userId });
  res.status(200).json({
    message: "Holdings fetched successfully",
    data: userHoldings,
    success: true,
  });
};
