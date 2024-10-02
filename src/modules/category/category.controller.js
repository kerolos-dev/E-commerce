 import slugify from "slugify";
import { catchError } from "../../middilware/catshError.js";
import { AppError } from "../../utils/appError.js";
import cloudinary from "../../utils/cloud.js";
import {CategoryModel} from "../../../db/models/category.js"




const caratCategory=catchError(async(req,res,next)=>{
    //check  file  upload  
    if(!req.file ) return  next (new AppError ("Category  image  is  required "))
    // upload   image cloudinary  
    const {public_id ,  secure_url } =await  cloudinary.uploader.upload(
        req.file.path,{
            folder: `${process.env.CLOUD_FOLDER_NAME}/category`
        }
    )
    
    //save  category   CategoryModel
    await  CategoryModel.create({
        name:req.body.name,
        slug:slugify(req.body.name),
        createdBy:req.user._id,
        image:{id:public_id, url:secure_url}
    })
    //   send  response
    return  res.json({success:true ,massega: "success carate category" })

}) 

const upDateCategory=catchError(async (req,res,net )=>{
    //  check    category in  data Base  
    const  category =await   CategoryModel.findById(req.params.id)
    if(!category)  return   next   (new  AppError('category  is not  found !',{cause:404} ))
    //  check    category  owner 
    // if(req.user._id.toString() !== category.createdBy.toString() )
    //     return  next(new AppError("not allow  to  update  the  category"))
      if(req.user._id !== category.createdBy )
        return  next(new AppError("not allow  to  update  the  category"))
    //  check file  >>>>  upload  in  cloudinary  
    if(req.file){
        const{public_id, secure_url}=  await  cloudinary.uploader.upload(
            req.file.path,
            {public_id:category.image.id}
        );
        category.image =  {id:  public_id , url: secure_url}
    }
    //  update  category  
    category.name =  req.body.name ?  req.body.name  : category.name
    category.slug =  req.body.slug ?   slugify(req.body.slug) : category.slug
    //  save  category 
    await   category.save(   )
    //  response
    return  res.json({success:true ,massega: "success update  category" })
})
const  deleteCategory = catchError (async(req,res,next)=>{
   // check category  in the  database
   const  category=await  CategoryModel.findById(req.params.id);
   if(!category) return  next(new  AppError("category not found !! "))
   //  check  owner
   if(category.createdBy !==  req.user._id)
   return  next (new  AppError("not  allowed  to  delete "))
  //  delete  for bate 
  await  CategoryModel.findOneAndDelete(req.params.id)
    //  deleteCategory  for  image 
    await cloudinary.uploader.destroy(category.image.id)
    //  response
    return  res.json({success:true ,massega: "success delete  category" })
})
const  getAllCategory = catchError (async(req,res,next)=>{
    //  deleteCategory  for  data 
    const categoryALL  = await   CategoryModel.find()

    //  response
    return  res.json({success:true ,  categoryALL})


})

export{
    caratCategory,
    upDateCategory,
    deleteCategory,
    getAllCategory,
}