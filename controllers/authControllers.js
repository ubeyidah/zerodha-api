import { signupValidation } from "../validations/authValidation.js";

export const signup = async (req, res) => {
  const body = req.body;
  const { error, value } = signupValidation.validate(body);
  if (error) {
    return res
      .status(400)
      .json({ message: error.details[0].message, data: null, success: false });
  }
  const { username, email, password } = value;
};

export const login = async (req, res) => {};

export const logout = async (req, res) => {};

export const profile = async (req, res) => {};
