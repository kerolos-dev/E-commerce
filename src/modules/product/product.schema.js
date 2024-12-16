import Joi from "joi";
import { isValidObjectId } from "../../middleware/validation.middleware.js";
import { disconnect } from "mongoose";

const createProduct = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  description: Joi.string().min(10).max(100),
  availableItems: Joi.string().min(1).max(10),
  price: Joi.number().integer().options({ convert: false }).min(1).required(),
  disconnect: Joi.number().min(1).max(100),
  category: Joi.string().custom(isValidObjectId).required(),
  subcategory: Joi.string().custom(isValidObjectId).required(),
  brand: Joi.string().custom(isValidObjectId).required()


});
const updateProduct = Joi.object({
  name: Joi.string().min(3).max(50).required(),
  id: Joi.string().custom(isValidObjectId).required(),
  description: Joi.string().min(10).max(100),
  price: Joi.number().min(1),
});

export { createProduct, updateProduct };
