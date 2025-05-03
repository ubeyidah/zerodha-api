import User from "../models/userModel.js";
import { genAndSetToken } from "../utils/genAndSetToken.js";
import {
  loginValidation,
  signupValidation,
} from "../validations/authValidation.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const body = req.body;
  const { error, value } = signupValidation.validate(body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, data: null, success: false });
  }
  const { username, email, password } = value;

  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.status(400).json({
      message: "User already exists",
      data: null,
      success: false,
    });
  }

  const generateSalt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, generateSalt);

  const user = await new User({
    username,
    email,
    password: hashedPassword,
  }).save();

  genAndSetToken(user._id, res);
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(201).json({
    message: "User created successfully",
    data: userWithoutPassword,
    success: true,
  });
};

export const login = async (req, res) => {
  const body = req.body;

  const { error, value } = loginValidation.validate(body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message,
      data: null,
      success: false,
    });
  }

  const { email, password } = value;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      message: "Email or password is incorrect",
      data: null,
      success: false,
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Email or password is incorrect",
      data: null,
      success: false,
    });
  }

  genAndSetToken(user._id, res);
  const { password: _, ...userWithoutPassword } = user._doc;

  res.status(200).json({
    message: "User logged in successfully",
    data: userWithoutPassword,
    success: true,
  });
};

export const logout = async (req, res) => {};

export const profile = async (req, res) => {};
