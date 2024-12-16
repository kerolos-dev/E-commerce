import { Router  } from "express";
import  *  as categoryController from  "../category/category.controller.js"
import  *  as categorysechema from  "../category/category.schema.js"
import { fileUpload } from "../../utils/uploadFile.js";
import { subCategoryRouter } from "../subCategory/subCategory.router.js";
import { isAuthenticated } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.middleware.js";
import { authorize } from "../../middleware/middleware.js";

export  const  categoryRouter = Router()
//localhost/3000/category/ id/  subcategory
       
categoryRouter.use("/:category/subCategory", subCategoryRouter);
 


// CRUD 
//  caret  category
categoryRouter.post('/',isAuthenticated,authorize("admin"),
    fileUpload().single('category'),
    validation(categorysechema.createCategory),
    categoryController.caratCategory)

//  up  date  category

categoryRouter.patch("/:id", isAuthenticated ,
fileUpload().single('category'),
validation(categorysechema.upDatecategory ),
categoryController.upDateCategory)


//  delete  category

categoryRouter.delete("/:id",isAuthenticated ,
    fileUpload().single('category'),
    validation(categorysechema.datecategory ),
    categoryController.deleteCategory)
//    get  all    category
categoryRouter.get("/" ,categoryController.getAllCategory)