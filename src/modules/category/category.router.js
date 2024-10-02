import { Router  } from "express";
import { validation } from "../../middilware/validation.middilware.js";
import  *  as categoryController from  "../category/category.controller.js"
import  *  as categorysechema from  "../category/category.sechema.js"
import { isAuthenticated } from "../../middilware/authentication.js";
import { fileUpload } from "../../utils/uploadFile.js";
import { subCategoryRouter } from "../subCategory/subCategory.router.js";

export  const  categoryRouter = Router()
//localhost/3000/category/ id/  subcategory
       
categoryRouter.use("/:category/subCategory", subCategoryRouter);
 


// CRUD 
//  caret  category
categoryRouter.post('/',isAuthenticated,
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
    validation(categorysechema.deletecategory ),
    categoryController.deleteCategory)
//    get  all    category
categoryRouter.get("/" ,categoryController.getAllCategory)