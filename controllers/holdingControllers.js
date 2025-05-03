import Holding from "../models/holdingModel.js";

export const getHoldings = async (req, res) => {
  const userHoldings = await Holding.find({ userId: req.userId });
  res
    .status(200)
    .json({
      message: "Holdings fetched successfully",
      data: userHoldings,
      success: true,
    });
};
