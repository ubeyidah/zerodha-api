import Holding from "../models/holdingModel.js";
import Order from "../models/orderModel.js";
import { orderValidation } from "../validations/orderValidation.js";

export const getOrders = async (req, res) => {
  const orders = await Order.find({ userId: req.userId });
  res.status(200).json({
    success: true,
    data: orders,
    message: "Orders fetched successfully",
  });
};

// Todo: specify the name more clearly
export const buy = async (req, res) => {
  const body = req.body;
  const { error, value } = orderValidation.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }
  const { name, qty, price, mode } = value;
  const newOrder = await new Order({
    name,
    qty,
    price,
    mode,
    userId: req.userId,
  }).save();

  let holding = await Holding.findOne({ name, userId: req.userId });

  if (holding) {
    const totalQty = holding.qty + qty;
    holding.avg = (holding.avg * holding.qty + price * qty) / totalQty;
    holding.qty = totalQty;
    holding.price = price;
  } else {
    holding = new Holding({
      name,
      qty,
      avg: price,
      price,
      net: "0",
      day: "0",
      userId: req.userId,
    });
  }
  await holding.save();
  return res.status(201).json({
    message: "Stock purchased successfully.",
    data: holding,
    success: true,
  });
};

export const sell = async (req, res) => {
  const body = req.body;
  const { error, value } = orderValidation.validate(body);
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
  }
  const { name, qty, price, mode } = value;
  const newOrder = await new Order({
    name,
    qty,
    price,
    mode,
    userId: req.userId,
  }).save();

  let holding = await Holding.findOne({ name, userId: req.userId });

  if (!holding) {
    return res.status(400).json({
      message: "We don’t have this stock in your holdings.",
      success: false,
      data: null,
    });
  }
  if (holding.qty < qty) {
    return res.status(400).json({
      message: "Not enough quantity to sell.",
      success: false,
      data: null,
    });
  }

  holding.qty -= qty;

  if (holding.qty === 0) {
    await Holding.deleteOne({ name, userId: req.userId });
    return res.json({
      message: "Stock sold and removed from holdings.",
      success: true,
      data: null,
    });
  }

  await holding.save();
  return res.json({
    message: "Stock sold successfully.",
    data: holding,
    success: true,
  });
};
