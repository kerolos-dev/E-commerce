import slugify from "slugify";
import { subCategoryModel } from "../../../db/models/subCategory.js";
import { catchError } from "../../middilware/catshError.js";
import { AppError } from "../../utils/appError.js";
import cloudinary from "../../utils/cloud.js";
import { CategoryModel } from "../../../db/models/category.js";







const  carateSubCategory=catchError(async(req,res,next)=>{
    // check  category  id |
     const   category =await   CategoryModel.findById(req.params.category) 
     if(!category) return next  (new  AppError("category id  is  not  found  "))
    // check  file  upload 
    if(!req.file) return next  (new  AppError("subCategory  image  is  reqouierd "))
    // upload   image cloudinary  
    const {public_id ,  secure_url } =await  cloudinary.uploader.upload(
        req.file.path,{
            folder: `${process.env.CLOUD_FOLDER_NAME}/subCategory`
        }
    )
    //save  category   CategoryModel
    await  subCategoryModel.create({
        name:req.body.name,
        slug:slugify(req.body.name),
        createdBy:req.user._id,
        image:{id:public_id, url:secure_url},
        category: req.params.category
    })
    //   send  response
    return  res.json({success:true ,massega: "success  carate  sudCategory" })
})

const updateSubCategory=catchError(async(req,res,next)=>{
     //  check    category in  data Base  
     const  category =await   CategoryModel.findById(req.params.category)
     if(!category)  return   next   (new  AppError('category  is not  found !',{cause:404} ))

    //  check  subCategory   
    const  subCategory=await subCategoryModel.findOne({_id:req.params.id   ,   category:req.params.category} ) 
        if(!subCategory)  next(new  AppError("subcategory  is not  found !",{cause:404}))
       //  check    category  owner 
    //    if(req.user._id !== category.createdBy )    ///.toString()
       //     return  next(new AppError("not allow  to  update  the  category"))
       if(req.user._id !== category.createdBy )
         return  next(new AppError("not allow  to  update  the  category"))
     //  check file  >>>>  upload  in  cloudinary  
     if(req.file){  
         const{public_id, secure_url}=  await  cloudinary.uploader.upload(
             req.file.path,
             {public_id:subCategory.image.id}
         );
         category.image =  {id:  public_id , url: secure_url}
     }
     //  update  category  
     subCategory.name =  req.body.name ?  req.body.name  : subCategory.name
     subCategory.slug =  req.body.slug ?   slugify(req.body.slug) : subCategory.slug
     //  save  category 
     await   subCategory.save(   )
     //  response
     return  res.json({success:true ,massega: "success update  category" })
})


const  deleteSubCategory = catchError (async(req,res,next)=>{
    // check category  in the  database
    const  category=await  CategoryModel.findById(req.params.category);
    if(!category) return  next(new  AppError("category not found !! "))
    //  check  subCategory   
    const  subCategory=await subCategoryModel.findOne({_id:req.params.id   ,   category:req.params.category} ) 
    if(!subCategory)  next(new  AppError("subcategory  is not  found !",{cause:404}))
    //  check  owner
    if(category.createdBy !==  req.user._id)
    return  next (new  AppError("not  allowed  to  delete "))
   //  delete  for bate 
   await  subCategoryModel.findOneAndDelete(req.params.id)
     //  deleteCategory  for  image 
     await cloudinary.uploader.destroy(category.image.id)
     //  response
     return  res.json({success:true ,massega: "subCategory delete  category" })
 
 
 })

 const  getAllSubCategory = catchError (async(req,res,next)=>{

  // check category  in the  database
  const  category=await  CategoryModel.findById(req.params.category);
  if(!category) return  next(new  AppError("category not found !! "))

    if(req.params.category){
        // all  subcategory  of  category  
        const results =await  subCategoryModel.find({category: req.params.category})
        return  res.json({success:true ,  results})

    }
    //  deleteCategory  for  data 
    // nested populate 
    // const subcategoryALL  = await   subCategoryModel.find().populate([{path:"category", populate({path:  "categorBy", ,select: "email"  })  ,}])


    // multiple populate 
     const subcategoryALL  = await   subCategoryModel.find().populate([{path:  "category" ,select: "name,  _id"},{path:  "categoryBy"}])





    //  response
    return  res.json({success:true ,  subcategoryALL})


})

export{
    carateSubCategory,
    updateSubCategory,
    deleteSubCategory,
    getAllSubCategory,
}