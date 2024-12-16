import { Router } from "express";
import { fileUpload } from "../../utils/uploadFile.js";
import * as subCategorysechema from "../subCategory/subCategory.schema.js";
import * as subCategoryController from "../subCategory/subCategory.controller.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.middleware.js";

export const subCategoryRouter = Router({ mergeParams: true });

subCategoryRouter.post(
  "/",
  isAuthenticated,
  fileUpload().single("subcategory"),
  subCategoryController.carateSubCategory
);

//  up  date  category
subCategoryRouter.patch(
  "/:id",
  isAuthenticated,
  fileUpload().single("subcategory"),
  validation(subCategorysechema.updateSubcategory),
  subCategoryController.updateSubCategory
);

subCategoryRouter.delete(
  "/:id",
  isAuthenticated,
  fileUpload().single("subcategory"),
  validation(subCategorysechema.deleteSubcategory),
  subCategoryController.deleteSubCategory
);
subCategoryRouter.get(
  "/",
  validation(subCategorysechema.getSubcategory),
  subCategoryController.getAllSubCategory
);
