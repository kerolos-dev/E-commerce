import { Router } from "express";
import { isAuthenticated } from "../../middilware/authentication.js";
import { fileUpload } from "../../utils/uploadFile.js";
import { validation } from "../../middilware/validation.middilware.js";
import  *  as  subCategorysechema from "../subCategory/subCategory.sechema.js";
import  *  as  subCategoryController from "../subCategory/subCategory.controller.js"


export const subCategoryRouter=Router({ mergeParams: true });



subCategoryRouter.post('/',isAuthenticated,  
    fileUpload().single('subcategory'),validation(subCategorysechema.createSubcategory),subCategoryController.carateSubCategory)


    


//  up  date  category
subCategoryRouter.patch('/:id',isAuthenticated,  
    fileUpload().single('subcategory'),validation(subCategorysechema.updateSubcategory),subCategoryController.updateSubCategory)

subCategoryRouter.delete('/:id',isAuthenticated,  
    fileUpload().single('subcategory'),validation(subCategorysechema.deleteSubcategory),subCategoryController.deleteSubCategory)
subCategoryRouter.get('/',validation(subCategorysechema.getSubcategory),subCategoryController.getAllSubCategory)
