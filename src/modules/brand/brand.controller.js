import slugify from "slugify";
import { brandModel } from "../../../db/models/brand.js";
import { CategoryModel } from "../../../db/models/category.js";
import { catchError } from "../../middilware/catshError.js";
import { AppError } from "../../utils/appError.js";
import cloudinary from "../../utils/cloud.js";







const  createBrand=catchError(async(req,res,next)=>{
        // Destructure categories and name from the request body
        const { categories = [], name } = req.body; // Default to an empty array if categories is undefined
      
        // Validate categories
        if (!Array.isArray(categories)) {
          return next(new AppError(`Categories must be an array`, { cause: 400 }));
        }
      
        // Check if all categories exist asynchronously
        await Promise.all(
          categories.map(async (categoryId) => {
            const category = await CategoryModel.findById(categoryId);
            if (!category) {
              return next(new AppError(`Category ${categoryId} is not found`, { cause: 404 }));
            }
          })
        );
      
        // Check if a file is provided
        if (!req.file) {
          return next(new AppError(`File is not found`, { cause: 404 }));
        }
      
        // Upload the file to Cloudinary
        const { secure_url, public_id } = await cloudinary.uploader.upload(req.file.path, {
          folder: `${process.env.CLOUD_FOLDER_NAME}/brands`,
        });
      
        // Save the brand in the database
        const brand = await brandModel.create({
          name: req.body.name,
          createdBy: req.user._id,
          slug: slugify(name),
          image: { id: public_id, url: secure_url },
        });
      
        // Add the brand to each category
        await Promise.all(
          categories.map(async (categoryId) => {
            await CategoryModel.findByIdAndUpdate(categoryId, { $push: { brands:brand._id } });
          })
        );
      
        // Send a success response
        return res.json({ success: true, message: "Brand created successfully" });
      

})

const  updateBrand=catchError(async(req,res,next)=>{
    //check  brand  in date base  
    const  brand=  await  brandModel.findById(req.params.id)
    if(!brand)  return   next   (new  AppError('brand  is not  found !',{cause:404} ))
    //check  file  >>  update 
    if(req.file){
        const{public_id, secure_url}=  await  cloudinary.uploader.upload(
            req.file.path,
            {public_id:brand.image.id}
        );
        brand.image =  {id:  public_id , url: secure_url}
    }
    //  update  brand
    brand.name =  req.body.name ?  req.body.name  : brand.name
    brand.slug =  req.body.slug ?   slugify(req.body.slug) : brand.slug
    //  save  category 
    await   brand.save(   )
    //  response
    return  res.json({success:true ,massega: "success update  brand" })
    

})
const  deleteBrand=catchError(async (req,res,next)=>{
  //check  brand  in date base  
  const  brand=  await  brandModel.findById(req.params.id)
  if(!brand)  return   next   (new  AppError('brand  is not  found !',{cause:404} ))
  //  deleteCategory  for  image 
  await cloudinary.uploader.destroy(brand.image.id)
  // delete    brand  from  categories
  await  CategoryModel.updateMany({},{$pull:{brands: brand._id}})
   //  delete  for bate 
   await  brandModel.findOneAndDelete(req.params.id)
  //  response
   return  res.json({success:true ,massega: "success delete  brand" })

})


const  getAllCategory = catchError (async(req,res,next)=>{
  //  deleteCategory  for  data 
  const categoryALL  = await   brandModel.find()
  //  response
  return  res.json({success:true ,  categoryALL})


})


export{
    createBrand,
    updateBrand,
    deleteBrand,
    getAllCategory,

}