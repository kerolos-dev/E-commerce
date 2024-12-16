import slugify from "slugify";
import { catchError } from "../../middleware/cashError.js";
import { AppError } from "../../utils/appError.js";
import cloudier from "../../utils/cloud.js";
import { productModel } from "../../../db/models/product.js";
import { CategoryModel } from "../../../db/models/category.js";
import { brandModel } from "../../../db/models/brand.js";
import { subCategoryModel } from "../../../db/models/subCategory.js";
import { nanoid } from "nanoid";
import cloudinary from "../../utils/cloud.js";
const createProduct = catchError(async (req, res, next) => {
  //check  category
  const categoryCheck = await CategoryModel.findById(req.body.category);
  if (!categoryCheck)
    return next(new AppError("category  not  found!", { cause: 404 }));
  //check  subCategory
  const subcategoryCheck = await subCategoryModel.findById(
    req.body.subcategory
  );
  if (!subcategoryCheck)
    return next(new AppError("subcategory  not  found!", { cause: 404 }));
  //check  brand
  const brandCheck = await brandModel.findById(req.body.brand);
  if (!brandCheck)
    return next(new AppError("brand  not  found!", { cause: 404 }));
  //check  file
  if (!req.file)
    return next(new AppError("product image   is  not  found", { cause: 404 }));
  // create  folder  name
  const cloudFolder = nanoid();
  let image = [];
  //upload  sub  images
  for (const file of req.file.subImages) {
    const { secure_url, public_id } = await cloudier.uploader.upload(
      file.path,
      {folder:`${process.env.CLOUD_FOLDER_NAME}/products/${cloudFolder}`},
      image.push({id:  public_id, url: secure_url })
    );
  }

  // //upload   default  image  
  // const {secure_url , public_id}=await cloudier.uploader.upload(
  //   req.files.default
  // )

  
  // Save product in the database
  const data = await productModel.create({
    ...req.body,
    cloudFolder,
    createdBy:req.user._id,
    description: req.body.description,
    image: { id: public_id, url: secure_url },
  });

  // Send response
  return res.json({ success: true, message: "Product created successfully" });
});
const updateProduct = catchError(async (req, res, next) => {
  // Check if the product exists in the database
  const product = await productModel.findById(req.params.id);
  console.log("Product found:", product);

  if (!product) {
    return next(new AppError("Product not found!", { cause: 404 }));
  }

  // // Verify `req.user` and `req.user._id` exist
  // if (!req.user || !req.user._id || !product.productBy) {
  //     return next(new AppError("User or product owner is missing", { cause: 400 }));
  // }

  // // Check if the current user has permission to update the product
  // if (req.user._id.toString() !== product.productBy.toString()) {
  //     return next(new AppError("Not allowed to update the product", { cause: 403 }));
  // }

  // Check if there's a file to upload to Cloudinary
  if (req.file) {
    try {
      const { public_id, secure_url } = await cloudier.uploader.upload(
        req.file.path,
        { public_id: product.image.id }
      );
      product.image = { id: public_id, url: secure_url };
    } catch (error) {
      return next(new AppError("Failed to upload image", { cause: 500 }));
    }
  }

  // Update product fields, retaining old values if no new data is provided
  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.slug = req.body.slug ? slugify(req.body.slug) : product.slug;

  // Save the updated product
  await product.save();

  // Respond with a success message
  return res.json({ success: true, message: "Product updated successfully" });
});

// // const deleteProduct = catchError(async (req, res, next) => {
// //   // Check if the product exists in the database
// //   const product = await productModel.findById(req.params.id);
// //   console.log("Product found:", product);

// //   //check  owner
// //   if (product.productBy !== req.user._id)
// //     return next(new AppError("not  allowed  to  delete "));
// //   //  delete  for bate
// //   // delete hooke
// //   await product.deleteOne();
// //   //  deleteCategory  for  image
// //   await cloudier.uploader.destroy(category.image.id);

// //   //  response
// //   return res.json({ success: true, massega: "success delete  category" });
// // });

// const getProduct = catchError(async (req, res, next) => {
//   //  search  ,  filter ,  sort  ,  pagination >>>  query
//   //  search
//   // const {keyword} = req.query ; //
//   // const  product  = await productModel.find({
//   //   name: { $regex: keyword, $options: "i" }
//   // });

//   //  filter ....
//   // const  { availableItems ,price    ,discount}  =  req.query
//   //  const  product =   await    productModel.find({ ...req.query})

//   //  sort  ....
//   //  const  {sort}=  req.query
//   //  const  product  =  await    productModel.find({}).sort({sort})

//   // //  pagination
//   // page=  page < 1 ||   isNaN(page) ||  !page ? 1  : page   ;
//   // const limit = 1;
//   // const skip = limit * (page - 1);

//   const { sort, page, keyword  ,   category  , brand , subcategory   } = req.query;
//   if(category &&  !(await CategoryModel.findById(category)))
//     return  next(new  AppError("category  not  found !" ,  {  cause: 404}))
//   if(brand &&  !(await brandModel.findById(brand)))
//     return  next(new  AppError("brand  not  found !" ,  {  cause: 404}))
//   if(category &&  !(await subCategoryModel.findById(subcategory)))
//     return  next(new  AppError("subcategory  not  found !" ,  {  cause: 404}))
//   const product = await productModel
//     .findOne({ ...req.query })   // {  price: {$let: 100}}
//     .sort(sort)
//     .paginate(page)
//     .search(keyword);

//   // Send the response
//   return res.json({ success: true, product });
// });

export { createProduct, updateProduct };
