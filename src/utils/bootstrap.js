import authRouter from "../modules/auth/auth.router.js"
import brandRouter from "../modules/brand/brand.router.js"
import { categoryRouter } from "../modules/category/category.router.js"
import couponRouter from "../modules/coupon/coupon.router.js"
import { subCategoryRouter } from "../modules/subCategory/subCategory.router.js"
import { AppError } from "./appError.js"





export  const  bootstrap=(app)=>{

    //   auth router
    app.use('/auth', authRouter )
    app.use('/Category', categoryRouter )
    app.use('/subCategory', subCategoryRouter )
    app.use('/brand', brandRouter )
    app.use('/coupon', couponRouter )

    //  page is not found  handlers  
    app.all("*", (req,res ,next)=>{
    return  next(new   AppError("page not found", {cause:404 }))
    })






}


