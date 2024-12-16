import { Router } from "express";
import * as cartController from "./cart.controller.js";
import * as cartSchema from "./cart.schema.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
const cartRouter = Router();

cartRouter.post("/",isAuthenticated, cartController.addToCart);
cartRouter.put(
  "/clear",
  isAuthenticated,
  authorize("user"),
  cartController.clearCart
);

cartRouter.get(
  "/",
  isAuthenticated,
  authorize("user", "admin"),
  validation(cartSchema.getCart),
  cartController.getCart
);

export default cartRouter;
