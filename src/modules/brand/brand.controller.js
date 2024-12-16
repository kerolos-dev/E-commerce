import slugify from "slugify";
import { brandModel } from "../../../db/models/brand.js";
import { catchError } from "../../middleware/cashError.js";
import { AppError } from "../../utils/appError.js";
import cloudier from "../../utils/cloud.js";
import { CategoryModel } from "../../../db/models/category.js";

const createBrand = catchError(async (req, res, next) => {
  const { categories, name } = req.body;

  if (!Array.isArray(categories)) {
    return next(new AppError("Categories must be an array", { cause: 400 }));
  }
  if (!req.file) {
    return next(new AppError("Category image is required", { cause: 400 }));
  }

  // التحقق من وجود الـ slug
  let slug = slugify(name);
  let existingSlug = await brandModel.findOne({ slug });
  let count = 1;
  while (existingSlug) {
    slug = `${slugify(name)}-${count}`;
    existingSlug = await brandModel.findOne({ slug });
    count++;
  }

  const { secure_url, public_id } = await cloudier.uploader.upload(req.file.path, {
    folder: `${process.env.CLOUD_FOLDER_NAME}/brand`,
  });

  const brand = await brandModel.create({
    name,
    createdBy: req.user._id,
    slug,  // استخدام الـ slug المعدل
    image: { id: public_id, url: secure_url },
    categories,
  });

  await Promise.all(
    categories.map(async (categoryId) => {
      const category = await CategoryModel.findByIdAndUpdate(
        categoryId,
        { $push: { brands: brand._id } },
        { new: true, runValidators: true }
      );
      if (!category) {
        return next(new AppError(`Category ${categoryId} not found`, { cause: 404 }));
      }
    })
  );

  return res.json({ success: true, message: "Brand created successfully" });
});


const updateBrand = catchError(async (req, res, next) => {
  //check  brand  in date base
  const brand = await brandModel.findById(req.params.id);
  if (!brand)
    return next(new AppError("brand  is not  found !", { cause: 404 }));
  //check  file  >>  update
  if (req.file) {
    const { public_id, secure_url } = await cloudinary.uploader.upload(
      req.file.path,
      { public_id: brand.image.id }
    );
    brand.image = { id: public_id, url: secure_url };
  }
  //  update  brand
  brand.name = req.body.name ? req.body.name : brand.name;
  brand.slug = req.body.slug ? slugify(req.body.slug) : brand.slug;
  //  save  category
  await brand.save();
  //  response
  return res.json({ success: true, massega: "success update  brand" });
});
const deleteBrand = catchError(async (req, res, next) => {
  //check  brand  in date base
  const brand = await brandModel.findById(req.params.id);
  if (!brand)
    return next(new AppError("brand  is not  found !", { cause: 404 }));
  //  deleteCategory  for  image
  await cloudinary.uploader.destroy(brand.image.id);
  // delete    brand  from  categories
  await CategoryModel.updateMany({}, { $pull: { brands: brand._id } });
  //  delete  for bate
  await brandModel.findOneAndDelete(req.params.id);
  //  response
  return res.json({ success: true, massega: "success delete  brand" });
});

const getAllCategory = catchError(async (req, res, next) => {
  //  deleteCategory  for  data
  const categoryALL = await brandModel.find();
  //  response
  return res.json({ success: true, categoryALL });
});

export { createBrand, updateBrand, deleteBrand, getAllCategory };
