import voucher_codes from "voucher-code-generator";
import { catchError } from "../../middilware/catshError.js"
import { couponModule } from "../../../db/models/coupon.js";



const  createCoupon = catchError(async(req,res,next)=>{
    //generate  code  
   const  code = voucher_codes.generate({
        length: 8,
        count: 5
    });
    //create  coupon  
    const  coupon= await  couponModule.create({
        name:code[0],
        createdBy: req.user._id,
        discount:req.body.discount,
        expiredAt:new Date(req.body.expiredAt).getTime()
    })
    // response
    return  res.json({success:true ,massega: "success carate category" ,coupon  })
})




export{
    createCoupon
}