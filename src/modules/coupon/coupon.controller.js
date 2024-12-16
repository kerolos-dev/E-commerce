import voucher_codes from "voucher-code-generator";
import { catchError } from "../../middleware/cashError.js";
import { couponModule } from "../../../db/models/coupon.js";
import { AppError } from "../../utils/appError.js";



const  createCoupon = catchError(async(req,res,next)=>{

        // Generate Coupon Codes (5 unique codes, 8 characters each)
        const generatedCodes = voucher_codes.generate({
          length: 5,
        });
    
        // Create Coupons (one for each generated code)
        const createdCoupons = await Promise.all(generatedCodes.map(async (code) => {
          return await couponModule.create({
            name: code,
            createdBy: req.user._id,
            discount: req.body.discount,
            expiredAt: new Date(req.body.expiredAt).getTime(),
          });
        }));
    
        // Send Success Response with Created Coupons
        return res.json({
          success: true,
          message: "Successfully created coupons",
          coupons: createdCoupons,
        });
      
})


const  updateCoupon  =  catchError(async(req,res,next)=>{
    //  check  coupon  and  check  date  
    const  coupon= await  couponModule.findOne({name:req.params.code  ,expiredAt:{$gt: Date.now()}  })
    if(!coupon) return next(new AppError("invalid  coupon "))
    //  check  owner    
    if(req.body.id  != coupon.createdBy) return  next  (new  AppError("not Authorized!" ,  {cause:403}));
    //update  
    coupon.discount =  req.body.discount ?  req.body.discount :  coupon.discount;
    coupon.expiredAt =  req.body.expiredAt ?  new  Date(req.body.expiredAt).getTime():coupon.expiredAt 
    await coupon.save()
    //send   response 
    return  res.json({ success: true , message:"coupon updated  successfully !" });


})


const   deleteCoupon=catchError(async(req,res,next)=>{
   //  check  coupon  
   const  coupon= await  couponModule.findOne({name:req.params.code  })
   if(!coupon) return next(new AppError("invalid  coupon "))
   //  check  owner    
   if(req.body.id  != coupon.createdBy) return  next  (new  AppError("not Authorized!" ,  {cause:403}));
   await coupon.deleteOne()
   return  res.json({ success: true , message:"coupon updated  successfully !" });
         
})
const   getCoupon=catchError(async(req,res,next)=>{
     const  getall=couponModule.find()
     return  res.json({ success: true , message:"   get  all  coupon   successfully !" ,getall});

})
export{
    createCoupon,
    updateCoupon,
    deleteCoupon,
    getCoupon
    
}