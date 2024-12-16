import { cartModel } from "../../../db/models/cart.js";
import { productModel } from "../../../db/models/product.js";
import { catchError } from "../../middleware/cashError.js";
import { AppError } from "../../utils/appError.js";

const addToCart = catchError(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError("User is not authenticated", { cause: 401 }));
  }

  const { productId, quantity } = req.body;
  //  check  product
  const product = await productModel.findById(productId);
  if (!product) return next(new AppError("product not found "));
console.log(product);
  //  check  stock
  if (quantity > product.availableItems)
    return next(
      new AppError(
        `sorry,  only ${product.availableItems}  item  are  available  `
      )
    );
  const filter = { user: req.user._id }; // Filter by user ID

  console.log("Filter:", filter); // Log the constructed filter object

  const cart = await cartModel.findOneAndUpdate(
    filter,
    { $push: { products: { productId, quantity } } },
    { new: true, upsert: true }
  );

  return res.json({ success: true, results: cart });
});
const getCart = catchError(async (req, res, next) => {
  if (req.user.role == "user") {
    const cart = await cartModel.findOne({ user: req.user._id });
    return res.json({ success: true, results: { cart } });
  }

  if (req.user.role == "admin" && !req.body.cart)
    return next(new AppError("cart id  is  required "));

  const cart = await cartModel.findById(req.body.cartId);
  return res.json({ success: true, results: { cart } });
});

const updateCart = catchError(async (req, res, next) => {
  const { productId, quantity } = req.body;
  //  update  cart
  const cart = await cartModel.findByIdAndUpdate(
    { user: req.user._id, "products.productId": productId },
    { "products.$.quantity": quantity },
    { new: true }
  );
  return res.json({ success: true, results: { cart } });
});
const removeCart = catchError(async (req, res, next) => {
  const { productId } = req.params;
  if (!productId) return next(new AppError("product not found "));
  //remove
  const removeCart = cartModel.findOne(
    { user: req.body._id },
    { $poll: { product: { productId } } },
    {
      new: true,
    }
  );

  return res.json({ success: true });
});

const clearCart = catchError(async (req, res, next) => {
  const cart = await cartModel.findByIdAndUpdate(
    { user: req.user._id },
    { products: [] },
    { new: true }
  );
  return  res.json({success:  true  ,  results:{cart }})
});
export { addToCart, getCart, updateCart, removeCart, clearCart };
