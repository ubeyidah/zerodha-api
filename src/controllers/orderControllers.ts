import { Request, Response } from "express";
import Holding from "../models/holdingModel";
import Order from "../models/orderModel";
import { orderValidation } from "../validations/orderValidation";

export const getOrders = async (req: Request, res: Response) => {
  const orders = await Order.find({ userId: req.userId });
  res.status(200).json({
    success: true,
    data: orders,
    message: "Orders fetched successfully",
  });
};

// Todo: specify the name more clearly
export const buy = async (req: Request, res: Response) => {
  const body = req.body;
  const { error, value } = orderValidation.validate(body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
    return;
  }
  const { name, qty, price, mode } = value;
  await new Order({
    name,
    qty,
    price,
    mode,
    userId: req.userId,
  }).save();

  let holding = await Holding.findOne({ name, userId: req.userId });

  if (holding) {
    const totalQty = holding.qty + qty;
    holding.avg =
      ((holding.avg ?? 0) * (holding.qty ?? 0) + price * qty) / totalQty;
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
  res.status(201).json({
    message: "Stock purchased successfully.",
    data: holding,
    success: true,
  });
};

export const sell = async (req: Request, res: Response) => {
  const body = req.body;
  const { error, value } = orderValidation.validate(body);
  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
      data: null,
    });
    return;
  }
  const { name, qty, price, mode } = value;
  await new Order({
    name,
    qty,
    price,
    mode,
    userId: req.userId,
  }).save();

  let holding = await Holding.findOne({ name, userId: req.userId });

  if (!holding) {
    res.status(400).json({
      message: "We don’t have this stock in your holdings.",
      success: false,
      data: null,
    });
    return;
  }
  if ((holding.qty ?? 0) < qty) {
    res.status(400).json({
      message: "Not enough quantity to sell.",
      success: false,
      data: null,
    });
    return;
  }

  holding.qty = (holding.qty ?? 0) - qty;

  if (holding.qty === 0) {
    await Holding.deleteOne({ name, userId: req.userId });
    res.json({
      message: "Stock sold and removed from holdings.",
      success: true,
      data: null,
    });
    return;
  }

  await holding.save();
  res.json({
    message: "Stock sold successfully.",
    data: holding,
    success: true,
  });
};
