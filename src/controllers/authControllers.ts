import { Request, Response } from "express";
import User from "../models/userModel";
import { genAndSetToken } from "../utils/genAndSetToken";
import {
  loginValidation,
  signupValidation,
} from "../validations/authValidation";
import bcrypt from "bcryptjs";

export const signup = async (req: Request, res: Response) => {
  const body = req.body;
  const { error, value } = signupValidation.validate(body);
  if (error) {
    res
      .status(400)
      .json({ message: error.details[0].message, data: null, success: false });
    return;
  }
  const { username, email, password } = value;

  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    res.status(400).json({
      message: "User already exists",
      data: null,
      success: false,
    });
    return;
  }

  const generateSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, generateSalt);

  const user = await new User({
    username,
    email,
    password: hashedPassword,
  }).save();

  genAndSetToken(String(user._id), res);
  const userObj = user.toObject();
  const { password: _, ...userWithoutPassword } = userObj;

  res.status(201).json({
    message: "User created successfully",
    data: userWithoutPassword,
    success: true,
  });
};

export const login = async (req: Request, res: Response) => {
  const body = req.body;

  const { error, value } = loginValidation.validate(body);
  if (error) {
    res.status(400).json({
      message: error.details[0].message,
      data: null,
      success: false,
    });
    return;
  }

  const { email, password } = value;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(400).json({
      message: "Email or password is incorrect",
      data: null,
      success: false,
    });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({
      message: "Email or password is incorrect",
      data: null,
      success: false,
    });
    return;
  }

  genAndSetToken(String(user._id), res);
  const userObj = user.toObject();
  const { password: _, ...userWithoutPassword } = userObj;

  res.status(200).json({
    message: "User logged in successfully",
    data: userWithoutPassword,
    success: true,
  });
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("zerodha-token", { maxAge: 0 });
  res.status(200).json({
    message: "User logged out successfully",
    data: null,
    success: true,
  });
};

export const profile = async (req: Request, res: Response) => {
  const user = await User.findById(req.userId);
  if (!user) {
    res.status(404).json({
      message: "User not found",
      data: null,
      success: false,
    });
    return;
  }

  const userObj = user.toObject();
  const { password: _, ...userWithoutPassword } = userObj;

  res.status(200).json({
    message: "User profile fetched successfully",
    data: userWithoutPassword,
    success: true,
  });
};
