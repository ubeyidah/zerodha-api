import Order from "../models/orderModel.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.userId });
  res
    .status(200)
    .json({
      success: true,
      data: orders,
      message: "Orders fetched successfully",
    });
};
