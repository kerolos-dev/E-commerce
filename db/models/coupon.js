import mongoose, {  Schema, Types } from "mongoose";




const  coupon= new  Schema({
    name:{type:String , required:  true ,  unique :  true},
    discount:{type:Number , min:1 ,max:100 ,  required: true},
    expiredAt:{type:Number  , required: true},
    createdBy:{type: Types.ObjectId , ref:"User",  required:true},

},
{timestamps:  true},
)



export  const   couponModule=mongoose.model ("Coupon",coupon )