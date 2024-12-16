import { Router  } from "express";
import *  as couponSchema   from "../coupon/coupon.schema.js"
import *  as couponController   from "../coupon/coupon.controller.js"
import { isAuthenticated } from "../../middleware/authentication.js";
import { validation } from "../../middleware/validation.middleware.js";





const couponRouter=Router()

couponRouter.post("/",isAuthenticated ,validation(couponSchema.create),couponController.createCoupon )
couponRouter.patch("/:code",isAuthenticated ,validation(couponSchema.update),couponController.updateCoupon )
couponRouter.delete("/:code",isAuthenticated ,validation(couponSchema.deleteCoupon),couponController.deleteCoupon )
couponRouter.get("/",isAuthenticated ,couponController.getCoupon )


export default  couponRouter