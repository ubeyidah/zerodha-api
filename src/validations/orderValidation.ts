import Joi from "joi";

export const orderValidation = Joi.object({
  name: Joi.string().trim().min(1).max(100).required(),
  qty: Joi.number().integer().min(1).required(),
  price: Joi.number().precision(2).positive().required(),
  mode: Joi.string().required().valid("buy", "sell"),
});

// TODO: .valid()
