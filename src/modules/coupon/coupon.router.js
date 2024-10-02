import { Router  } from "express";
import { isAuthenticated } from "../../middilware/authentication.js";
import { validation } from "../../middilware/validation.middilware.js";
import *  as couponSchema   from "../coupon/coupon.sechema.js"
import *  as couponController   from "../coupon/coupon.controller.js"





const couponRouter=Router()

couponRouter.post("/",isAuthenticated ,validation(couponSchema.create),couponController.createCoupon )



export default  couponRouter