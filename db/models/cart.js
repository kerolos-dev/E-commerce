import { request } from "express";
import mongoose, { Types } from "mongoose";



const  cartSchema = new mongoose.Schema({
    products:[
    {
    productId:{
        type :  Types.ObjectId  ,  ref:"Product",
    
    },
    quantity:{type:Number ,  default:1}
    }
    ],
    user: {
        type :  Types.ObjectId  ,  ref:"User",  request:  true , unique:  true
    }
})



  export  const  cartModel= mongoose.model( " Cart" , cartSchema)