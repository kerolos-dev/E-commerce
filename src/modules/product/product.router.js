import { Router } from "express";
import { fileUpload } from "../../utils/uploadFile.js";
import * as productController from "./product.controller.js";
import * as productsechema from "./product.schema.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { authorize } from "../../middleware/middleware.js";
import { validation } from "../../middleware/validation.middleware.js";
const productRouter = Router();
// authorize =  seller   
productRouter.post(
  "/",
  isAuthenticated,
  authorize("admin"),
  fileUpload().single("product"),
  productController.createProduct
);

productRouter.patch(
  "/:id",
  isAuthenticated,
  authorize("admin"),
  fileUpload().single("product"),
  validation(productsechema.updateProduct),
  productController.updateProduct
);

//  brandRouter.delete("/:id", isAuthenticated , validation(productsechema.deltaBrand),productController.deleteProduct
//        )

// productRouter.get("/", productController.getProduct);
export default productRouter;
