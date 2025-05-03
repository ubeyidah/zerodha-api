import Position from "../models/positionModel.js";

export const getPositions = async (req, res) => {
  const positions = await Position.find();
  res
    .status(200)
    .json({
      message: "Positions fetched successfully",
      data: positions,
      success: true,
    });
};
